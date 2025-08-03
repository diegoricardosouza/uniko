/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Media, Post, Prisma } from '@prisma/client';
import { PostsRepository } from 'src/shared/database/repositories/posts.repositories';
import { slugify } from 'src/utils/slugify';
import { MediasService } from '../medias/medias.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

export interface PostWithRelations extends Post {
  featuredImage?: Media | null;
  categories?: Array<{ categoryId: string }>;
}

export interface FindPostsOptions {
  search?: string; // Busca por nome, subtitle ou content
  categoryIds?: string[]; // Filtrar por categorias
  withFeaturedImage?: boolean; // Incluir imagem destacada
  withCategories?: boolean; // Incluir categorias
  page?: number;
  limit?: number;
  orderBy?: 'createdAt' | 'updatedAt' | 'name';
  orderDirection?: 'asc' | 'desc';
}

@Injectable()
export class PostsService {
  constructor(
    private readonly postsRepo: PostsRepository,
    private readonly mediasRepo: MediasService,
  ) {}

  async create(
    createPostDto: CreatePostDto,
    featuredImageFile?: Express.Multer.File,
  ): Promise<PostWithRelations> {
    const { name, subtitle, content, categoryIds } = createPostDto;

    console.log(categoryIds);

    const slug = slugify(name);
    let uniqueSlug = slug;
    let counter = 1;
    while (await this.postsRepo.findUnique({ where: { slug: uniqueSlug } })) {
      uniqueSlug = `${slug}-${counter}`;
      counter++;
    }

    const post = await this.postsRepo.create({
      data: {
        name: name,
        subtitle: subtitle,
        slug: uniqueSlug,
        content: content,
        categories: categoryIds?.length
          ? {
              create: categoryIds.map((categoryId) => ({
                categoryId,
              })),
            }
          : undefined,
      },
      select: {
        id: true,
        name: true,
        slug: true,
        subtitle: true,
        content: true,
        categories: {
          include: {
            category: {
              omit: {
                updatedAt: true,
              },
            },
          },
          omit: {
            updatedAt: true,
            categoryId: true,
            createdAt: true,
            postId: true,
            id: true,
          },
        },
        medias: {
          where: { isActive: true },
          orderBy: { order: 'asc' } as const,
          select: {
            id: true,
            filename: true,
            originalName: true,
            url: true,
            order: true,
          },
        },
        createdAt: true,
      },
    });

    // Adiciona imagem destacada se fornecida
    if (featuredImageFile) {
      try {
        await this.mediasRepo.create(featuredImageFile, {
          entityId: post.id,
          entityType: 'Post',
          mediaType: 'featured_image',
        });
      } catch (mediaError) {
        // Se houve erro ao criar a mídia, remove o post criado
        await this.postsRepo.delete({ where: { id: post.id } });
        throw new InternalServerErrorException(
          'Erro ao processar imagem destacada. Post não foi criado.',
        );
      }
    }

    return post;
  }

