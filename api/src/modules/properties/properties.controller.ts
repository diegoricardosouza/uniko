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
  UploadedFiles,
} from '@nestjs/common';
import { FileUploadMulti } from 'src/shared/decorators/FileUploadMulti';
import { IsPublic } from 'src/shared/decorators/IsPublic';
import { CreatePropertyDto } from './dto/create-property.dto';
import { UpdatePropertyDto } from './dto/update-property.dto';
import { FindPropertiesOptions, PropertiesService } from './properties.service';

@Controller('properties')
export class PropertiesController {
  constructor(private readonly propertiesService: PropertiesService) {}

  @Post()
  @FileUploadMulti([
    {
      name: 'featuredImage',
      maxCount: 1,
      destination: 'uploads/properties/featured',
      mimeTypes: /^(image\/(jpeg|jpg|png|webp|gif))$/,
      fileTypes: /\/(jpg|jpeg|png|webp|gif)$/,
      filePrefix: 'featured',
    },
    {
      name: 'gallery',
      maxCount: 100,
      destination: 'uploads/properties/gallery',
      mimeTypes: /^(image\/(jpeg|jpg|png|webp|gif))$/,
      fileTypes: /\/(jpg|jpeg|png|webp|gif)$/,
      filePrefix: 'gallery',
    },
  ])
  create(
    @Body() createPropertyDto: CreatePropertyDto,
    @UploadedFiles()
    files: {
      featuredImage?: Express.Multer.File[];
      gallery?: Express.Multer.File[];
    },
  ) {
    const featuredImage = files.featuredImage?.[0] ?? null;
    const gallery = files.gallery ?? [];

    return this.propertiesService.create(
      createPropertyDto,
      featuredImage,
      gallery,
    );
  }

  @IsPublic()
  @Get()
  findAll(@Query() options: FindPropertiesOptions) {
    return this.propertiesService.findAll(options);
  }

  @IsPublic()
  @Get('paginate')
  findAllPaginate(
    @Query() options: FindPropertiesOptions,
  ) {
    return this.propertiesService.findAllPaginate(options);
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.propertiesService.findOne(id);
  }

  @IsPublic()
  @Get('slug/:slug')
  findBySlug(@Param('slug') slug: string) {
    return this.propertiesService.findBySlug(slug);
  }

  @Patch(':id')
  @FileUploadMulti([
    {
      name: 'featuredImage',
      maxCount: 1,
      destination: 'uploads/properties/featured',
      mimeTypes: /^(image\/(jpeg|jpg|png|webp|gif))$/,
      fileTypes: /\/(jpg|jpeg|png|webp|gif)$/,
      filePrefix: 'featured',
    },
    {
      name: 'gallery',
      maxCount: 100,
      destination: 'uploads/properties/gallery',
      mimeTypes: /^(image\/(jpeg|jpg|png|webp|gif))$/,
      fileTypes: /\/(jpg|jpeg|png|webp|gif)$/,
      filePrefix: 'gallery',
    },
  ])
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updatePropertyDto: UpdatePropertyDto,
    @UploadedFiles()
    files: {
      featuredImage?: Express.Multer.File[];
      gallery?: Express.Multer.File[];
    },
  ) {
    const featuredImage = files.featuredImage?.[0] ?? null;
    const gallery = files.gallery ?? [];

    return this.propertiesService.update(
      id,
      updatePropertyDto,
      featuredImage,
      gallery,
    );
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.propertiesService.remove(id);
  }
}
