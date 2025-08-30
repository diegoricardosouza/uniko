import { Injectable } from '@nestjs/common';
import { type Prisma } from '@prisma/client';
import { PrismaService } from '../prisma.service';

@Injectable()
export class EmailsRepository {
  constructor(private readonly prismaService: PrismaService) {}

  create(createDto: Prisma.EmailCreateArgs) {
    return this.prismaService.email.create(createDto);
  }

  findUnique(findUniqueDto: Prisma.EmailFindUniqueArgs) {
    return this.prismaService.email.findUnique(findUniqueDto);
  }

  findAll(findAllDto: Prisma.EmailFindManyArgs) {
    return this.prismaService.email.findMany(findAllDto);
  }

  findFirst(findFirstDto: Prisma.EmailFindFirstArgs) {
    return this.prismaService.email.findFirst(findFirstDto);
  }

  update(updateDto: Prisma.EmailUpdateArgs) {
    return this.prismaService.email.update(updateDto);
  }

  delete(deleteDto: Prisma.EmailDeleteArgs) {
    return this.prismaService.email.delete(deleteDto);
  }
}
