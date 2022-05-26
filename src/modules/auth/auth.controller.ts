import { Body, Controller, Post } from '@nestjs/common';
import { Role, Roles } from '../roles';
import { AuthService } from './auth.service';
import { Public } from './decorators/public.decorator';
import { Credentials } from './dtos/credentials.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('login')
  async login(@Body() credentials: Credentials) {
    return await this.authService.login(credentials);
  }

  @Roles(Role.Admin)
  @Post('create')
  async create(@Body() credentials: Credentials) {
    return await this.authService.create(credentials);
  }
}
