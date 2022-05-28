import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  User,
  UserDocument,
  Credentials,
  CredentialsDocument,
  Profile,
  ProfileDocument,
} from 'src/schema';
import { GenericRepositoryService } from './generic.service';
import { GenericRepository } from './repositories/generic.repository';
import { MongoGenericRepository } from './repositories/mongo-generic.repository';
@Injectable()
export class RepositoryService
  implements GenericRepositoryService, OnApplicationBootstrap
{
  users: GenericRepository<User>;
  credentials: GenericRepository<Credentials>;
  profiles: GenericRepository<Profile>;

  constructor(
    @InjectModel(User.name) private UserRepository: Model<UserDocument>,
    @InjectModel(Credentials.name)
    private CredentialsRepository: Model<CredentialsDocument>,
    @InjectModel(Profile.name)
    private ProfileRepository: Model<ProfileDocument>,
  ) {}

  onApplicationBootstrap() {
    this.users = new MongoGenericRepository<User>(this.UserRepository);
    this.credentials = new MongoGenericRepository<Credentials>(
      this.CredentialsRepository,
    );
    this.profiles = new MongoGenericRepository<Profile>(this.ProfileRepository);
  }
}
