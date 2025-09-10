/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PropertiesRepository } from 'src/shared/database/repositories/properties.repositories';
import { slugify } from 'src/utils/slugify';
import { MediasService } from '../medias/medias.service';
import { CreatePropertyDto } from './dto/create-property.dto';
import { UpdatePropertyDto } from './dto/update-property.dto';

export interface FindPropertiesOptions {
  search?: string;
  city?: string;
  neighborhood?: string;
  types?: string[];
  finalities?: string[];
  characteristics?: string[];
  page?: number;
  limit?: number;
  orderBy?: 'createdAt' | 'updatedAt' | 'name';
  orderDirection?: 'asc' | 'desc';
}

type PropertyWithTypesAndFinalities = Prisma.PropertyGetPayload<{
  include: {
    types: {
      include: {
        type: true;
      };
      omit: {
        propertyId: true;
        typeId: true;
      };
    };
    finalities: {
      include: {
        finality: true;
      };
      omit: {
        propertyId: true;
        finalityId: true;
      };
    };
  };
}>;

@Injectable()
export class PropertiesService {
  constructor(
    private readonly propertiesRepo: PropertiesRepository,
    private readonly mediasRepo: MediasService,
  ) {}

  private async getPropertyMedias(pageId: string) {
    return this.mediasRepo.findByEntityId('Property', pageId);
  }

  private async getPropertiesMedias(pageIds: string[]) {
    return this.mediasRepo.findByEntityIds('Property', pageIds);
  }

  async create(
    createPropertyDto: CreatePropertyDto,
    featuredImageFile?: Express.Multer.File | null,
    gallery?: Express.Multer.File[] | null,
  ) {
    const {
      title,
      typeIds,
      finalityIds,
      characteristic,
      infrastructure,
      ...propertyData
    } = createPropertyDto;

    const slug = slugify(title);
    let uniqueSlug = slug;
    let counter = 1;
    while (
      await this.propertiesRepo.findUnique({ where: { slug: uniqueSlug } })
    ) {
      uniqueSlug = `${slug}-${counter}`;
      counter++;
    }

    const property = await this.propertiesRepo.create({
      data: {
        title,
        slug: uniqueSlug,
        ...propertyData,
        ...(typeIds?.length && {
          types: {
            create: typeIds.map((typeId) => ({ typeId })),
          },
        }),
        ...(finalityIds?.length && {
          finalities: {
            create: finalityIds.map((finalityId) => ({ finalityId })),
          },
        }),
        ...(characteristic?.length && {
          characteristics: {
            create: characteristic.map((name) => ({ name })),
          },
        }),
        ...(infrastructure?.length && {
          infrastructures: {
            create: infrastructure.map((name) => ({ name })),
          },
        }),
      },
      include: {
        city: true,
        neighborhood: true,
        types: true,
        finalities: true,
        characteristics: {
          omit: {
            propertyId: true,
            createdAt: true,
            updatedAt: true,
          },
        },
        infrastructures: {
          omit: {
            propertyId: true,
            createdAt: true,
            updatedAt: true,
          },
        },
      },
    });

    try {
      // Adiciona imagem destacada se fornecida
      if (featuredImageFile) {
        await this.mediasRepo.create(featuredImageFile, {
          entityId: property.id,
          entityType: 'Property',
          mediaType: 'featured_image',
        });
      }

      // galeria de imagens
      if (gallery.length) {
        for (const file of gallery) {
          await this.mediasRepo.create(file, {
            entityId: property.id,
            entityType: 'Property',
            mediaType: 'gallery',
          });
        }
      }
    } catch (mediaError) {
      // rollback básico se der erro nas mídias
      await this.propertiesRepo.delete({ where: { id: property.id } });
      throw new InternalServerErrorException(
        'Erro ao processar imagens. Imóvel não foi criado.',
      );
    }

    const medias = await this.getPropertyMedias(property.id);
    return { ...property, medias };
  }

