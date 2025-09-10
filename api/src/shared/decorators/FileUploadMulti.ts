import { applyDecorators, UseInterceptors } from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { FileUploadConfig } from '../interceptors/fileUploadConfig';

export interface FileUploadOptions {
  name: string;
  maxCount?: number;
  destination: string;
  fileSize?: number;
  fileTypes?: RegExp;
  mimeTypes?: RegExp;
  filePrefix?: string;
}

export function FileUploadMulti(fields: FileUploadOptions[]) {
  const mapped = fields.map((field) => ({
    name: field.name,
    maxCount: field.maxCount ?? 1,
  }));

  return applyDecorators(
    UseInterceptors(
      FileFieldsInterceptor(mapped, {
        storage: {
          _handleFile(req, file, cb) {
            // Decide o destino baseado no campo
            const fieldConfig = fields.find((f) => f.name === file.fieldname);
            const config = new FileUploadConfig({
              destination: fieldConfig?.destination ?? 'uploads/default',
              fileSize: fieldConfig?.fileSize,
              fileTypes: fieldConfig?.fileTypes,
              mimeTypes: fieldConfig?.mimeTypes,
              filePrefix: fieldConfig?.filePrefix,
            });
            const opts = config.createMulterOptions();
            return opts.storage._handleFile(req, file, cb);
          },
          _removeFile(req, file, cb) {
            cb(null);
          },
        } as any,
      }),
    ),
  );
}
