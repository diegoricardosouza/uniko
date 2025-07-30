import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { CategoryPostsRepository } from './repositories/category-posts.repositories';
import { UsersRepository } from './repositories/users.repositories';

@Global()
@Module({
  providers: [PrismaService, UsersRepository, CategoryPostsRepository],
  exports: [UsersRepository, CategoryPostsRepository],
})
export class DatabaseModule {}
