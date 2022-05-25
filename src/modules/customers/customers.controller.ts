import { Body, Controller, Get, Post } from '@nestjs/common';
import { Role, Roles } from '../roles';
import { CustomersService } from './customers.service';

@Controller('customers')
export class CustomersController {
  constructor(private userService: CustomersService) {}

  @Get('list')
  async list() { }

  @Post('create')
  async create(@Body() customerPayload) { }
}
