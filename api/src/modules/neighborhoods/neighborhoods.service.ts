import { ConflictException, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { NeighborhoodsRepository } from 'src/shared/database/repositories/neighborhoods.repositories';
import { slugify } from 'src/utils/slugify';
import { CreateNeighborhoodDto } from './dto/create-neighborhood.dto';
import { UpdateNeighborhoodDto } from './dto/update-neighborhood.dto';

@Injectable()
export class NeighborhoodsService {
  constructor(
    private readonly neighRepo: NeighborhoodsRepository,
  ) {}

  async create(createNeighborhoodDto: CreateNeighborhoodDto) {
    const { name, cityId } = createNeighborhoodDto;
    
    const slug = slugify(name);
    let uniqueSlug = slug;
    let counter = 1;
    while (await this.neighRepo.findUnique({ where: { slug: uniqueSlug } })) {
      uniqueSlug = `${slug}-${counter}`;
      counter++;
    }

    return this.neighRepo.create({
      data: {
        name,
        slug: uniqueSlug,
        cityId
      },
      include: {
        city: {
          omit: {
            updatedAt: true
          }
        }
      }
    });
  }

  findAll(filters: { search?: string; }) {
    const { search } = filters;

    const conditions: Prisma.NeighborhoodWhereInput[] = [
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

    return this.neighRepo.findAll({
      where: conditions.length > 0 ? { AND: conditions } : undefined,
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        city: {
          omit: {
            updatedAt: true,
            stateId: true,
          },
          include: {
            state: {
              omit: {
                updatedAt: true
              }
            }
          }
        }
      },
      omit: {
        updatedAt: true
      }
    });
  }

  async findOne(id: string) {
    const neighborhood = await this.neighRepo.findUnique({
      where: { id },
      include: {
        city: {
          omit: {
            updatedAt: true,
            stateId: true,
          },
          include: {
            state: {
              omit: {
                updatedAt: true
              }
            }
          }
        }
      },
      omit: {
        updatedAt: true
      }
    });

    if (!neighborhood) {
      throw new ConflictException('Neighborhood not found');
    }

    return neighborhood;
  }

  async update(id: string, updateNeighborhoodDto: UpdateNeighborhoodDto) {
    const { name, cityId } = updateNeighborhoodDto;

    const currentState = await this.neighRepo.findUnique({
      where: { id },
    });

    if (!currentState) {
      throw new ConflictException('Neighborhood not found');
    }

    const slug = slugify(name);
    let uniqueSlug = slug;
    let counter = 1;
    while (
      await this.neighRepo.findUnique({
        where: {
          slug: uniqueSlug,
          NOT: { id },
        },
      })
    ) {
      uniqueSlug = `${slug}-${counter}`;
      counter++;
    }

    return this.neighRepo.update({
      where: { id },
      data: {
        name,
        slug: uniqueSlug ? uniqueSlug : updateNeighborhoodDto.slug,
        cityId,
      },
      include: {
        city: {
          omit: {
            updatedAt: true,
            stateId: true,
          },
          include: {
            state: {
              omit: {
                updatedAt: true
              }
            }
          }
        }
      },
      omit: {
        updatedAt: true
      }
    });
  }

  async remove(id: string) {
    const currentState = await this.neighRepo.findUnique({
      where: { id },
    });

    if (!currentState) {
      throw new ConflictException('Neighborhood not found');
    }

    await this.neighRepo.delete({
      where: { id },
    });

    return null;
  }
}
