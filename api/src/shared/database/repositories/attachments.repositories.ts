import { Injectable } from '@nestjs/common';
import { type Prisma } from '@prisma/client';
import { PrismaService } from '../prisma.service';

@Injectable()
export class EmailAttachmentsRepository {
  constructor(private readonly prismaService: PrismaService) {}

  create(createDto: Prisma.EmailAttachmentCreateArgs) {
    return this.prismaService.emailAttachment.create(createDto);
  }

  createMany(createManyDto: Prisma.EmailAttachmentCreateManyArgs) {
    return this.prismaService.emailAttachment.createMany(createManyDto);
  }

  findUnique(findUniqueDto: Prisma.EmailAttachmentFindUniqueArgs) {
    return this.prismaService.emailAttachment.findUnique(findUniqueDto);
  }

  findAll(findAllDto: Prisma.EmailAttachmentFindManyArgs) {
    return this.prismaService.emailAttachment.findMany(findAllDto);
  }

  findFirst(findFirstDto: Prisma.EmailAttachmentFindFirstArgs) {
    return this.prismaService.emailAttachment.findFirst(findFirstDto);
  }

  update(updateDto: Prisma.EmailAttachmentUpdateArgs) {
    return this.prismaService.emailAttachment.update(updateDto);
  }

  delete(deleteDto: Prisma.EmailAttachmentDeleteArgs) {
    return this.prismaService.emailAttachment.delete(deleteDto);
  }
}
