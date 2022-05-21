import { Body, Controller, Get, Post } from '@nestjs/common';
import { Role } from '../roles/role.enum';
import { Roles } from '../roles/decorators/roles.decorator';
import { UsersService } from '../users/users.service';
import { User } from './dtos/user.dto';

@Roles(Role.Admin)
@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get('list')
  async list() {
    return this.userService.findAll();
  }

  @Post('create')
  async create(@Body() userPayload: User) {
    await this.userService.create(userPayload);
  }
}
