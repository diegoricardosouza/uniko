import { ConflictException, Injectable } from '@nestjs/common';
import { SettingsRepository } from 'src/shared/database/repositories/settings.repositories';
import { CreateSettingDto } from './dto/create-setting.dto';
import { UpdateSettingDto } from './dto/update-setting.dto';

@Injectable()
export class SettingsService {
  constructor(private readonly settingsRepo: SettingsRepository) {}

  async create(createSettingDto: CreateSettingDto) {
    const { titleSeo, descriptionSeo, socialMedia, unitCompany } = createSettingDto;

    const settings = await this.settingsRepo.create({
      data: {
        titleSeo,
        descriptionSeo,
        unitCompany: unitCompany?.length
          ? {
            create: unitCompany.map((uc) => ({
              name: uc.name,
              email: uc.email,
              telephone: uc.telephone,
              cellphone: uc.cellphone,
              service: uc.service,
              address: uc.address,
            })),
          }
          : undefined,
        socialMedia: socialMedia?.length
          ? {
            create: socialMedia.map((sm) => ({
              name: sm.name,
              url: sm.url,
              icon: sm.icon,
              iconJson: sm.iconJson
            })),
          }
          : undefined,
      },
      include: {
        unitCompany: {
          omit: {
            updatedAt: true,
            settingId: true,
            createdAt: true
          }
        },
        socialMedia: {
          omit: {
            updatedAt: true,
            settingId: true,
            createdAt: true
          }
        },
      }
    });

    return settings;
  }

  findAll() {
    return this.settingsRepo.findAll({
      orderBy: {
        createdAt: 'desc',
      },
      select: {
        id: true,
        titleSeo: true,
        descriptionSeo: true,
        unitCompany: {
          omit: {
            updatedAt: true,
            settingId: true,
            createdAt: true
          }
        },
        socialMedia: {
          omit: {
            updatedAt: true,
            settingId: true,
            createdAt: true
          }
        }
      },
    });
  }

  async findOne(id: string) {
    const currentUser = await this.settingsRepo.findUnique({
      where: { id },
    });

    if (!currentUser) {
      throw new ConflictException('Setting not found');
    }

    const setting = await this.settingsRepo.findUnique({
      where: { id },
      select: {
        id: true,
        titleSeo: true,
        descriptionSeo: true,
        unitCompany: {
          omit: {
            updatedAt: true,
            settingId: true,
            createdAt: true
          }
        },
        socialMedia: {
          omit: {
            updatedAt: true,
            settingId: true,
            createdAt: true
          }
        }
      }
    })

    return setting;
  }

  async update(id: string, updateSettingDto: UpdateSettingDto) {
    const { titleSeo, descriptionSeo, socialMedia, unitCompany } = updateSettingDto;
    
    const currentUser = await this.settingsRepo.findUnique({
      where: { id },
    });

    if (!currentUser) {
      throw new ConflictException('Setting not found');
    }

    return this.settingsRepo.update({
      where: { id },
      data: {
        titleSeo,
        descriptionSeo,
        unitCompany: unitCompany?.length
          ? {
            deleteMany: {},
            create: unitCompany.map((uc) => ({
              name: uc.name,
              email: uc.email,
              telephone: uc.telephone,
              cellphone: uc.cellphone,
              service: uc.service,
              address: uc.address,
            })),
          }
          : undefined,
        socialMedia: socialMedia?.length
          ? {
            deleteMany: {},
            create: socialMedia.map((sm) => ({
              name: sm.name,
              url: sm.url,
              icon: sm.icon,
              iconJson: sm.iconJson
            })),
          }
          : undefined,
      },
      include: {
        unitCompany: {
          omit: {
            updatedAt: true,
            settingId: true,
            createdAt: true
          }
        },
        socialMedia: {
          omit: {
            updatedAt: true,
            settingId: true,
            createdAt: true
          }
        },
      }
    });
  }

  async remove(id: string) {
    const currentUser = await this.settingsRepo.findUnique({
      where: { id },
    });

    if (!currentUser) {
      throw new ConflictException('Setting not found');
    }

    await this.settingsRepo.delete({
      where: { id },
    });

    return null;
  }
}
