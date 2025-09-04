import { Injectable } from '@nestjs/common';
import { type Prisma } from '@prisma/client';
import { PrismaService } from '../prisma.service';

@Injectable()
export class FinalitiesRepository {
  constructor(private readonly prismaService: PrismaService) {}

  create(createDto: Prisma.CategoryFinalityCreateArgs) {
    return this.prismaService.categoryFinality.create(createDto);
  }

  findUnique(findUniqueDto: Prisma.CategoryFinalityFindUniqueArgs) {
    return this.prismaService.categoryFinality.findUnique(findUniqueDto);
  }

  findAll(findAllDto: Prisma.CategoryFinalityFindManyArgs) {
    return this.prismaService.categoryFinality.findMany(findAllDto);
  }

  findFirst(findFirstDto: Prisma.CategoryFinalityFindFirstArgs) {
    return this.prismaService.categoryFinality.findFirst(findFirstDto);
  }

  update(updateDto: Prisma.CategoryFinalityUpdateArgs) {
    return this.prismaService.categoryFinality.update(updateDto);
  }

  delete(deleteDto: Prisma.CategoryFinalityDeleteArgs) {
    return this.prismaService.categoryFinality.delete(deleteDto);
  }
}
