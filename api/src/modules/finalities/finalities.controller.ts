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
import { IsPublic } from 'src/shared/decorators/IsPublic';
import { CreateFinalityDto } from './dto/create-finality.dto';
import { UpdateFinalityDto } from './dto/update-finality.dto';
import { FinalitiesService } from './finalities.service';

@Controller('finalities')
export class FinalitiesController {
  constructor(private readonly finalitiesService: FinalitiesService) {}

  @Post()
  create(@Body() createFinalityDto: CreateFinalityDto) {
    return this.finalitiesService.create(createFinalityDto);
  }

  @IsPublic()
  @Get()
  findAll(@Query('search') search?: string) {
    return this.finalitiesService.findAll({ search });
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.finalitiesService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateFinalityDto: UpdateFinalityDto,
  ) {
    return this.finalitiesService.update(id, updateFinalityDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.finalitiesService.remove(id);
  }
}
