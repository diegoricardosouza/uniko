import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CategoryPostsService } from './category-posts.service';
import { CreateCategoryPostDto } from './dto/create-category-post.dto';
import { UpdateCategoryPostDto } from './dto/update-category-post.dto';

@Controller('category-posts')
export class CategoryPostsController {
  constructor(private readonly categoryPostsService: CategoryPostsService) {}

  @Post()
  create(@Body() createCategoryPostDto: CreateCategoryPostDto) {
    return this.categoryPostsService.create(createCategoryPostDto);
  }

  @Get()
  findAll(@Query('search') search?: string) {
    return this.categoryPostsService.findAll({ search });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.categoryPostsService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateCategoryPostDto: UpdateCategoryPostDto,
  ) {
    return this.categoryPostsService.update(id, updateCategoryPostDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.categoryPostsService.remove(id);
  }
}
