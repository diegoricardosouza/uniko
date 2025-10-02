import { Injectable } from '@nestjs/common';
import { type Prisma } from '@prisma/client';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PropertiesRepository {
  constructor(private readonly prismaService: PrismaService) {}

  create(createDto: Prisma.PropertyCreateArgs) {
    return this.prismaService.property.create(createDto);
  }

  findUnique(findUniqueDto: Prisma.PropertyFindUniqueArgs) {
    return this.prismaService.property.findUnique(findUniqueDto);
  }

  findAll(findAllDto: Prisma.PropertyFindManyArgs) {
    return this.prismaService.property.findMany(findAllDto);
  }

  count(findAllDto: Prisma.PropertyCountArgs) {
    return this.prismaService.property.count(findAllDto);
  }

  findFirst(findFirstDto: Prisma.PropertyFindFirstArgs) {
    return this.prismaService.property.findFirst(findFirstDto);
  }

  update(updateDto: Prisma.PropertyUpdateArgs) {
    return this.prismaService.property.update(updateDto);
  }

  delete(deleteDto: Prisma.PropertyDeleteArgs) {
    return this.prismaService.property.delete(deleteDto);
  }
}
