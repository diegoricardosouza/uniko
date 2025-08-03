import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseUUIDPipe, Patch, Post, Query, UploadedFile } from '@nestjs/common';
import { FileUpload } from 'src/shared/decorators/FileUpload';
import { CreateMediaDto } from './dto/create-media.dto';
import { UpdateMediaDto } from './dto/update-media.dto';
import { FindMediaOptions, MediasService } from './medias.service';

@Controller('medias')
export class MediasController {
  constructor(private readonly mediasService: MediasService) {}

  @Post()
  @FileUpload({
    fieldName: 'file',
    destination: 'uploads/media',
    fileSize: 5 * 1024 * 1024, // 5MB
    fileTypes: /\.(jpg|jpeg|png|gif|pdf|mp4)$/,
    filePrefix: 'media'
  })
  create(
    @UploadedFile() file: Express.Multer.File,
    @Body() createMediaDto: CreateMediaDto
  ) {
    return this.mediasService.create(file, createMediaDto);
  }

  @Get()
  findAll(@Query() options: FindMediaOptions) {
    return this.mediasService.findAll(options);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.mediasService.findOne(id);
  }

  @Patch(':id')
  @FileUpload({
    fieldName: 'file',
    destination: 'uploads/media',
    fileSize: 5 * 1024 * 1024, // 5MB
    fileTypes: /\.(jpg|jpeg|png|gif|pdf|mp4)$/,
    filePrefix: 'media'
  })
  update(
    @Param('id', ParseUUIDPipe) id: string, 
    @Body() updateMediaDto: UpdateMediaDto,
    @UploadedFile() file: Express.Multer.File
  ) {
    return this.mediasService.update(id, file, updateMediaDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(
    @Param('id', ParseUUIDPipe) id: string,
    @Query('hard') hardDelete?: boolean
  ) {
    return this.mediasService.remove(id, hardDelete === true);
  }
}
