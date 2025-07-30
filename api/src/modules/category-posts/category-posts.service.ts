import { ConflictException, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { CategoryPostsRepository } from 'src/shared/database/repositories/category-posts.repositories';
import { slugify } from 'src/utils/slugify';
import { CreateCategoryPostDto } from './dto/create-category-post.dto';
import { UpdateCategoryPostDto } from './dto/update-category-post.dto';

@Injectable()
export class CategoryPostsService {
  constructor(private readonly catPostsRepo: CategoryPostsRepository) {}

  async create(createCategoryPostDto: CreateCategoryPostDto) {
    const { name, description } = createCategoryPostDto;

    const slug = slugify(name);

    let uniqueSlug = slug;
    let counter = 1;
    while (
      await this.catPostsRepo.findUnique({ where: { slug: uniqueSlug } })
    ) {
      uniqueSlug = `${slug}-${counter}`;
      counter++;
    }

    const category = await this.catPostsRepo.create({
      data: {
        name,
        slug: uniqueSlug,
        description,
      },
    });

    return category;
  }

  async findAll(filters: { search?: string }) {
    const { search } = filters;

    const conditions: Prisma.CategoryPostWhereInput[] = [
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

    return this.catPostsRepo.findAll({
      where: conditions.length > 0 ? { AND: conditions } : undefined,
      orderBy: {
        createdAt: 'desc',
      },
      select: {
        id: true,
        name: true,
        slug: true,
        description: true,
        createdAt: true,
      },
    });
  }

  async findOne(id: string) {
    await this.existsCatPosts(id);

    const user = await this.catPostsRepo.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        slug: true,
        description: true,
        createdAt: true,
      },
    });

    return user;
  }

  async update(id: string, updateCategoryPostDto: UpdateCategoryPostDto) {
    const { name, description } = updateCategoryPostDto;

    await this.existsCatPosts(id);

    let updatedData: Prisma.CategoryPostUpdateInput = {};

    if (name) {
      const baseSlug = slugify(name);
      let uniqueSlug = baseSlug;
      let counter = 1;

      while (
        await this.catPostsRepo.findUnique({
          where: {
            slug: uniqueSlug,
            NOT: { id },
          },
        })
      ) {
        uniqueSlug = `${baseSlug}-${counter}`;
        counter++;
      }

      updatedData = {
        ...updatedData,
        name: name,
        slug: uniqueSlug,
      };
    }

    if (description) {
      updatedData.description = description;
    }

    const updatedCategory = await this.catPostsRepo.update({
      where: { id },
      data: updatedData,
    });

    return updatedCategory;
  }

  async remove(id: string) {
    await this.existsCatPosts(id);

    await this.catPostsRepo.delete({
      where: { id },
    });

    return null;
  }

  private async existsCatPosts(id: string) {
    const currentCat = await this.catPostsRepo.findUnique({
      where: { id },
    });

    if (!currentCat) {
      throw new ConflictException('Category Post not found');
    }
  }
}
