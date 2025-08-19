import { Injectable } from '@nestjs/common';
import { type Prisma } from '@prisma/client';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PagesRepository {
  constructor(private readonly prismaService: PrismaService) {}

  create(createDto: Prisma.PageCreateArgs) {
    return this.prismaService.page.create(createDto);
  }

  findUnique(findUniqueDto: Prisma.PageFindUniqueArgs) {
    return this.prismaService.page.findUnique(findUniqueDto);
  }

  findAll(findAllDto: Prisma.PageFindManyArgs) {
    return this.prismaService.page.findMany(findAllDto);
  }

  findFirst(findFirstDto: Prisma.PageFindFirstArgs) {
    return this.prismaService.page.findFirst(findFirstDto);
  }

  update(updateDto: Prisma.PageUpdateArgs) {
    return this.prismaService.page.update(updateDto);
  }

  delete(deleteDto: Prisma.PageDeleteArgs) {
    return this.prismaService.page.delete(deleteDto);
  }
}
