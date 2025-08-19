/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  BadRequestException,
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Media, Prisma } from '@prisma/client';
import { existsSync } from 'fs';
import { unlink } from 'fs/promises';
import { join } from 'path';
import { MediasRepository } from 'src/shared/database/repositories/medias.repositories';
import { PostsRepository } from 'src/shared/database/repositories/posts.repositories';
import { CreateMediaDto } from './dto/create-media.dto';
import { UpdateMediaDto } from './dto/update-media.dto';

export interface FindMediaOptions {
  entityType?: string;
  entityId?: string;
  mediaType?: string;
  isActive?: boolean;
  orderBy?: 'order' | 'createdAt';
  orderDirection?: 'asc' | 'desc';
}

@Injectable()
export class MediasService {
  constructor(
    private readonly mediasRepo: MediasRepository,
    private readonly postsRepo: PostsRepository,
  ) {}

  /**
   * Cria uma nova mídia com arquivo upload
   */
  async create(
    file: Express.Multer.File,
    createMediaDto: CreateMediaDto,
  ): Promise<Media> {
    try {
      // Validações básicas
      if (!file) {
        throw new BadRequestException('Arquivo é obrigatório');
      }

      if (!createMediaDto.entityType) {
        throw new BadRequestException('EntityType são obrigatórios');
      }

      // Verifica se a entidade existe (exemplo para Post)
      // await this.validateEntityExists(
      //   createMediaDto.entityType,
      //   createMediaDto.entityId,
      // );

      // Criar registro da mídia no banco
      const media = await this.mediasRepo.create({
        data: {
          filename: file.filename,
          originalName: file.originalname,
          mimeType: file.mimetype,
          size: file.size,
          url: `/${file.destination}/${file.filename}`,
          thumbnailUrl: null, // Pode ser implementado depois
          entityType: createMediaDto.entityType,
          entityId: createMediaDto.entityId,
          mediaType: createMediaDto.mediaType,
          alt: createMediaDto.alt,
          title: createMediaDto.title,
          description: createMediaDto.description,
          order: createMediaDto.order || 0,
          isActive: createMediaDto.isActive ?? true,
        },
      });

      return media;
    } catch (error) {
      // Se houve erro, remove o arquivo que foi salvo
      if (file?.path && existsSync(file.path)) {
        await this.deleteFile(file.path);
      }

      if (error instanceof BadRequestException) {
        throw error;
      }

      throw new InternalServerErrorException('Erro interno ao criar mídia');
    }
  }

  /**
   * Busca todas as mídias com filtros opcionais
   */
  async findAll(options: FindMediaOptions = {}): Promise<Media[]> {
    const where: Prisma.MediaWhereInput = {};

    if (options.entityType) {
      where.entityType = options.entityType;
    }

    if (options.entityId) {
      where.entityId = options.entityId;
    }

    if (options.mediaType) {
      where.mediaType = options.mediaType;
    }

    if (options.isActive !== undefined) {
      where.isActive = options.isActive;
    }

    const orderBy: Prisma.MediaOrderByWithRelationInput = {};
    const orderField = options.orderBy || 'order';
    const orderDirection = options.orderDirection || 'asc';
    orderBy[orderField] = orderDirection;

    return this.mediasRepo.findMany({
      where,
      orderBy,
    });
  }

  /**
   * Busca uma mídia específica por ID
   */
  async findOne(id: string): Promise<Media> {
    const media = await this.mediasRepo.findUnique({
      where: { id },
    });

    if (!media) {
      throw new NotFoundException(`Mídia com ID ${id} não encontrada`);
    }

    return media;
  }

  /**
   * Busca uma mídia específica pelo name
   */
  async findOneByName(name: string) {
    const media = await this.mediasRepo.findFirst({
      where: { filename: name },
    });

    if (!media) {
      throw new NotFoundException(`Mídia com o name ${name} não encontrada`);
    }

    return media;
  }

  /**
   * Busca mídia destacada de uma entidade
   */
  async findFeaturedMedia(
    entityType: string,
    entityId: string,
  ): Promise<Media | null> {
    return this.mediasRepo.findFirst({
      where: {
        entityType,
        entityId,
        mediaType: 'featured_image',
        isActive: true,
      },
    });
  }

  /**
   * Busca galeria de uma entidade
   */
  async findGallery(entityType: string, entityId: string): Promise<Media[]> {
    return this.mediasRepo.findMany({
      where: {
        entityType,
        entityId,
        mediaType: 'gallery',
        isActive: true,
      },
      orderBy: {
        order: 'asc',
      },
    });
  }

  /**
   * Atualiza uma mídia (apenas metadados, não o arquivo)
   */
  async update(
    id: string,
    file: Express.Multer.File,
    updateMediaDto: UpdateMediaDto,
  ): Promise<Media> {
    if (!file) {
      throw new BadRequestException('Arquivo é obrigatório');
    }

    // Verifica se a mídia existe
    const media = await this.findOne(id);

    try {
      const filePath = join(process.cwd(), media.url);
      if (existsSync(filePath)) {
        await this.deleteFile(filePath);
      }

      return await this.mediasRepo.update({
        where: { id },
        // data: updateMediaDto,
        data: {
          filename: file.filename,
          originalName: file.originalname,
          mimeType: file.mimetype,
          size: file.size,
          url: `/${file.destination}/${file.filename}`,
          thumbnailUrl: null, // Pode ser implementado depois
          entityType: updateMediaDto.entityType,
          entityId: updateMediaDto.entityId,
          mediaType: updateMediaDto.mediaType,
          alt: updateMediaDto.alt,
          title: updateMediaDto.title,
          description: updateMediaDto.description,
          order: updateMediaDto.order || 0,
          isActive: updateMediaDto.isActive ?? true,
        },
      });
    } catch (error) {
      throw new InternalServerErrorException('Erro interno ao atualizar mídia');
    }
  }

