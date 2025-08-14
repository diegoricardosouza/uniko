import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { CategoryPostsRepository } from './repositories/category-posts.repositories';
import { MediasRepository } from './repositories/medias.repositories';
import { PostsRepository } from './repositories/posts.repositories';
import { SettingsRepository } from './repositories/settings.repositories';
import { UsersRepository } from './repositories/users.repositories';

@Global()
@Module({
  providers: [PrismaService, UsersRepository, CategoryPostsRepository, PostsRepository, MediasRepository, SettingsRepository],
  exports: [UsersRepository, CategoryPostsRepository, PostsRepository, MediasRepository, SettingsRepository],
})
export class DatabaseModule {}
