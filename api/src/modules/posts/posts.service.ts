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

type PostWithCategories = Prisma.PostGetPayload<{
  include: {
    categories: {
      include: {
        category: {
          select: {
            id: true;
            name: true;
            slug: true;
            description: true;
            createdAt: true;
          };
        };
      };
    };
  };
}>;

const postSelectFields = {
  id: true,
  name: true,
  slug: true,
  subtitle: true,
  content: true,
  createdAt: true,
  categories: {
    include: {
      category: {
        select: {
          id: true,
          name: true,
          slug: true,
          description: true,
          createdAt: true,
        },
      },
    },
  },
};

@Injectable()
export class PostsService {
  constructor(
    private readonly postsRepo: PostsRepository,
    private readonly mediasRepo: MediasService,
  ) {}

  private async getPostMedias(pageId: string) {
    return this.mediasRepo.findByEntityId('Post', pageId);
  }

  private async getPostsMedias(pageIds: string[]) {
    return this.mediasRepo.findByEntityIds('Post', pageIds);
  }

  async create(
    createPostDto: CreatePostDto,
    featuredImageFile?: Express.Multer.File,
  ) {
    const { name, subtitle, content, categoryIds } = createPostDto;

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

    const medias = await this.getPostMedias(post.id);
    return { ...post, medias };
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

    const rawPosts = (await this.postsRepo.findAll({
      where,
      orderBy: {
        createdAt: 'desc',
      },
      select: postSelectFields,
    })) as PostWithCategories[];

    // transformar a estrutura
    const posts = rawPosts.map((post) => ({
      ...post,
      id: post.id,
      name: post.name,
      slug: post.slug,
      subtitle: post.subtitle,
      content: post.content,
      createdAt: post.createdAt,
      categories: post.categories.map((item: any) => item.category),
    }));

    // Recuperar mídias para todas as páginas de uma vez
    const pageIds = posts.map((page) => page.id);
    const allMedias = await this.getPostsMedias(pageIds);

    // Agrupar mídias por página
    const mediasByPageId = allMedias.reduce((acc, media) => {
      if (!acc[media.entityId]) {
        acc[media.entityId] = [];
      }
      acc[media.entityId].push(media);
      return acc;
    }, {});

    // Adicionar mídias às páginas
    const postsWithMedias = posts.map((post) => ({
      ...post,
      medias: mediasByPageId[post.id] || [],
    }));

    return postsWithMedias;
  }

  /**
   * Busca um post específico por ID
   */
  async findOne(id: string) {
    const rawPost = (await this.postsRepo.findUnique({
      where: { id },
      select: postSelectFields,
    })) as PostWithCategories;

    if (!rawPost) {
      throw new ConflictException('Post not found');
    }

    const post = {
      ...rawPost,
      id: rawPost.id,
      name: rawPost.name,
      slug: rawPost.slug,
      subtitle: rawPost.subtitle,
      content: rawPost.content,
      createdAt: rawPost.createdAt,
      categories: rawPost.categories.map((item: any) => item.category),
    };

    const medias = await this.getPostMedias(id);
    return { ...post, medias };
  }

  /**
   * Atualiza um post
   */
  async update(
    id: string,
    updatePostDto: UpdatePostDto,
    featuredImageFile?: Express.Multer.File,
  ) {
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
        createdAt: true,
      },
    });

    const medias = await this.getPostMedias(id);
    return { ...updatedPost, medias };
  }

  /**
   * Remove um post
   */
  async remove(id: string, hardDelete: boolean = false) {
    const currentCat = await this.postsRepo.findUnique({
      where: { id },
    });

    if (!currentCat) {
      throw new ConflictException('Post not found');
    }

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
  async findBySlug(slug: string, includeRelations: boolean = true) {
    const include = includeRelations
      ? {
          categories: {
            include: {
              category: true,
            },
          },
        }
      : undefined;

    const rawPost = (await this.postsRepo.findUnique({
      where: { slug },
      select: postSelectFields,
    })) as PostWithCategories;

    if (!rawPost) {
      throw new NotFoundException(`Post com slug "${slug}" não encontrado`);
    }

    const post = {
      ...rawPost,
      id: rawPost.id,
      name: rawPost.name,
      slug: rawPost.slug,
      subtitle: rawPost.subtitle,
      content: rawPost.content,
      createdAt: rawPost.createdAt,
      categories: rawPost.categories.map((item: any) => item.category),
    };

    const medias = await this.getPostMedias(post.id);
    return { ...post, medias };
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