  /**
   * Substitui o arquivo de uma mídia existente
   */
  async replaceFile(id: string, newFile: Express.Multer.File): Promise<Media> {
    const existingMedia = await this.findOne(id);

    try {
      // Remove o arquivo antigo
      const oldFilePath = join(process.cwd(), existingMedia.url);
      if (existsSync(oldFilePath)) {
        await this.deleteFile(oldFilePath);
      }

      // Atualiza com as informações do novo arquivo
      return await this.mediasRepo.update({
        where: { id },
        data: {
          filename: newFile.filename,
          originalName: newFile.originalname,
          mimeType: newFile.mimetype,
          size: newFile.size,
          url: `/${newFile.destination}/${newFile.filename}`,
          updatedAt: new Date(),
        },
      });
    } catch (error) {
      // Se houve erro, remove o novo arquivo
      if (newFile?.path && existsSync(newFile.path)) {
        await this.deleteFile(newFile.path);
      }

      throw new InternalServerErrorException(
        'Erro interno ao substituir arquivo',
      );
    }
  }

  /**
   * Reordena mídias de uma galeria
   */
  async reorderGallery(
    entityType: string,
    entityId: string,
    mediaIds: string[],
  ): Promise<Media[]> {
    try {
      // Atualiza a ordem de cada mídia
      const updatePromises = mediaIds.map((mediaId, index) =>
        this.mediasRepo.update({
          where: {
            id: mediaId,
            entityType,
            entityId,
            mediaType: 'gallery',
          },
          data: { order: index + 1 },
        }),
      );

      await Promise.all(updatePromises);

      // Retorna a galeria reordenada
      return this.findGallery(entityType, entityId);
    } catch (error) {
      throw new InternalServerErrorException(
        'Erro interno ao reordenar galeria',
      );
    }
  }

  /**
   * Remove uma mídia (soft delete por padrão)
   */
  async remove(id: string, hardDelete: boolean = false): Promise<void> {
    const media = await this.mediasRepo.findUnique({
      where: { id },
    });

    if (!media) {
      throw new ConflictException('Media not found');
    }

    // Remove do banco
    await this.mediasRepo.delete({
      where: { id },
    });

    const filePath = join(process.cwd(), media.url);
    if (existsSync(filePath)) {
      await this.deleteFile(filePath);
    }

    // if (hardDelete) {
    //   // Remove o arquivo físico
    //   const filePath = join(process.cwd(), media.url);
    //   if (existsSync(filePath)) {
    //     await this.deleteFile(filePath);
    //   }

    //   // Remove do banco
    //   await this.mediasRepo.delete({
    //     where: { id },
    //   });
    // } else {
    //   // Soft delete
    //   await this.mediasRepo.update({
    //     where: { id },
    //     data: { isActive: false },
    //   });
    // }

    return null;

    // try {

    // } catch (error) {
    //   throw new InternalServerErrorException('Erro interno ao remover mídia');
    // }
  }

  /**
   * Remove todas as mídias de uma entidade
   */
  async removeAllFromEntity(
    entityType: string,
    entityId: string,
    hardDelete: boolean = false,
  ): Promise<void> {
    const medias = await this.findAll({ entityType, entityId });

    if (hardDelete) {
      // Remove arquivos físicos
      const deleteFilePromises = medias.map(async (media) => {
        const filePath = join(process.cwd(), media.url);
        if (existsSync(filePath)) {
          await this.deleteFile(filePath);
        }
      });

      await Promise.all(deleteFilePromises);

      // Remove do banco
      await this.mediasRepo.deleteMany({
        where: { entityType, entityId },
      });
    } else {
      // Soft delete
      await this.mediasRepo.updateMany({
        where: { entityType, entityId },
        data: { isActive: false },
      });
    }
  }

  /**
   * Valida se a entidade existe no banco
   */
  private async validateEntityExists(
    entityType: string,
    entityId: string,
  ): Promise<void> {
    let exists = false;

    switch (entityType.toLowerCase()) {
      case 'post':
        exists = !!(await this.postsRepo.findUnique({
          where: { id: entityId },
        }));
        break;
      default:
        // Para tipos de entidade não conhecidos, assume que existe
        exists = true;
    }

    if (!exists) {
      throw new BadRequestException(
        `${entityType} com ID ${entityId} não encontrada`,
      );
    }
  }

  /**
   * Remove arquivo do sistema de arquivos
   */
  private async deleteFile(filePath: string): Promise<void> {
    try {
      await unlink(filePath);
    } catch (error) {
      console.error(`Erro ao deletar arquivo ${filePath}:`, error.message);
      // Não lança erro para não interromper o fluxo principal
    }
  }

  async findByEntityId(entityType: string, entityId: string) {
    return this.mediasRepo.findMany({
      where: {
        entityType,
        entityId,
        isActive: true,
      },
      orderBy: { order: 'asc' },
      select: {
        id: true,
        filename: true,
        originalName: true,
        url: true,
        order: true,
        mediaType: true,
      },
    });
  }

  async findByEntityIds(entityType: string, entityIds: string[]) {
    return this.mediasRepo.findMany({
      where: {
        entityType,
        entityId: { in: entityIds },
        isActive: true,
      },
      orderBy: { order: 'asc' },
      select: {
        id: true,
        filename: true,
        originalName: true,
        url: true,
        order: true,
        mediaType: true,
        entityId: true, // Importante para agrupamento
      },
    });
  }
}
