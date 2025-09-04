import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateFinalityDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  slug?: string;
}
