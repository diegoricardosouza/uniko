import { ConflictException, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { TypesRepository } from 'src/shared/database/repositories/types.repositories';
import { slugify } from 'src/utils/slugify';
import { CreateTypeDto } from './dto/create-type.dto';
import { UpdateTypeDto } from './dto/update-type.dto';

@Injectable()
export class TypesService {
  constructor(private readonly typesRepo: TypesRepository) {}

  async create(createTypeDto: CreateTypeDto) {
    const { name } = createTypeDto;

    const slug = slugify(name);
    let uniqueSlug = slug;
    let counter = 1;
    while (await this.typesRepo.findUnique({ where: { slug: uniqueSlug } })) {
      uniqueSlug = `${slug}-${counter}`;
      counter++;
    }

    return this.typesRepo.create({
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

    const conditions: Prisma.CategoryTypeWhereInput[] = [
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

    return this.typesRepo.findAll({
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
    const type = await this.typesRepo.findUnique({
      where: { id },
      omit: {
        updatedAt: true,
      },
    });

    if (!type) {
      throw new ConflictException('Type not found');
    }

    return type;
  }

  async update(id: string, updateTypeDto: UpdateTypeDto) {
    const { name } = updateTypeDto;

    const currentState = await this.typesRepo.findUnique({
      where: { id },
    });

    if (!currentState) {
      throw new ConflictException('Type not found');
    }

    const slug = slugify(name);
    let uniqueSlug = slug;
    let counter = 1;
    while (
      await this.typesRepo.findUnique({
        where: {
          slug: uniqueSlug,
          NOT: { id },
        },
      })
    ) {
      uniqueSlug = `${slug}-${counter}`;
      counter++;
    }

    return await this.typesRepo.update({
      where: { id },
      data: {
        name,
        slug: uniqueSlug ? uniqueSlug : updateTypeDto.slug,
      },
      omit: {
        updatedAt: true,
      },
    });
  }

  async remove(id: string) {
    const currentState = await this.typesRepo.findUnique({
      where: { id },
    });

    if (!currentState) {
      throw new ConflictException('Type not found');
    }

    await this.typesRepo.delete({
      where: { id },
    });

    return null;
  }
}
