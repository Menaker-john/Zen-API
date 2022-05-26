import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Credentials } from '../auth/dtos/credentials.dto';
import { RepositoryService } from '../repository';
@Injectable()
export class UsersService {
  constructor(private repository: RepositoryService) {}

  async findAll(): Promise<Credentials[]> {
    try {
      return this.repository.credentials.findAndHydrate(["profile"] );
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
}
