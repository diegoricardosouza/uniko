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
  UploadedFile,
} from '@nestjs/common';
import { FileUpload } from 'src/shared/decorators/FileUpload';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { FindPostsOptions, PostsService } from './posts.service';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  @FileUpload({
    fieldName: 'featuredImage',
    destination: 'uploads/posts/featured',
    fileTypes: /\/(jpg|jpeg|png|webp)$/,
    filePrefix: 'featured',
  })
  create(
    @Body() createPostDto: CreatePostDto,
    @UploadedFile() featuredImage?: Express.Multer.File,
  ) {
    return this.postsService.create(createPostDto, featuredImage);
  }

  @Get()
  findAll(@Query() options: FindPostsOptions) {
    return this.postsService.findAll(options);
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.postsService.findOne(id);
  }

  @Patch(':id')
  @FileUpload({
    fieldName: 'featuredImage',
    destination: 'uploads/posts/featured',
    fileTypes: /\/(jpg|jpeg|png|webp)$/,
    filePrefix: 'featured',
  })
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updatePostDto: UpdatePostDto,
    @UploadedFile() featuredImage?: Express.Multer.File,
  ) {
    return this.postsService.update(id, updatePostDto, featuredImage);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.postsService.remove(id);
  }
}
