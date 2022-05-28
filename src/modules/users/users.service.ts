import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PaginationParams, PatchDTO } from 'src/common';
import { RepositoryService } from '../repository';
import { User } from './dtos/user.dto';
@Injectable()
export class UsersService {
  constructor(private repository: RepositoryService) {}

  async findAll(options: PaginationParams): Promise<User[]> {
    try {
      return this.repository.credentials.findAndHydrate(
        {},
        ['profile'],
        options,
      );
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async updateCredentials(_id: string, patches: PatchDTO[]) {
    try {
      return this.repository.credentials.applyPatches(_id, patches);
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async updateProfile(_id: string, patches: PatchDTO[]) {
    try {
      return this.repository.profiles.applyPatches(_id, patches);
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
}
