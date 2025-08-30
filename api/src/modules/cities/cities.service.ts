import { ConflictException, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { CitiesRepository } from 'src/shared/database/repositories/cities.repositories';
import { slugify } from 'src/utils/slugify';
import { CreateCityDto } from './dto/create-city.dto';
import { UpdateCityDto } from './dto/update-city.dto';

@Injectable()
export class CitiesService {
  constructor(
    private readonly citiesRepo: CitiesRepository,
  ) {}

  async create(createCityDto: CreateCityDto) {
    const { name, stateId } = createCityDto;

    const slug = slugify(name);
    let uniqueSlug = slug;
    let counter = 1;
    while (await this.citiesRepo.findUnique({ where: { slug: uniqueSlug } })) {
      uniqueSlug = `${slug}-${counter}`;
      counter++;
    }

    return this.citiesRepo.create({
      data: {
        name,
        slug: uniqueSlug,
        stateId
      },
      include: {
        state: {
          omit: {
            updatedAt: true
          }
        }
      }
    });
  }

  findAll(filters: { search?: string; }) {
    const { search } = filters;

    const conditions: Prisma.CityWhereInput[] = [
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

    return this.citiesRepo.findAll({
      where: conditions.length > 0 ? { AND: conditions } : undefined,
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        state: {
          omit: {
            updatedAt: true
          }
        }
      },
      omit: {
        updatedAt: true
      }
    });
  }

  async findOne(id: string) {
    const state = await this.citiesRepo.findUnique({
      where: { id },
      include: {
        state: {
          omit: {
            updatedAt: true
          }
        }
      },
      omit: {
        updatedAt: true
      }
    });

    if (!state) {
      throw new ConflictException('City not found');
    }

    return state;
  }

  async update(id: string, updateCityDto: UpdateCityDto) {
    const { name, stateId } = updateCityDto;

    const currentState = await this.citiesRepo.findUnique({
      where: { id },
    });

    if (!currentState) {
      throw new ConflictException('City not found');
    }

    const slug = slugify(name);
    let uniqueSlug = slug;
    let counter = 1;
    while (
      await this.citiesRepo.findUnique({
        where: {
          slug: uniqueSlug,
          NOT: { id },
        },
      })
    ) {
      uniqueSlug = `${slug}-${counter}`;
      counter++;
    }

    return this.citiesRepo.update({
      where: { id },
      data: {
        name,
        slug: uniqueSlug ? uniqueSlug : updateCityDto.slug,
        stateId,
      },
      include: {
        state: {
          omit: {
            updatedAt: true
          }
        }
      },
      omit: {
        updatedAt: true
      }
    });
  }

  async remove(id: string) {
    const currentState = await this.citiesRepo.findUnique({
      where: { id },
    });

    if (!currentState) {
      throw new ConflictException('City not found');
    }

    await this.citiesRepo.delete({
      where: { id },
    });

    return null;
  }
}
