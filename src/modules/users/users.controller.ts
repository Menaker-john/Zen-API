import { Controller, Get } from '@nestjs/common';
import { Role } from '../roles/role.enum';
import { Roles } from '../roles/decorators/roles.decorator';
import { UsersService } from '../users/users.service';

@Roles(Role.Admin)
@Controller('users')
export class UsersController {
  constructor(
    private userService: UsersService,
  ) {}

  @Get('list')
  async list() {
    return this.userService.findAll()
  }
}
