import { Injectable } from '@nestjs/common';
import { type Prisma } from '@prisma/client';
import { PrismaService } from '../prisma.service';

@Injectable()
export class NeighborhoodsRepository {
  constructor(private readonly prismaService: PrismaService) {}

  create(createDto: Prisma.NeighborhoodCreateArgs) {
    return this.prismaService.neighborhood.create(createDto);
  }

  findUnique(findUniqueDto: Prisma.NeighborhoodFindUniqueArgs) {
    return this.prismaService.neighborhood.findUnique(findUniqueDto);
  }

  findAll(findAllDto: Prisma.NeighborhoodFindManyArgs) {
    return this.prismaService.neighborhood.findMany(findAllDto);
  }

  findFirst(findFirstDto: Prisma.NeighborhoodFindFirstArgs) {
    return this.prismaService.neighborhood.findFirst(findFirstDto);
  }

  update(updateDto: Prisma.NeighborhoodUpdateArgs) {
    return this.prismaService.neighborhood.update(updateDto);
  }

  delete(deleteDto: Prisma.NeighborhoodDeleteArgs) {
    return this.prismaService.neighborhood.delete(deleteDto);
  }
}
