import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseUUIDPipe, Patch, Post, Query } from '@nestjs/common';
import { CreateNeighborhoodDto } from './dto/create-neighborhood.dto';
import { UpdateNeighborhoodDto } from './dto/update-neighborhood.dto';
import { NeighborhoodsService } from './neighborhoods.service';

@Controller('neighborhoods')
export class NeighborhoodsController {
  constructor(private readonly neighborhoodsService: NeighborhoodsService) {}

  @Post()
  create(@Body() createNeighborhoodDto: CreateNeighborhoodDto) {
    return this.neighborhoodsService.create(createNeighborhoodDto);
  }

  @Get()
  findAll(@Query('search') search?: string) {
    return this.neighborhoodsService.findAll({ search });
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.neighborhoodsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', ParseUUIDPipe) id: string, @Body() updateNeighborhoodDto: UpdateNeighborhoodDto) {
    return this.neighborhoodsService.update(id, updateNeighborhoodDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.neighborhoodsService.remove(id);
  }
}
