import { Injectable, ConflictException } from '@nestjs/common';
import { Types } from 'mongoose';
import { User } from './dtos/user.dto';
import { RepositoryService } from '../repository/repository.service';

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
    return (await this.repository.users.fetchOne({ username })) as User;
  }

  async findById(payload: any): Promise<User> {
    return (await this.repository.users.fetchOne(
      { _id: payload._id },
      { password: 0 },
    )) as User;
  }

  async findAll(): Promise<User[]> {
    return (await this.repository.users.fetch({}, { password: 0 })) as User[];
  }
}
