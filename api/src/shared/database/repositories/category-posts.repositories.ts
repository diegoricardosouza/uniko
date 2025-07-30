import { Injectable } from '@nestjs/common';
import { type Prisma } from '@prisma/client';
import { PrismaService } from '../prisma.service';

@Injectable()
export class CategoryPostsRepository {
  constructor(private readonly prismaService: PrismaService) {}

  create(createDto: Prisma.CategoryPostCreateArgs) {
    return this.prismaService.categoryPost.create(createDto);
  }

  findUnique(findUniqueDto: Prisma.CategoryPostFindUniqueArgs) {
    return this.prismaService.categoryPost.findUnique(findUniqueDto);
  }

  findAll(findAllDto: Prisma.CategoryPostFindManyArgs) {
    return this.prismaService.categoryPost.findMany(findAllDto);
  }

  findFirst(findFirstDto: Prisma.CategoryPostFindFirstArgs) {
    return this.prismaService.categoryPost.findFirst(findFirstDto);
  }

  update(updateDto: Prisma.CategoryPostUpdateArgs) {
    return this.prismaService.categoryPost.update(updateDto);
  }

  delete(deleteDto: Prisma.CategoryPostDeleteArgs) {
    return this.prismaService.categoryPost.delete(deleteDto);
  }
}
