import { Injectable } from '@nestjs/common';
import { type Prisma } from '@prisma/client';
import { PrismaService } from '../prisma.service';

@Injectable()
export class MediasRepository {
  constructor(private readonly prismaService: PrismaService) {}

  create(createDto: Prisma.MediaCreateArgs) {
    return this.prismaService.media.create(createDto);
  }

  findUnique(findUniqueDto: Prisma.MediaFindUniqueArgs) {
    return this.prismaService.media.findUnique(findUniqueDto);
  }

  findAll(findAllDto: Prisma.MediaFindManyArgs) {
    return this.prismaService.media.findMany(findAllDto);
  }

  findFirst(findFirstDto: Prisma.MediaFindFirstArgs) {
    return this.prismaService.media.findFirst(findFirstDto);
  }

  findMany(findManyDto: Prisma.MediaFindManyArgs) {
    return this.prismaService.media.findMany(findManyDto);
  }

  update(updateDto: Prisma.MediaUpdateArgs) {
    return this.prismaService.media.update(updateDto);
  }

  updateMany(updateManyDto: Prisma.MediaUpdateManyArgs) {
    return this.prismaService.media.updateMany(updateManyDto);
  }

  delete(deleteDto: Prisma.MediaDeleteArgs) {
    return this.prismaService.media.delete(deleteDto);
  }

  deleteMany(deleteManyDto: Prisma.MediaDeleteManyArgs) {
    return this.prismaService.media.deleteMany(deleteManyDto);
  }

  count(countDto: Prisma.MediaCountArgs) {
    return this.prismaService.media.count(countDto);
  }

  aggregate(aggregateDto: Prisma.MediaAggregateArgs) {
    return this.prismaService.media.aggregate(aggregateDto);
  }
}
