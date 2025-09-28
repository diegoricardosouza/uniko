import { Injectable } from '@nestjs/common';
import { type Prisma } from '@prisma/client';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PostsRepository {
  constructor(private readonly prismaService: PrismaService) {}

  create(createDto: Prisma.PostCreateArgs) {
    return this.prismaService.post.create(createDto);
  }

  findUnique(findUniqueDto: Prisma.PostFindUniqueArgs) {
    return this.prismaService.post.findUnique(findUniqueDto);
  }

  findAll(findAllDto: Prisma.PostFindManyArgs) {
    return this.prismaService.post.findMany(findAllDto);
  }

  count(findAllDto: Prisma.PostCountArgs) {
    return this.prismaService.post.count(findAllDto);
  }

  findFirst(findFirstDto: Prisma.PostFindFirstArgs) {
    return this.prismaService.post.findFirst(findFirstDto);
  }

  update(updateDto: Prisma.PostUpdateArgs) {
    return this.prismaService.post.update(updateDto);
  }

  delete(deleteDto: Prisma.PostDeleteArgs) {
    return this.prismaService.post.delete(deleteDto);
  }
}
