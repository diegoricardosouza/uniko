import { applyDecorators, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileUploadConfig } from '../interceptors/fileUploadConfig';

export interface FileUploadOptions {
  fieldName: string;
  destination: string;
  fileSize?: number;
  fileTypes?: RegExp;
  filePrefix?: string;
}

export function FileUpload(options: FileUploadOptions) {
  const config = new FileUploadConfig({
    destination: options.destination,
    fileSize: options.fileSize,
    fileTypes: options.fileTypes,
    filePrefix: options.filePrefix,
  });

  return applyDecorators(
    UseInterceptors(
      FileInterceptor(options.fieldName, config.createMulterOptions()),
    ),
  );
}