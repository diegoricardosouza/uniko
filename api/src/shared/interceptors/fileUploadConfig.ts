import { BadRequestException, Injectable } from '@nestjs/common';
import {
  MulterModuleOptions,
  MulterOptionsFactory,
} from '@nestjs/platform-express';
import { existsSync, mkdirSync } from 'fs';
import { diskStorage } from 'multer';
import { extname, join } from 'path';

@Injectable()
export class FileUploadConfig implements MulterOptionsFactory {
  constructor(
    private readonly config: {
      destination: string;
      fileSize?: number;
      fileTypes?: RegExp;
      filePrefix?: string;
    },
  ) {
    // Verifica e cria o diretório no momento da construção
    this.ensureDirectoryExists(this.config.destination);
  }

  private ensureDirectoryExists(directoryPath: string): void {
    const absolutePath = join(process.cwd(), directoryPath);

    if (!existsSync(absolutePath)) {
      try {
        mkdirSync(absolutePath, { recursive: true });
        console.log(`Directory created: ${absolutePath}`);
      } catch (error) {
        throw new Error(`Failed to create directory: ${error.message}`);
      }
    }
  }

  createMulterOptions(): MulterModuleOptions {
    return {
      storage: diskStorage({
        destination: (req, file, callback) => {
          // Verifica novamente no momento do upload (caso o diretório tenha sido deletado)
          this.ensureDirectoryExists(this.config.destination);
          callback(null, this.config.destination);
        },
        filename: (req, file, callback) => {
          const randomName = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
          const fileExtName = extname(file.originalname);
          const prefix = this.config.filePrefix
            ? `${this.config.filePrefix}-`
            : '';
          callback(null, `${prefix}${randomName}${fileExtName}`);
        },
      }),
      fileFilter: (req, file, callback) => {
        if (
          this.config.fileTypes &&
          !file.mimetype.match(this.config.fileTypes)
        ) {
          callback(
            new BadRequestException('Tipo de arquivo não permitido!'),
            false,
          );
        } else {
          callback(null, true);
        }
      },
      limits: {
        fileSize: this.config.fileSize || 2 * 1024 * 1024, // 2MB default
      },
    };
  }
}