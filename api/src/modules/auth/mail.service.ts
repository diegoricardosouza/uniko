import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailService {
  private transporter;

  constructor() {
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

  async sendPasswordResetEmail(to: string, resetUrl: string): Promise<void> {
    await this.transporter.sendMail({
      from: '"Uniko" <noreply@unikoimoveis.com.br>',
      to,
      subject: 'Redefinição de senha',
      html: `
        <h1>Redefinição de senha</h1>
        <p>Você solicitou uma redefinição de senha. Clique no link abaixo:</p>
        <a href="${resetUrl}">Redefinir senha</a>
        <p>Este link irá expirar em 1 hora.</p>
        <p>Se você não solicitou a redefinição, ignore este e-mail.</p>
      `,
    });
  }
}
