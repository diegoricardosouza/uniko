import { Module } from '@nestjs/common';
import { MediasService } from '../medias/medias.service';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';

@Module({
  controllers: [PostsController],
  providers: [PostsService, MediasService],
})
export class PostsModule {}
