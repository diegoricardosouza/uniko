import { Injectable } from '@nestjs/common';
import { type Prisma } from '@prisma/client';
import { PrismaService } from '../prisma.service';

@Injectable()
export class SettingsRepository {
  constructor(private readonly prismaService: PrismaService) {}

  create(createDto: Prisma.SettingCreateArgs) {
    return this.prismaService.setting.create(createDto);
  }

  findUnique(findUniqueDto: Prisma.SettingFindUniqueArgs) {
    return this.prismaService.setting.findUnique(findUniqueDto);
  }

  findAll(findAllDto: Prisma.SettingFindManyArgs) {
    return this.prismaService.setting.findMany(findAllDto);
  }

  findFirst(findFirstDto: Prisma.SettingFindFirstArgs) {
    return this.prismaService.setting.findFirst(findFirstDto);
  }

  update(updateDto: Prisma.SettingUpdateArgs) {
    return this.prismaService.setting.update(updateDto);
  }

  delete(deleteDto: Prisma.SettingDeleteArgs) {
    return this.prismaService.setting.delete(deleteDto);
  }
}
