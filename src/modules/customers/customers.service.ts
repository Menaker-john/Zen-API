import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { RepositoryService } from '../repository';

@Injectable()
export class CustomersService {
  constructor(private repository: RepositoryService) {}
}
