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
      mimeTypes?: RegExp; // Nova opção para mimetypes
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
        let isValidType = false;

        // Verifica mimetype se especificado
        if (this.config.mimeTypes) {
          isValidType = file.mimetype.match(this.config.mimeTypes) !== null;
        }
        
        // Verifica extensão se especificado (fallback ou verificação adicional)
        if (this.config.fileTypes && !isValidType) {
          const fileExtension = extname(file.originalname).toLowerCase();
          isValidType = fileExtension.match(this.config.fileTypes) !== null;
        }

        // Se nem mimeTypes nem fileTypes foram especificados, aceita qualquer arquivo
        if (!this.config.mimeTypes && !this.config.fileTypes) {
          isValidType = true;
        }

        if (!isValidType) {
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