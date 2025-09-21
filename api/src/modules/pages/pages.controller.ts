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
import { CreatePageDto } from './dto/create-page.dto';
import { UpdatePageDto } from './dto/update-page.dto';
import { FindPagesOptions, PagesService } from './pages.service';

@Controller('pages')
export class PagesController {
  constructor(private readonly pagesService: PagesService) {}

  @Post()
  @FileUpload({
    fieldName: 'featuredImage',
    destination: 'uploads/pages/featured',
    mimeTypes: /^(image\/(jpeg|jpg|png|webp|gif)|application\/pdf|video\/mp4)$/,
    fileTypes: /\/(jpg|jpeg|png|webp)$/,
    filePrefix: 'featured',
  })
  create(
    @Body() createPageDto: CreatePageDto,
    @UploadedFile() featuredImage?: Express.Multer.File,
  ) {
    return this.pagesService.create(createPageDto, featuredImage);
  }

  @Get()
  findAll(@Query() options: FindPagesOptions) {
    return this.pagesService.findAll(options);
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.pagesService.findOne(id);
  }

  @IsPublic()
  @Get('slug/:slug')
  findSlug(@Param('slug') slug: string) {
    return this.pagesService.findSlug(slug);
  }

  @Patch(':id')
  @FileUpload({
    fieldName: 'featuredImage',
    destination: 'uploads/pages/featured',
    mimeTypes: /^(image\/(jpeg|jpg|png|webp|gif)|application\/pdf|video\/mp4)$/,
    fileTypes: /\/(jpg|jpeg|png|webp)$/,
    filePrefix: 'featured',
  })
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updatePageDto: UpdatePageDto,
    @UploadedFile() featuredImage?: Express.Multer.File,
  ) {
    return this.pagesService.update(id, updatePageDto, featuredImage);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.pagesService.remove(id);
  }
}
