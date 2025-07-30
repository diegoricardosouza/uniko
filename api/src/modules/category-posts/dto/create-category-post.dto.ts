import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateCategoryPostDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  slug: string;

  @IsString()
  @IsOptional()
  description?: string;
}
