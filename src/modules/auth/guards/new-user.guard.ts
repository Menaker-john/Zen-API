import {
  ConflictException,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from '../auth.service';
import { Credentials } from '../dtos/credentials.dto';

@Injectable()
export class NewUser {
  constructor(private authService: AuthService) { }

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const user = request.body;
    return await this.validateRequest(user);
  }

  private async validateRequest(user: Credentials) {
    if (await this.authService.userAlreadyExists(user.username))
      throw new ConflictException();

    return true;
  }

}
