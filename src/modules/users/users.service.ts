import { Injectable, ConflictException } from '@nestjs/common';
import { Types } from 'mongoose';
import { RepositoryService } from '../repository';
import { User } from './dtos/user.dto';
@Injectable()
export class UsersService {
  constructor(private repository: RepositoryService) {}

  private async userAlreadyExists(username: string) {
    return (await this.fetchUserByUsername(username)) != undefined;
  }

  async create(userPayload: User) {
    if (await this.userAlreadyExists(userPayload.username))
      throw new ConflictException();

    userPayload._id = new Types.ObjectId();
    await this.repository.users.create(userPayload);
  }
  async fetchUserByUsername(username: string): Promise<User> {
    return this.repository.users.fetchOne({ username });
  }

  async findById(payload: any): Promise<User> {
    return this.repository.users.fetchOne(
      { _id: payload._id },
      { password: 0 },
    );
  }

  async findAll(): Promise<User[]> {
    return this.repository.users.fetch({}, { password: 0 });
  }
}
