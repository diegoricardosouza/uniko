import { ConflictException, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { FinalitiesRepository } from 'src/shared/database/repositories/finalities.repositories';
import { slugify } from 'src/utils/slugify';
import { CreateFinalityDto } from './dto/create-finality.dto';
import { UpdateFinalityDto } from './dto/update-finality.dto';

@Injectable()
export class FinalitiesService {
  constructor(private readonly finalitiesRepo: FinalitiesRepository) {}

  async create(createFinalityDto: CreateFinalityDto) {
    const { name } = createFinalityDto;

    const slug = slugify(name);
    let uniqueSlug = slug;
    let counter = 1;
    while (
      await this.finalitiesRepo.findUnique({ where: { slug: uniqueSlug } })
    ) {
      uniqueSlug = `${slug}-${counter}`;
      counter++;
    }

    return this.finalitiesRepo.create({
      data: {
        name,
        slug: uniqueSlug,
      },
      select: {
        id: true,
        name: true,
        slug: true,
        createdAt: true,
      },
    });
  }

  findAll(filters: { search?: string }) {
    const { search } = filters;

    const conditions: Prisma.CategoryFinalityWhereInput[] = [
      search
        ? {
            OR: [
              {
                name: { contains: search, mode: Prisma.QueryMode.insensitive },
              },
            ],
          }
        : undefined,
    ].filter(Boolean);

    return this.finalitiesRepo.findAll({
      where: conditions.length > 0 ? { AND: conditions } : undefined,
      orderBy: {
        createdAt: 'desc',
      },
      omit: {
        updatedAt: true,
      },
    });
  }

  async findOne(id: string) {
    const type = await this.finalitiesRepo.findUnique({
      where: { id },
      omit: {
        updatedAt: true,
      },
    });

    if (!type) {
      throw new ConflictException('Finality not found');
    }

    return type;
  }

  async update(id: string, updateFinalityDto: UpdateFinalityDto) {
    const { name } = updateFinalityDto;

    const currentState = await this.finalitiesRepo.findUnique({
      where: { id },
    });

    if (!currentState) {
      throw new ConflictException('Finality not found');
    }

    const slug = slugify(name);
    let uniqueSlug = slug;
    let counter = 1;
    while (
      await this.finalitiesRepo.findUnique({
        where: {
          slug: uniqueSlug,
          NOT: { id },
        },
      })
    ) {
      uniqueSlug = `${slug}-${counter}`;
      counter++;
    }

    return await this.finalitiesRepo.update({
      where: { id },
      data: {
        name,
        slug: uniqueSlug ? uniqueSlug : updateFinalityDto.slug,
      },
      omit: {
        updatedAt: true,
      },
    });
  }

  async remove(id: string) {
    const currentState = await this.finalitiesRepo.findUnique({
      where: { id },
    });

    if (!currentState) {
      throw new ConflictException('Finality not found');
    }

    await this.finalitiesRepo.delete({
      where: { id },
    });

    return null;
  }
}
