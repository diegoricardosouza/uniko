import { Injectable } from '@nestjs/common';
import { type Prisma } from '@prisma/client';
import { PrismaService } from '../prisma.service';

@Injectable()
export class CitiesRepository {
  constructor(private readonly prismaService: PrismaService) {}

  create(createDto: Prisma.CityCreateArgs) {
    return this.prismaService.city.create(createDto);
  }

  findUnique(findUniqueDto: Prisma.CityFindUniqueArgs) {
    return this.prismaService.city.findUnique(findUniqueDto);
  }

  findAll(findAllDto: Prisma.CityFindManyArgs) {
    return this.prismaService.city.findMany(findAllDto);
  }

  findFirst(findFirstDto: Prisma.CityFindFirstArgs) {
    return this.prismaService.city.findFirst(findFirstDto);
  }

  update(updateDto: Prisma.CityUpdateArgs) {
    return this.prismaService.city.update(updateDto);
  }

  delete(deleteDto: Prisma.CityDeleteArgs) {
    return this.prismaService.city.delete(deleteDto);
  }
}
