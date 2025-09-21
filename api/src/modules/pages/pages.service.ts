import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PagesRepository } from 'src/shared/database/repositories/pages.repositories';
import { slugify } from 'src/utils/slugify';
import { MediasService } from '../medias/medias.service';
import { CreatePageDto } from './dto/create-page.dto';
import { UpdatePageDto } from './dto/update-page.dto';

export interface FindPagesOptions {
  search?: string; // Busca por nome, subtitle ou content
  withFeaturedImage?: boolean; // Incluir imagem destacada
  page?: number;
  limit?: number;
  orderBy?: 'createdAt' | 'updatedAt' | 'name';
  orderDirection?: 'asc' | 'desc';
}

@Injectable()
export class PagesService {
  constructor(
    private readonly pagesRepo: PagesRepository,
    private readonly mediasRepo: MediasService,
  ) {}

  private async getPageMedias(pageId: string) {
    return this.mediasRepo.findByEntityId('Page', pageId);
  }

  private async getPagesMedias(pageIds: string[]) {
    return this.mediasRepo.findByEntityIds('Page', pageIds);
  }

  async create(
    createPageDto: CreatePageDto,
    featuredImageFile?: Express.Multer.File,
  ) {
    const { name, content } = createPageDto;

    const slug = slugify(name);
    let uniqueSlug = slug;
    let counter = 1;
    while (await this.pagesRepo.findUnique({ where: { slug: uniqueSlug } })) {
      uniqueSlug = `${slug}-${counter}`;
      counter++;
    }

    const page = await this.pagesRepo.create({
      data: {
        name: name,
        slug: uniqueSlug,
        content: content,
      },
      select: {
        id: true,
        name: true,
        slug: true,
        content: true,
        createdAt: true,
      },
    });

    if (featuredImageFile) {
      try {
        await this.mediasRepo.create(featuredImageFile, {
          entityId: page.id,
          entityType: 'Page',
          mediaType: 'featured_image',
        });
      } catch (mediaError) {
        console.log(mediaError);

        // Se houve erro ao criar a mídia, remove o post criado
        await this.pagesRepo.delete({ where: { id: page.id } });
        throw new InternalServerErrorException(
          'Erro ao processar imagem destacada. Página não foi criada.',
        );
      }
    }

    const medias = await this.getPageMedias(page.id);
    return { ...page, medias };
  }

  async findAll(options: FindPagesOptions = {}) {
    const { search } = options;

    const where: Prisma.PageWhereInput = {};

    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { content: { contains: search, mode: 'insensitive' } },
      ];
    }

    const pages = await this.pagesRepo.findAll({
      where,
      orderBy: {
        createdAt: 'desc',
      },
      select: {
        id: true,
        name: true,
        slug: true,
        content: true,
        createdAt: true,
      },
    });

    // Recuperar mídias para todas as páginas de uma vez
    const pageIds = pages.map((page) => page.id);
    const allMedias = await this.getPagesMedias(pageIds);

    // Agrupar mídias por página
    const mediasByPageId = allMedias.reduce((acc, media) => {
      if (!acc[media.entityId]) {
        acc[media.entityId] = [];
      }
      acc[media.entityId].push(media);
      return acc;
    }, {});

    // Adicionar mídias às páginas
    return pages.map((page) => ({
      ...page,
      medias: mediasByPageId[page.id] || [],
    }));
  }

  async findOne(id: string) {
    const page = await this.pagesRepo.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        slug: true,
        content: true,
        createdAt: true,
      },
    });

    if (!page) {
      throw new ConflictException('Page not found');
    }

    const medias = await this.getPageMedias(id);
    return { ...page, medias };
  }

  async findSlug(slug: string) {
    const page = await this.pagesRepo.findUnique({
      where: { slug },
      select: {
        id: true,
        name: true,
        slug: true,
        content: true,
        createdAt: true,
      },
    });

    if (!page) {
      throw new ConflictException('Page not found');
    }

    const medias = await this.getPageMedias(page.id);
    return { ...page, medias };
  }

  async update(
    id: string,
    updatePageDto: UpdatePageDto,
    featuredImageFile?: Express.Multer.File,
  ) {
    const { name, content } = updatePageDto;

    const currentCat = await this.pagesRepo.findUnique({
      where: { id },
    });

    if (!currentCat) {
      throw new ConflictException('Page not found');
    }

    if (featuredImageFile) {
      try {
        await this.mediasRepo.removeAllFromEntity('Page', id, true);

        await this.mediasRepo.create(featuredImageFile, {
          entityId: id,
          entityType: 'Page',
          mediaType: 'featured_image',
        });
      } catch (mediaError) {
        console.log(mediaError);

        // Se houve erro ao criar a mídia, remove o post criado
        await this.pagesRepo.delete({ where: { id: id } });
        throw new InternalServerErrorException(
          'Erro ao processar imagem destacada. Pagina não foi criada.',
        );
      }
    }

    let uniqueSlug;

    if (name) {
      const baseSlug = slugify(name);
      uniqueSlug = baseSlug;
      let counter = 1;

      while (
        await this.pagesRepo.findUnique({
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

    const updatedPage = await this.pagesRepo.update({
      where: { id },
      data: {
        name,
        slug: uniqueSlug ? uniqueSlug : updatePageDto.slug,
        content,
      },
      select: {
        id: true,
        name: true,
        slug: true,
        content: true,
        createdAt: true,
      },
    });

    const medias = await this.getPageMedias(id);
    return { ...updatedPage, medias };
  }

  async remove(id: string, hardDelete: boolean = false) {
    const currentCat = await this.pagesRepo.findUnique({
      where: { id },
    });

    if (!currentCat) {
      throw new ConflictException('Page not found');
    }

    try {
      if (hardDelete) {
        // Remove todas as mídias associadas
        await this.mediasRepo.removeAllFromEntity('Page', id, true);

        // Remove o post (cascade irá remover as categorias)
        await this.pagesRepo.delete({
          where: { id },
        });

        return null;
      } else {
        // Para soft delete, você precisaria adicionar um campo 'active' no modelo Post
        // Por enquanto, vamos fazer hard delete mesmo
        await this.remove(id, true);

        return null;
      }
    } catch (error) {
      console.log(error);

      throw new InternalServerErrorException(
        'Erro interno ao remover a página',
      );
    }
  }
}
