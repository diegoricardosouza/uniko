import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { EmailAttachmentsRepository } from './repositories/attachments.repositories';
import { CategoryPostsRepository } from './repositories/category-posts.repositories';
import { CitiesRepository } from './repositories/cities.repositories';
import { EmailsRepository } from './repositories/emails.repositories';
import { MediasRepository } from './repositories/medias.repositories';
import { NeighborhoodsRepository } from './repositories/neighborhoods.repositories';
import { PagesRepository } from './repositories/pages.repositories';
import { PostsRepository } from './repositories/posts.repositories';
import { SettingsRepository } from './repositories/settings.repositories';
import { StatesRepository } from './repositories/states.repositories';
import { UsersRepository } from './repositories/users.repositories';

@Global()
@Module({
  providers: [PrismaService, UsersRepository, CategoryPostsRepository, PostsRepository, MediasRepository, SettingsRepository, PagesRepository, EmailsRepository, EmailAttachmentsRepository, StatesRepository, CitiesRepository, NeighborhoodsRepository],
  exports: [UsersRepository, CategoryPostsRepository, PostsRepository, MediasRepository, SettingsRepository, PagesRepository, EmailsRepository, EmailAttachmentsRepository, StatesRepository, CitiesRepository, NeighborhoodsRepository],
})
export class DatabaseModule {}
