import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { Role, Roles } from '../roles';
import { AuthService } from './auth.service';
import { Public } from './decorators/public.decorator';
import { Credentials } from './dtos/credentials.dto';
import { NewUser } from './guards/new-user.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Roles(Role.Admin)
  @UseGuards(NewUser)
  @Post('create')
  async create(@Body() credentials: Credentials) {
    return await this.authService.create(credentials);
  }

  @Public()
  @Post('login')
  async login(@Body() credentials: Credentials) {
    return await this.authService.login(credentials);
  }
}
