import { ConflictException, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { hash } from 'bcryptjs';
import { UsersRepository } from 'src/shared/database/repositories/users.repositories';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepo: UsersRepository) {}

  async create(createUserDto: CreateUserDto) {
    const { name, email, active, password, role } = createUserDto;

    const emailTaken = await this.usersRepo.findUnique({
      where: { email },
      select: { id: true },
    });

    if (emailTaken) {
      throw new ConflictException('This email is already in use');
    }

    const hashedPassword = await hash(password, 12);

    const user = await this.usersRepo.create({
      data: {
        name,
        email,
        active,
        password: hashedPassword,
        role,
      },
    });

    return user;
  }

  async findAll(filters: { search?: string; active?: boolean }) {
    const { search, active } = filters;

    const conditions: Prisma.UserWhereInput[] = [
      search
        ? {
            OR: [
              {
                name: { contains: search, mode: Prisma.QueryMode.insensitive },
              },
              {
                email: { contains: search, mode: Prisma.QueryMode.insensitive },
              },
            ],
          }
        : undefined,
      active !== undefined ? { active } : undefined,
    ].filter(Boolean);

    return this.usersRepo.findAll({
      where: conditions.length > 0 ? { AND: conditions } : undefined,
      orderBy: {
        createdAt: 'desc',
      },
      select: {
        id: true,
        name: true,
        email: true,
        active: true,
        role: true,
      },
    });
  }

  async findOne(id: string) {
    await this.existsUser(id);

    const user = await this.usersRepo.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        email: true,
        active: true,
        role: true,
      },
    });

    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const { name, email, active, password, role } = updateUserDto;

    const updateData = await this.optionalUserData(
      id,
      name,
      email,
      active,
      password,
      role,
    );

    const user = await this.usersRepo.update({
      where: { id },
      data: updateData,
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        active: true,
      },
    });

    return user;
  }

  async remove(userId: string, id: string) {
    if (userId === id) {
      throw new ConflictException("Você não pode deletar seu próprio usuário");
    }

    const currentUser = await this.usersRepo.findUnique({
      where: { id },
    });

    if (!currentUser) {
      throw new ConflictException('User not found');
    }

    await this.usersRepo.delete({
      where: { id },
    });

    return null;
  }

  getUserById(userId: string) {
    return this.usersRepo.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        email: true,
        active: true,
        role: true,
      },
    });
  }

  private async existsUser(id: string) {
    const currentUser = await this.usersRepo.findUnique({
      where: { id },
    });

    if (!currentUser) {
      throw new ConflictException('User not found');
    }
  }

  private async optionalUserData(
    id: string,
    name: string,
    email: string,
    active: boolean,
    password: string,
    role: string,
  ) {
    // Busca o usuário atual para verificar dados existentes
    const currentUser = await this.usersRepo.findUnique({
      where: { id },
      select: {
        role: true,
      },
    });

    if (!currentUser) {
      throw new ConflictException('User not found');
    }

    // Prepara os dados para atualização
    const updateData: any = {};

    if (name) updateData.name = name;

    if (email) {
      const emailTaken = await this.usersRepo.findUnique({
        where: { email },
      });

      if (emailTaken && emailTaken.id !== id) {
        throw new ConflictException('This email is already in use');
      }

      updateData.email = email;
    }

    if (active !== undefined) updateData.active = active;

    // Atualiza senha apenas se fornecida
    if (password) {
      updateData.password = await hash(password, 12);
    }

    // Atualiza roles apenas se fornecidas
    if (role) updateData.role = role;

    return updateData;
  }
}
