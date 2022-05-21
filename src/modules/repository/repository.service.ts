import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserProfile, UserProfileDocument } from 'src/schema';
import { User, UserDocument } from 'src/schema/user.schema';
import { GenericRepositoryService } from './generic.service';
import { GenericRepository } from './repositories/generic.repository';
import { MongoGenericRepository } from './repositories/mongo-generic.repository';
@Injectable()
export class RepositoryService
  implements GenericRepositoryService, OnApplicationBootstrap
{
  users: GenericRepository<User>;
  userProfiles: GenericRepository<UserProfile>;

  constructor(
    @InjectModel(User.name) private UserRepository: Model<UserDocument>,
    @InjectModel(UserProfile.name) private UserProfileRepository: Model<UserProfileDocument>,
  ) {}

  onApplicationBootstrap() {
    this.users = new MongoGenericRepository<User>(this.UserRepository);
    this.userProfiles = new MongoGenericRepository<UserProfile>(this.UserProfileRepository);
  }
}
