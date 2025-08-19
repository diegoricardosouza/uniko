// seed.service.ts
import { Injectable, OnModuleInit } from '@nestjs/common';
import { hash } from 'bcryptjs';
import { UsersRepository } from 'src/shared/database/repositories/users.repositories';

@Injectable()
export class SeedService implements OnModuleInit {
  constructor(
    private readonly usersRepo: UsersRepository,
  ) { }

  async onModuleInit() {
    const adminExists = await this.usersRepo.findUnique({
      where: { email: 'admin@admin.com' },
    });

    if (!adminExists) {
      const hashedPassword = await hash('admin', 12);

      await this.usersRepo.create({
        data: {
          name: 'Administrador',
          email: 'admin@admin.com',
          password: hashedPassword,
          active: true,
          role: 'ADMIN',
        },
      });
      console.log('Usuário admin criado com sucesso!');
    }
  }
}