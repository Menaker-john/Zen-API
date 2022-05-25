import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { RepositoryService } from '../repository';
import { User } from './dtos/user.dto';
@Injectable()
export class UsersService {
  constructor(private repository: RepositoryService) {}

  async create(userPayload: User) {
    try {
      await this.repository.users.create(userPayload);
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async fetchUserByUsername(username: string): Promise<User> {
    try {
      return this.repository.users.fetchOne({ username });
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async findAll(): Promise<User[]> {
    try {
      return this.repository.users.fetch({}, { password: 0 });
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async userAlreadyExists(username: string) {
    try {
      return (await this.fetchUserByUsername(username)) != undefined;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
}