  async findAll(options: FindPropertiesOptions = {}) {
    const { search, city, neighborhood, types, finalities } = options;

    const where: Prisma.PropertyWhereInput = {};

    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
        { reference: { contains: search, mode: 'insensitive' } },
      ];
    }

    if (city) {
      where.city = {
        name: {
          contains: city,
        },
      };
    }

    if (neighborhood) {
      where.neighborhood = {
        name: {
          contains: neighborhood,
        },
      };
    }

    if (types?.length) {
      where.types = {
        some: {
          typeId: { in: types },
        },
      };
    }

    if (finalities?.length) {
      where.finalities = {
        some: {
          finalityId: { in: finalities },
        },
      };
    }

    const rawProperties = (await this.propertiesRepo.findAll({
      where,
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        city: {
          include: {
            state: true,
          },
          omit: {
            stateId: true,
          },
        },
        neighborhood: {
          omit: {
            cityId: true,
          },
        },
        types: {
          include: {
            type: true,
          },
          omit: {
            propertyId: true,
            typeId: true,
          },
        },
        finalities: {
          include: {
            finality: true,
          },
          omit: {
            propertyId: true,
            finalityId: true,
          },
        },
        characteristics: {
          omit: {
            propertyId: true,
            createdAt: true,
            updatedAt: true,
          },
        },
        infrastructures: {
          omit: {
            propertyId: true,
            createdAt: true,
            updatedAt: true,
          },
        },
      },
      omit: {
        cityId: true,
        neighborhoodId: true,
      },
    })) as PropertyWithTypesAndFinalities[];

    const properties = rawProperties.map((property) => ({
      ...property,
      id: property.id,
      types: property.types.map((pt) => pt.type),
      finalities: property.finalities.map((pf) => pf.finality),
    }));

    const propertiesIds = properties.map((property) => property.id);
    const allMedias = await this.getPropertiesMedias(propertiesIds);

    // Agrupar mídias por página
    const mediasByPropertyId = allMedias.reduce((acc, media) => {
      if (!acc[media.entityId]) {
        acc[media.entityId] = [];
      }
      acc[media.entityId].push(media);
      return acc;
    }, {});

    // Adicionar mídias às páginas
    const propertiesWithMedias = properties.map((property) => ({
      ...property,
      medias: mediasByPropertyId[property.id] || [],
    }));

    return propertiesWithMedias;
  }

  async findOne(id: string) {
    const rawProperty = (await this.propertiesRepo.findUnique({
      where: { id },
      include: {
        city: {
          include: {
            state: true,
          },
          omit: {
            stateId: true,
          },
        },
        neighborhood: {
          omit: {
            cityId: true,
          },
        },
        types: {
          include: {
            type: true,
          },
          omit: {
            propertyId: true,
            typeId: true,
          },
        },
        finalities: {
          include: {
            finality: true,
          },
          omit: {
            propertyId: true,
            finalityId: true,
          },
        },
        characteristics: {
          omit: {
            propertyId: true,
            createdAt: true,
            updatedAt: true,
          },
        },
        infrastructures: {
          omit: {
            propertyId: true,
            createdAt: true,
            updatedAt: true,
          },
        },
      },
      omit: {
        cityId: true,
        neighborhoodId: true,
      },
    })) as PropertyWithTypesAndFinalities;

    if (!rawProperty) {
      throw new ConflictException('Property not found');
    }

    const properties = {
      ...rawProperty,
      id: rawProperty.id,
      types: rawProperty.types.map((pt) => pt.type),
      finalities: rawProperty.finalities.map((pf) => pf.finality),
    };

    const medias = await this.getPropertyMedias(id);
    return { ...properties, medias };
  }

  async update(
    id: string,
    updatePropertyDto: UpdatePropertyDto,
    featuredImageFile?: Express.Multer.File | null,
    gallery?: Express.Multer.File[] | null,
  ) {
    const {
      title,
      cityId,
      neighborhoodId,
      typeIds,
      finalityIds,
      characteristic,
      infrastructure,
      ...updateData
    } = updatePropertyDto;

    try {
      // Adiciona imagem destacada se fornecida
      if (featuredImageFile) {
        await this.mediasRepo.removeAllFromEntity('Property', id, true);

        await this.mediasRepo.create(featuredImageFile, {
          entityId: id,
          entityType: 'Property',
          mediaType: 'featured_image',
        });
      }

      // galeria de imagens
      if (gallery.length) {
        await this.mediasRepo.removeAllFromEntity('Property', id, true);

        for (const file of gallery) {
          await this.mediasRepo.create(file, {
            entityId: id,
            entityType: 'Property',
            mediaType: 'gallery',
          });
        }
      }
    } catch (mediaError) {
      // rollback básico se der erro nas mídias
      await this.propertiesRepo.delete({ where: { id } });
      throw new InternalServerErrorException(
        'Erro ao processar imagens. Imóvel não foi criado.',
      );
    }

    let uniqueSlug;

    if (title) {
      const baseSlug = slugify(title);
      uniqueSlug = baseSlug;
      let counter = 1;

      while (
        await this.propertiesRepo.findUnique({
          where: {
            slug: uniqueSlug,
            NOT: { id },
          },
        })
      ) {
        uniqueSlug = `${baseSlug}-${counter}`;
        counter++;
      }
    }

    const updatedProperty = await this.propertiesRepo.update({
      where: { id },
      data: {
        ...updateData,
        title,
        slug: uniqueSlug ? uniqueSlug : updatePropertyDto.slug,
        ...(cityId && {
          city: {
            connect: { id: cityId },
          },
        }),
        ...(neighborhoodId && {
          neighborhood: {
            connect: { id: neighborhoodId },
          },
        }),
        // Atualiza categorias se fornecidas
        ...(typeIds !== undefined && {
          types: {
            deleteMany: {},
            create: typeIds.map((typeId) => ({ typeId })),
          },
        }),
        ...(finalityIds !== undefined && {
          finalities: {
            deleteMany: {},
            create: finalityIds.map((finalityId) => ({
              finalityId,
            })),
          },
        }),
        ...(characteristic !== undefined && {
          characteristics: {
            deleteMany: {},
            create: characteristic.map((name) => ({ name })),
          },
        }),
        ...(infrastructure !== undefined && {
          infrastructures: {
            deleteMany: {},
            create: infrastructure.map((name) => ({ name })),
          },
        }),
      },
      include: {
        city: true,
        neighborhood: true,
        types: true,
        finalities: true,
        characteristics: {
          omit: {
            propertyId: true,
            createdAt: true,
            updatedAt: true,
          },
        },
        infrastructures: {
          omit: {
            propertyId: true,
            createdAt: true,
            updatedAt: true,
          },
        },
      },
    });

    const medias = await this.getPropertyMedias(id);
    return { ...updatedProperty, medias };
  }

  async remove(id: string) {
    const currentCat = await this.propertiesRepo.findUnique({
      where: { id },
    });

    if (!currentCat) {
      throw new ConflictException('Property not found');
    }

    await this.mediasRepo.removeAllFromEntity('Property', id, true);
    await this.propertiesRepo.delete({
      where: { id },
    });

    return null;
  }
}
