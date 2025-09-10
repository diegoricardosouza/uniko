import { Module } from '@nestjs/common';
import { MediasService } from '../medias/medias.service';
import { PropertiesController } from './properties.controller';
import { PropertiesService } from './properties.service';

@Module({
  controllers: [PropertiesController],
  providers: [PropertiesService, MediasService],
})
export class PropertiesModule {}