  /**
   * Busca todos os posts com filtros e paginação
   */
  async findAll(options: FindPostsOptions = {}) {
    const { search, categoryIds } = options;

    // Construir filtros
    const where: Prisma.PostWhereInput = {};

    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { subtitle: { contains: search, mode: 'insensitive' } },
        { content: { contains: search, mode: 'insensitive' } },
      ];
    }

    if (categoryIds?.length) {
      where.categories = {
        some: {
          categoryId: {
            in: categoryIds,
          },
        },
      };
    }

    return this.postsRepo.findAll({
      where,
      orderBy: {
        createdAt: 'desc',
      },
      select: {
        id: true,
        name: true,
        slug: true,
        subtitle: true,
        content: true,
        categories: {
          include: {
            category: {
              omit: {
                updatedAt: true,
              },
            },
          },
          omit: {
            updatedAt: true,
            categoryId: true,
            createdAt: true,
            postId: true,
            id: true,
          },
        },
        medias: {
          where: { isActive: true },
          orderBy: { order: 'asc' } as const,
          select: {
            id: true,
            filename: true,
            originalName: true,
            url: true,
            order: true,
          },
        },
        createdAt: true,
      },
    });
  }

  /**
   * Busca um post específico por ID
   */
  async findOne(id: string): Promise<PostWithRelations> {
    await this.existsPost(id);

    const post = await this.postsRepo.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        slug: true,
        subtitle: true,
        content: true,
        categories: {
          include: {
            category: {
              omit: {
                updatedAt: true,
              },
            },
          },
          omit: {
            updatedAt: true,
            categoryId: true,
            createdAt: true,
            postId: true,
            id: true,
          },
        },
        medias: {
          where: { isActive: true },
          orderBy: { order: 'asc' } as const,
          select: {
            id: true,
            filename: true,
            originalName: true,
            url: true,
            order: true,
            mediaType: true,
          },
        },
        createdAt: true,
      },
    });

    return post;
  }

  /**
   * Atualiza um post
   */
  async update(
    id: string,
    updatePostDto: UpdatePostDto,
    featuredImageFile?: Express.Multer.File,
  ): Promise<PostWithRelations> {
    const { name } = updatePostDto;

    // Verifica se o post existe
    await this.findOne(id);

    // Adiciona imagem destacada se fornecida
    if (featuredImageFile) {
      try {
        await this.mediasRepo.removeAllFromEntity('Post', id, true);

        await this.mediasRepo.create(featuredImageFile, {
          entityId: id,
          entityType: 'Post',
          mediaType: 'featured_image',
        });
      } catch (mediaError) {
        // Se houve erro ao criar a mídia, remove o post criado
        await this.postsRepo.delete({ where: { id: id } });
        throw new InternalServerErrorException(
          'Erro ao processar imagem destacada. Post não foi criado.',
        );
      }
    }

    let uniqueSlug;

    if (name) {
      const baseSlug = slugify(name);
      uniqueSlug = baseSlug;
      let counter = 1;

      while (
        await this.postsRepo.findUnique({
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

    const updatedPost = await this.postsRepo.update({
      where: { id },
      data: {
        name: updatePostDto.name,
        subtitle: updatePostDto.subtitle,
        slug: uniqueSlug ? uniqueSlug : updatePostDto.slug,
        content: updatePostDto.content,
        // Atualiza categorias se fornecidas
        ...(updatePostDto.categoryIds !== undefined && {
          categories: {
            deleteMany: {}, // Remove todas as categorias existentes
            create: updatePostDto.categoryIds.map((categoryId) => ({
              categoryId,
            })),
          },
        }),
      },
      select: {
        id: true,
        name: true,
        slug: true,
        subtitle: true,
        content: true,
        categories: {
          include: {
            category: {
              omit: {
                updatedAt: true,
              },
            },
          },
          omit: {
            updatedAt: true,
            categoryId: true,
            createdAt: true,
            postId: true,
            id: true,
          },
        },
        medias: {
          where: { isActive: true },
          orderBy: { order: 'asc' } as const,
          select: {
            id: true,
            filename: true,
            originalName: true,
            url: true,
            order: true,
          },
        },
        createdAt: true,
      },
    });

    return updatedPost;
  }

  /**
   * Remove um post
   */
  async remove(id: string, hardDelete: boolean = false): Promise<void> {
    // Verifica se o post existe
    await this.existsPost(id);

    try {
      if (hardDelete) {
        // Remove todas as mídias associadas
        await this.mediasRepo.removeAllFromEntity('Post', id, true);

        // Remove o post (cascade irá remover as categorias)
        await this.postsRepo.delete({
          where: { id },
        });
      } else {
        // Para soft delete, você precisaria adicionar um campo 'active' no modelo Post
        // Por enquanto, vamos fazer hard delete mesmo
        await this.remove(id, true);
      }
    } catch (error) {
      throw new InternalServerErrorException('Erro interno ao remover post');
    }
  }

  /**
   * Busca post por slug
   */
  async findBySlug(
    slug: string,
    includeRelations: boolean = true,
  ): Promise<PostWithRelations> {
    const include = includeRelations
      ? {
          categories: {
            include: {
              category: true,
            },
          },
          medias: {
            where: { isActive: true },
            orderBy: { order: 'asc' } as const,
          },
        }
      : undefined;

    const post = await this.postsRepo.findUnique({
      where: { slug },
      include,
    });

    if (!post) {
      throw new NotFoundException(`Post com slug "${slug}" não encontrado`);
    }

    return post;
  }

  /**
   * Busca posts por categoria
   */
  async findByCategory(
    categoryId: string,
    options: Omit<FindPostsOptions, 'categoryIds'> = {},
  ) {
    return this.findAll({
      ...options,
      categoryIds: [categoryId],
    });
  }

  /**
   * Busca posts relacionados (mesmas categorias)
   */
  async findRelated(
    postId: string,
    limit: number = 5,
  ): Promise<PostWithRelations[]> {
    await this.existsPost(postId);

    // Busca categorias do post atual
    const currentPost: PostWithRelations = await this.postsRepo.findUnique({
      where: { id: postId },
      include: {
        categories: {
          include: {
            category: true,
          },
          select: { categoryId: true },
        },
      },
    });

    const categoryIds = currentPost.categories.map((c) => c.categoryId);

    if (!categoryIds.length) {
      return [];
    }

    // Busca posts com categorias similares (excluindo o post atual)
    const relatedPosts = await this.postsRepo.findAll({
      where: {
        id: { not: postId },
        categories: {
          some: {
            categoryId: {
              in: categoryIds,
            },
          },
        },
      },
      include: {
        categories: {
          include: {
            category: true,
          },
        },
        medias: {
          where: {
            isActive: true,
            mediaType: 'featured_image',
          },
          take: 1,
        },
      },
      take: limit,
      orderBy: { createdAt: 'desc' },
    });

    // Processar resultados
    return relatedPosts.map((post) => {
      const result: PostWithRelations = { ...post };

      // if (post.medias?.length) {
      //   result.featuredImage = post.medias[0];
      //   delete result.medias;
      // }

      return result;
    });
  }

  private async existsPost(id: string) {
    const currentCat = await this.postsRepo.findUnique({
      where: { id },
    });

    if (!currentCat) {
      throw new ConflictException('Post not found');
    }
  }
}
