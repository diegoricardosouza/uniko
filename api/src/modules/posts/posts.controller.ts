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
import { IsPublic } from 'src/shared/decorators/IsPublic';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { FindPostsOptions, PaginatedResponse, PostsService } from './posts.service';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  @FileUpload({
    fieldName: 'featuredImage',
    destination: 'uploads/posts/featured',
    mimeTypes: /^(image\/(jpeg|jpg|png|webp|gif)|application\/pdf|video\/mp4)$/,
    fileTypes: /\/(jpg|jpeg|png|webp)$/,
    filePrefix: 'featured',
  })
  create(
    @Body() createPostDto: CreatePostDto,
    @UploadedFile() featuredImage?: Express.Multer.File,
  ) {
    return this.postsService.create(createPostDto, featuredImage);
  }

  @IsPublic()
  @Get()
  findAll(@Query() options: FindPostsOptions) {
    return this.postsService.findAll(options);
  }

  @IsPublic()
  @Get('paginate')
  findAllPaginate(@Query() options: FindPostsOptions): Promise<PaginatedResponse<any>> {
    console.log(options);
    
    return this.postsService.findAllPaginate(options);
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.postsService.findOne(id);
  }

  @Get('slug/:slug')
  findBySlug(@Param('slug') slug: string) {
    return this.postsService.findBySlug(slug);
  }

  @Patch(':id')
  @FileUpload({
    fieldName: 'featuredImage',
    destination: 'uploads/posts/featured',
    mimeTypes: /^(image\/(jpeg|jpg|png|webp|gif)|application\/pdf|video\/mp4)$/,
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
