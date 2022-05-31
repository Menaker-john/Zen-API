import {
  Body,
  Controller,
  Get,
  Param,
  ParseArrayPipe,
  Patch,
  Query,
  UseGuards,
} from '@nestjs/common';
import { PaginationParams, PatchDTO } from 'src/common';
import { CorrectUser } from './guards/correct-user.guard';
import { Role, Roles } from '../roles';
import { UsersService } from './users.service';

@Roles(Role.Admin)
@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get('list')
  async list(@Query() options: PaginationParams) {
    return this.userService.findAll(options);
  }

  @UseGuards(CorrectUser)
  @Patch(':id')
  async updateCredentials(
    @Param('id') id: string,
    @Body(new ParseArrayPipe({ items: PatchDTO })) body: PatchDTO[],
  ) {
    return this.userService.updateCredentials(id, body);
  }

  @Patch('/profile/:id')
  async updateProfile(
    @Param('id') id: string,
    @Body(new ParseArrayPipe({ items: PatchDTO })) body: PatchDTO[],
  ) {
    return this.userService.updateProfile(id, body);
  }
}
