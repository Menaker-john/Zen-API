import { Controller, Get } from '@nestjs/common';
import { Role } from '../roles/role.enum';
import { Roles } from '../roles/roles.decorator';
import { UsersService } from '../users/users.service';
import { UserDTO } from './dtos/user.dto';

@Roles(Role.Admin)
@Controller('users')
export class UsersController {
  constructor(
    private userService: UsersService,
  ) {}

  @Get('list')
  async list(): Promise<UserDTO[]>{
    return this.userService.findAll()
  }
}
