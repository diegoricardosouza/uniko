import { Injectable } from '@nestjs/common';
import { type Prisma } from '@prisma/client';
import { PrismaService } from '../prisma.service';

@Injectable()
export class TypesRepository {
  constructor(private readonly prismaService: PrismaService) {}

  create(createDto: Prisma.CategoryTypeCreateArgs) {
    return this.prismaService.categoryType.create(createDto);
  }

  findUnique(findUniqueDto: Prisma.CategoryTypeFindUniqueArgs) {
    return this.prismaService.categoryType.findUnique(findUniqueDto);
  }

  findAll(findAllDto: Prisma.CategoryTypeFindManyArgs) {
    return this.prismaService.categoryType.findMany(findAllDto);
  }

  findFirst(findFirstDto: Prisma.CategoryTypeFindFirstArgs) {
    return this.prismaService.categoryType.findFirst(findFirstDto);
  }

  update(updateDto: Prisma.CategoryTypeUpdateArgs) {
    return this.prismaService.categoryType.update(updateDto);
  }

  delete(deleteDto: Prisma.CategoryTypeDeleteArgs) {
    return this.prismaService.categoryType.delete(deleteDto);
  }
}
