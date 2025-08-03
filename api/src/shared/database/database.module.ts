import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { CategoryPostsRepository } from './repositories/category-posts.repositories';
import { MediasRepository } from './repositories/medias.repositories';
import { PostsRepository } from './repositories/posts.repositories';
import { UsersRepository } from './repositories/users.repositories';

@Global()
@Module({
  providers: [PrismaService, UsersRepository, CategoryPostsRepository, PostsRepository, MediasRepository],
  exports: [UsersRepository, CategoryPostsRepository, PostsRepository, MediasRepository],
})
export class DatabaseModule {}
