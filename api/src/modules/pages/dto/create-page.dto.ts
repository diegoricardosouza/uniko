import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreatePageDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  slug?: string;

  @IsString()
  @IsOptional()
  content?: string;
}
