import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateTypeDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  slug?: string;
}
