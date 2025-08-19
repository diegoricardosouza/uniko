import { Module } from '@nestjs/common';
import { MediasService } from '../medias/medias.service';
import { PagesController } from './pages.controller';
import { PagesService } from './pages.service';

@Module({
  controllers: [PagesController],
  providers: [PagesService, MediasService],
})
export class PagesModule {}
