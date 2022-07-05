import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PaginationParams } from 'src/common';
import { RepositoryService } from '../repository';
import { Customer } from './dtos/customer.dto';

@Injectable()
export class CustomersService {
  constructor(private repository: RepositoryService) {}

  async findAll(options: PaginationParams): Promise<Customer[]> {
    try {
      return this.repository.customers.findAndHydrate(
        {},
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
