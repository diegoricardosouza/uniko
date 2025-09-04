import { Module } from '@nestjs/common';
import { FinalitiesService } from './finalities.service';
import { FinalitiesController } from './finalities.controller';

@Module({
  controllers: [FinalitiesController],
  providers: [FinalitiesService],
})
export class FinalitiesModule {}
