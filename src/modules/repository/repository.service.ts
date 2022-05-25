import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument, Customer, CustomerDocument } from 'src/schema';
import { GenericRepositoryService } from './generic.service';
import { GenericRepository } from './repositories/generic.repository';
import { MongoGenericRepository } from './repositories/mongo-generic.repository';
@Injectable()
export class RepositoryService
  implements GenericRepositoryService, OnApplicationBootstrap
{
  users: GenericRepository<User>;
  customers: GenericRepository<Customer>;

  constructor(
    @InjectModel(User.name) private UserRepository: Model<UserDocument>,
    @InjectModel(Customer.name)
    private CustomerRepository: Model<CustomerDocument>,
  ) {}

  onApplicationBootstrap() {
    this.users = new MongoGenericRepository<User>(this.UserRepository);
    this.customers = new MongoGenericRepository<Customer>(
      this.CustomerRepository,
    );
  }
}
