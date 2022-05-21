import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/schema/user.schema';
import { GenericRepositoryService } from './generic.service';
import { GenericRepository } from './repositories/generic.repository';
import { MongoGenericRepository } from './repositories/mongo-generic.repository';
@Injectable()
export class RepositoryService
  implements GenericRepositoryService, OnApplicationBootstrap
{
  users: GenericRepository<User>;

  constructor(
    @InjectModel(User.name) private UserRepository: Model<UserDocument>,
  ) {}

  onApplicationBootstrap() {
    this.users = new MongoGenericRepository<User>(this.UserRepository);
  }
}
