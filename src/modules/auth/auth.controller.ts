import { Body, Controller, Post } from '@nestjs/common';
import { Role } from '../roles/role.enum';
import { Roles } from '../roles/roles.decorator';
import { AuthUserDTO } from '../users/dtos/auth-user.dto';
import { UserDTO } from '../users/dtos/user.dto';
import { UsersService } from '../users/users.service';
import { AuthService } from './auth.service';
import { AuthDTO } from './dtos/auth.dto';
import { Public } from './guards/jwt.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private userService: UsersService,
    private authService: AuthService,
  ) {}

  @Roles(Role.Admin)
  @Post('register')
  async register(@Body() userPayload: UserDTO): Promise<AuthDTO> {
    const _id = await this.userService.create(userPayload);
    const token = await this.authService.signPayload(_id);
    return { _id, token };
  }

  @Public()
  @Post('login')
  async login(@Body() userPayload: AuthUserDTO): Promise<AuthDTO> {
    const _id = await this.userService.validateCredentials(userPayload);
    const token = await this.authService.signPayload(_id);
    return { _id, token };
  }
}
