import { Type } from 'class-transformer';
import {
  IsArray,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

export class AttachmentDto {
  @IsString()
  filename: string;

  @IsString()
  content: string; // base64 encoded

  @IsOptional()
  @IsString()
  contentType?: string;
}

export class CreateEmailDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  to: string;

  @IsString()
  subject: string;

  @IsString()
  htmlContent: string;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => AttachmentDto)
  attachments?: AttachmentDto[];
}
