import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PaginationParams } from 'src/common';
import { RepositoryService } from '../repository';
import { Customer } from './dtos/customer.dto';

@Injectable()
export class CustomersService {
  constructor(private repository: RepositoryService) {}

  async findAll(options: PaginationParams, filter: any = {}): Promise<Customer[]> {
    try {
      console.log({filter})
      return this.repository.customers.findAndHydrate(
        filter,
        ['accountOwner'],
        options
      );
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async create(customer: Customer): Promise<Customer> {
    return this.repository.customers.create(customer)
  }

}
