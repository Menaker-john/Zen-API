import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from '../role.enum';
import { ROLES_KEY } from '../decorators/roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.requiredRoles(context);
    const body = this.getBody(context);
    return this.validateRoles(body.user, requiredRoles);
  }

  private requiredRoles(context: ExecutionContext) {
    return this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
  }

  private getBody(context: ExecutionContext) {
    return context.switchToHttp().getRequest();
  }

  private validateRoles(user: any, requiredRoles: string[]) {
    if (!requiredRoles) return true;
    if (!user) return false;
    return requiredRoles.some((role: string) => user.roles?.includes(role));
  }
}
