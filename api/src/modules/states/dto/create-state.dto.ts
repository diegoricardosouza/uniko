import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateStateDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  slug?: string;

  @IsString()
  @IsNotEmpty()
  acronym: string;
}
