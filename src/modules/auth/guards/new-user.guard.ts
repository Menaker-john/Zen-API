import {
  ConflictException,
  ExecutionContext,
  Injectable,
} from '@nestjs/common';
import { AuthService } from '../auth.service';
import { Credentials } from '../dtos/credentials.dto';

@Injectable()
export class NewUser {
  constructor(private authService: AuthService) { }

  async canActivate(context: ExecutionContext) {
    const user = this.getUser(context)
    return await this.validateRequest(user);
  }

  private getUser(context: ExecutionContext) {
    return context.switchToHttp().getRequest().body;
  }

  private async validateRequest(user: Credentials) {
    if (await this.authService.userAlreadyExists(user.username))
      throw new ConflictException();

    return true;
  }
}
