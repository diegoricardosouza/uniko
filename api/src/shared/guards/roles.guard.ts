import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLE_KEY } from '../decorators/Roles';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) { }

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(ROLE_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles || requiredRoles.length === 0) {
      return true; // se não houver roles exigidas, permitir
    }

    const request = context.switchToHttp().getRequest();
    const userRole = request['role']; // pega do AuthGuard

    if (!requiredRoles.includes(userRole)) {
      throw new ForbiddenException('Acesso negado. Role insuficiente.');
    }

    return true;
  }
}