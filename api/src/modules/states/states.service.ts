import { ConflictException, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { StatesRepository } from 'src/shared/database/repositories/states.repositories';
import { slugify } from 'src/utils/slugify';
import { CreateStateDto } from './dto/create-state.dto';
import { UpdateStateDto } from './dto/update-state.dto';

@Injectable()
export class StatesService {
  constructor(
    private readonly statesRepo: StatesRepository,
  ) {}

  async create(createStateDto: CreateStateDto) {
    const { name, acronym } = createStateDto;

    const slug = slugify(name);
    let uniqueSlug = slug;
    let counter = 1;
    while (await this.statesRepo.findUnique({ where: { slug: uniqueSlug } })) {
      uniqueSlug = `${slug}-${counter}`;
      counter++;
    }

    return this.statesRepo.create({
      data: {
        name,
        slug: uniqueSlug,
        acronym
      },
      select: {
        id: true,
        name: true,
        slug: true,
        acronym: true,
        createdAt: true,
      },
    });
  }

  findAll(filters: { search?: string; }) {
    const { search } = filters;

    const conditions: Prisma.StateWhereInput[] = [
      search
        ? {
            OR: [
              {
                name: { contains: search, mode: Prisma.QueryMode.insensitive },
              },
              {
                acronym: { contains: search, mode: Prisma.QueryMode.insensitive },
              },
            ],
          }
        : undefined,
    ].filter(Boolean);

    return this.statesRepo.findAll({
      where: conditions.length > 0 ? { AND: conditions } : undefined,
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        cities: true,
      },
      omit: {
        updatedAt: true
      }
    });
  }

  async findOne(id: string) {
    const state = await this.statesRepo.findUnique({
      where: { id },
      include: {
        cities: true,
      },
      omit: {
        updatedAt: true
      }
    });

    if (!state) {
      throw new ConflictException('State not found');
    }

    return state;
  }

  async update(id: string, updateStateDto: UpdateStateDto) {
    const { name, acronym} = updateStateDto;

    const currentState = await this.statesRepo.findUnique({
      where: { id },
    });

    if (!currentState) {
      throw new ConflictException('State not found');
    }

    const slug = slugify(name);
    let uniqueSlug = slug;
    let counter = 1;
    while (
      await this.statesRepo.findUnique({
        where: {
          slug: uniqueSlug,
          NOT: { id },
        },
      })
    ) {
      uniqueSlug = `${slug}-${counter}`;
      counter++;
    }

    return await this.statesRepo.update({
      where: { id },
      data: {
        name,
        slug: uniqueSlug ? uniqueSlug : updateStateDto.slug,
        acronym,
      },
      include: {
        cities: true,
      },
      omit: {
        updatedAt: true
      }
    });
  }

  async remove(id: string) {
    const currentState = await this.statesRepo.findUnique({
      where: { id },
    });

    if (!currentState) {
      throw new ConflictException('State not found');
    }

    await this.statesRepo.delete({
      where: { id },
    });

    return null;
  }
}
