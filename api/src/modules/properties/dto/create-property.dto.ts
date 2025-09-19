/* eslint-disable @typescript-eslint/no-unused-vars */
import { Transform, Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

type CharacteristicType = {
  name: string;
};
type InfrastructureType = {
  name: string;
};

export class CreatePropertyDto {
  @IsString()
  title: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsString()
  @IsOptional()
  slug?: string;

  @IsString()
  @IsNotEmpty()
  reference: string;

  @IsNumber()
  @Type(() => Number)
  price: number;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  priceCondominium?: number;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  priceIptu?: number;

  @IsOptional()
  @IsString()
  delivery?: string;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  totalArea?: number;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  privateArea?: number;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  bedrooms?: number;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  bathrooms?: number;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  parkingSpaces?: number;

  @IsOptional()
  @IsString()
  address?: string;

  @IsOptional()
  @IsString()
  number?: string;

  @IsOptional()
  @IsString()
  complement?: string;

  @IsOptional()
  @IsString()
  zipCode?: string;

  @IsOptional()
  @IsBoolean()
  active?: boolean;

  @IsOptional()
  @IsBoolean()
  featured?: boolean;

  @IsOptional()
  @IsUUID()
  cityId?: string;

  @IsOptional()
  @IsUUID()
  neighborhoodId?: string;

  @Transform(({ value }) => {
    try {
      const parsed = typeof value === 'string' ? JSON.parse(value) : value;
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  })
  @IsArray()
  @IsOptional()
  @IsUUID('all', { each: true })
  typeIds?: string[];

  @Transform(({ value }) => {
    try {
      const parsed = typeof value === 'string' ? JSON.parse(value) : value;
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  })
  @IsArray()
  @IsOptional()
  @IsUUID('all', { each: true })
  finalityIds?: string[];

  @Transform(({ value }) => {
    try {
      const parsed = typeof value === 'string' ? JSON.parse(value) : value;
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  })
  @IsOptional()
  @IsArray()
  characteristic?: string[];

  @Transform(({ value }) => {
    try {
      const parsed = typeof value === 'string' ? JSON.parse(value) : value;
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  })
  @IsOptional()
  @IsArray()
  infrastructure?: string[];
}
