import { PartialType } from '@nestjs/mapped-types';
import { CreateFinalityDto } from './create-finality.dto';

export class UpdateFinalityDto extends PartialType(CreateFinalityDto) {}
