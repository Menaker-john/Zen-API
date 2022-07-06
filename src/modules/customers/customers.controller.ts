import { Body, Controller, Get, Post, Query, Req, UseInterceptors } from '@nestjs/common';
import { Request } from 'express';
import { PaginationParams } from 'src/common';
import { OwnershipInterceptor } from '../ownership/interceptors/ownership.interceptor';
import { Role, Roles } from '../roles';
import { CustomersService } from './customers.service';
import { Customer } from './dtos/customer.dto';

@Controller('customers')
export class CustomersController {
  constructor(private customerService: CustomersService) {}

  @UseInterceptors(OwnershipInterceptor)
  @Get('list')
  async list(@Req() req, @Query() options: PaginationParams) {
    const data = await this.customerService.findAll(options, req.filter);
    return { data };
  }

  @Post('create')
  async create(@Body() customerPayload: Customer) {
    return this.customerService.create(customerPayload);
  }
}
