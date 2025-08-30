import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  Query,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { IsPublic } from 'src/shared/decorators/IsPublic';
import { CreateEmailDto } from './dto/create-email.dto';
import { EmailsService } from './emails.service';

@Controller('emails')
export class EmailsController {
  constructor(private readonly emailsService: EmailsService) {}

  @IsPublic()
  @Post('send')
  @UseInterceptors(FilesInterceptor('attachments'))
  async sendEmailWithFiles(
    @Body() body: Omit<CreateEmailDto, 'attachments'>,
    @UploadedFiles() files: Express.Multer.File[],
  ) {
    const attachments =
      files?.map((file) => ({
        filename: file.originalname,
        content: file.buffer.toString('base64'),
        contentType: file.mimetype,
      })) || [];

    const sendEmailDto: CreateEmailDto = {
      ...body,
      attachments,
    };

    return this.emailsService.sendEmail(sendEmailDto);
  }

  @Get()
  findAll(@Query('search') search?: string) {
    return this.emailsService.findAll({ search });
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.emailsService.getEmailById(id);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.emailsService.remove(id);
  }
}
