import { IsNotEmpty, IsOptional, IsString, IsUUID } from "class-validator";

export class CreateCityDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  slug?: string;

  @IsUUID()
  @IsNotEmpty()
  stateId: string;
}
