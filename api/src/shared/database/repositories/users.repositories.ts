import { Injectable } from '@nestjs/common';
import { type Prisma } from '@prisma/client';
import { PrismaService } from '../prisma.service';

@Injectable()
export class UsersRepository {
  constructor(private readonly prismaService: PrismaService) {}

  create(createDto: Prisma.UserCreateArgs) {
    return this.prismaService.user.create(createDto);
  }

  findUnique(findUniqueDto: Prisma.UserFindUniqueArgs) {
    return this.prismaService.user.findUnique(findUniqueDto);
  }

  findAll(findAllDto: Prisma.UserFindManyArgs) {
    return this.prismaService.user.findMany(findAllDto);
  }

  findFirst(findFirstDto: Prisma.UserFindFirstArgs) {
    return this.prismaService.user.findFirst(findFirstDto);
  }

  update(updateDto: Prisma.UserUpdateArgs) {
    return this.prismaService.user.update(updateDto);
  }

  delete(deleteDto: Prisma.UserDeleteArgs) {
    return this.prismaService.user.delete(deleteDto);
  }
}
