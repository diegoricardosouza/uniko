import { Module } from '@nestjs/common';
import { CategoryPostsService } from './category-posts.service';
import { CategoryPostsController } from './category-posts.controller';

@Module({
  controllers: [CategoryPostsController],
  providers: [CategoryPostsService],
})
export class CategoryPostsModule {}
