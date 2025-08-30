import { Injectable } from '@nestjs/common';
import { type Prisma } from '@prisma/client';
import { PrismaService } from '../prisma.service';

@Injectable()
export class StatesRepository {
  constructor(private readonly prismaService: PrismaService) {}

  create(createDto: Prisma.StateCreateArgs) {
    return this.prismaService.state.create(createDto);
  }

  findUnique(findUniqueDto: Prisma.StateFindUniqueArgs) {
    return this.prismaService.state.findUnique(findUniqueDto);
  }

  findAll(findAllDto: Prisma.StateFindManyArgs) {
    return this.prismaService.state.findMany(findAllDto);
  }

  findFirst(findFirstDto: Prisma.StateFindFirstArgs) {
    return this.prismaService.state.findFirst(findFirstDto);
  }

  update(updateDto: Prisma.StateUpdateArgs) {
    return this.prismaService.state.update(updateDto);
  }

  delete(deleteDto: Prisma.StateDeleteArgs) {
    return this.prismaService.state.delete(deleteDto);
  }
}
