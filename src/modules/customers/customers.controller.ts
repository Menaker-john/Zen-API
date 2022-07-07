import {
  Body,
  Controller,
  Get,
  Param,
  ParseArrayPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { PaginationParams, PatchDTO } from 'src/common';
import { OwnerFilter } from '../ownership';
import { CustomersService } from './customers.service';
import { Customer } from './dtos/customer.dto';

@Controller('customers')
export class CustomersController {
  constructor(private customerService: CustomersService) {}

  @Get('list')
  async list(
    @OwnerFilter('owner') filter: Record<string, any>,
    @Query() options: PaginationParams,
  ) {
    const data = await this.customerService.findAll(options, filter);
    return { data };
  }

  @Post('create')
  async create(@Body() customerPayload: Customer) {
    return this.customerService.create(customerPayload);
  }

  @Patch(':id')
  async updateCustomer(
    @Param('id') id: string,
    @Body(new ParseArrayPipe({ items: PatchDTO })) body: PatchDTO[],
  ) {
    return this.customerService.update(id, body);
  }
}
