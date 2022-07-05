import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { PaginationParams } from 'src/common';
import { Role, Roles } from '../roles';
import { CustomersService } from './customers.service';
import { Customer } from './dtos/customer.dto';

@Controller('customers')
export class CustomersController {
  constructor(private customerService: CustomersService) {}

  @Roles(Role.Admin)
  @Get('list')
  async list(@Query() options: PaginationParams) {
    const data = await this.customerService.findAll(options);
    return { data };
  }

  @Post('create')
  async create(@Body() customerPayload: Customer) {
    
  }
}
