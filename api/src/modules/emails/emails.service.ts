import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { EmailStatus, Prisma } from '@prisma/client';
import * as fs from 'fs/promises';
import * as nodemailer from 'nodemailer';
import * as path from 'path';
import { EmailAttachmentsRepository } from 'src/shared/database/repositories/attachments.repositories';
import { EmailsRepository } from 'src/shared/database/repositories/emails.repositories';
import { CreateEmailDto } from './dto/create-email.dto';

@Injectable()
export class EmailsService {
  private transporter: nodemailer.Transporter;

  constructor(
    private readonly emailsRepo: EmailsRepository,
    private readonly emailAttachRepo: EmailAttachmentsRepository,
  ) {
    this.initializeTransporter();
  }

  private initializeTransporter() {
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT) ?? 587,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
  }

  async sendEmail(sendEmailDto: CreateEmailDto) {
    const { name, to, subject, htmlContent } = sendEmailDto;

    // Salva o email no banco de dados primeiro
    const emailRecord = await this.emailsRepo.create({
      data: {
        name,
        to,
        subject,
        htmlContent,
        status: EmailStatus.PENDING,
      },
      include: {
        attachments: true,
      },
    });

    try {
      // Prepara os anexos se existirem
      const attachments = [];
      const attachmentRecords = [];

      if (sendEmailDto.attachments?.length) {
        for (const attachment of sendEmailDto.attachments) {
          // Salva o anexo temporariamente
          const uploadsDir = path.join(process.cwd(), 'uploads', 'temp');
          await fs.mkdir(uploadsDir, { recursive: true });

          const filePath = path.join(
            uploadsDir,
            `${Date.now()}_${attachment.filename}`,
          );
          const buffer = Buffer.from(attachment.content, 'base64');
          await fs.writeFile(filePath, buffer);

          attachments.push({
            filename: attachment.filename,
            path: filePath,
            contentType: attachment.contentType,
          });

          // Salva referência no banco
          attachmentRecords.push({
            emailId: emailRecord.id,
            filename: attachment.filename,
            path: filePath,
            mimetype: attachment.contentType || 'application/octet-stream',
            size: buffer.length,
          });
        }

        // Salva os anexos no banco
        await this.emailAttachRepo.createMany({
          data: attachmentRecords,
        });
      }

      // Configura o email
      const mailOptions = {
        from: '"Uniko" <noreply@unikoimoveis.com.br>',
        to: sendEmailDto.to,
        subject: sendEmailDto.subject,
        html: sendEmailDto.htmlContent,
        attachments,
      };

      // Envia o email
      const result = await this.transporter.sendMail(mailOptions);

      // Atualiza o status no banco
      await this.emailsRepo.update({
        where: { id: emailRecord.id },
        data: {
          status: EmailStatus.SENT,
          sentAt: new Date(),
        },
      });

      // Remove arquivos temporários
      for (const attachment of attachments) {
        try {
          await fs.unlink(attachment.path);
        } catch (error) {
          throw new InternalServerErrorException(
            `Erro ao remover arquivo temporário: ${attachment.path}, Erro: ${error}`,
          );
        }
      }

      return {
        success: true,
        emailId: emailRecord.id,
        messageId: result.messageId,
      };
    } catch (error) {
      // Atualiza o status de erro no banco
      await this.emailsRepo.update({
        where: { id: emailRecord.id },
        data: {
          status: EmailStatus.FAILED,
          errorMessage: error.message,
        },
      });

      throw new InternalServerErrorException(
        `Erro ao enviar email: ${error.message}`,
      );
    }
  }

  findAll(filters: { search?: string }) {
    const { search } = filters;

    const conditions: Prisma.EmailWhereInput[] = [
      search
        ? {
            OR: [
              {
                name: { contains: search, mode: Prisma.QueryMode.insensitive },
              },
              {
                subject: {
                  contains: search,
                  mode: Prisma.QueryMode.insensitive,
                },
              },
              {
                htmlContent: {
                  contains: search,
                  mode: Prisma.QueryMode.insensitive,
                },
              },
            ],
          }
        : undefined,
    ].filter(Boolean);

    return this.emailsRepo.findAll({
      where: conditions.length > 0 ? { AND: conditions } : undefined,
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        attachments: true,
      },
    });
  }

  async getEmailById(id: string) {
    return this.emailsRepo.findUnique({
      where: { id },
      include: {
        attachments: true,
      },
    });
  }

  async remove(id: string) {
    const currentEmail = await this.emailsRepo.findUnique({
      where: { id },
    });

    if (!currentEmail) {
      throw new ConflictException('Email not found');
    }

    await this.emailsRepo.delete({
      where: { id },
    });

    return null;
  }
}
