import { Body, Controller, Post } from '@nestjs/common';
import { Role } from '../roles/role.enum';
import { Roles } from '../roles/decorators/roles.decorator';
import { UserCredentials } from '../users/dtos/user-credentials.dto';
import { User } from '../users/dtos/user.dto';
import { UsersService } from '../users/users.service';
import { Public } from './decorators/public.decorator';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(
    private userService: UsersService,
    private authService: AuthService,
  ) {}

  @Roles(Role.Admin)
  @Post('register')
  async register(@Body() userPayload: User) {
    const user = await this.userService.create(userPayload);
    const token = await this.authService.signPayload(user._id);
    return { _id: user._id, token };
  }

  @Public()
  @Post('login')
  async login(@Body() userPayload: UserCredentials) {
    const user = await this.userService.validateCredentials(userPayload);
    const token = await this.authService.signPayload(user._id);
    return { _id: user._id, token };
  }
}
