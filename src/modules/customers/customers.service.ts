import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PaginationParams, PatchDTO } from 'src/common';
import { RepositoryService } from '../repository';
import { Customer } from './dtos/customer.dto';

@Injectable()
export class CustomersService {
  constructor(private repository: RepositoryService) {}

  async findAll(options: PaginationParams, filter: any = {}): Promise<Customer[]> {
    try {
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

  async update(_id: string, patches: PatchDTO[]): Promise<Customer> {
    try {
      return this.repository.customers.applyPatches(_id, patches);
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException();
    }
  }

}
