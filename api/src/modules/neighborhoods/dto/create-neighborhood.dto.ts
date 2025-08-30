import { IsNotEmpty, IsOptional, IsString, IsUUID } from "class-validator";

export class CreateNeighborhoodDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  slug?: string;

  @IsUUID()
  @IsNotEmpty()
  cityId: string;
}
