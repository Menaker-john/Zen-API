import { Body, Controller, Get, Post } from '@nestjs/common';
import { Role, Roles } from '../roles';
import { User } from './dtos/user.dto';
import { UsersService } from './users.service';

@Roles(Role.Admin)
@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get('list')
  async list() {
    return this.userService.findAll();
  }
}
