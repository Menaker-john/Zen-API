import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from '../role.enum';
import { ROLES_KEY } from '../decorators/roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  private requiredRoles(context: ExecutionContext) {
    return this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
  }

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.requiredRoles(context);

    if (!requiredRoles) return true;

    const { user } = context.switchToHttp().getRequest();
    if (!user) return false;

    return requiredRoles.some((role) => user.roles?.includes(role));
  }
}
