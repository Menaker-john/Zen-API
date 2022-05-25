import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema, Customer, CustomerSchema } from 'src/schema';
import { RepositoryService } from './repository.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MongooseModule.forFeature([
      { name: Customer.name, schema: CustomerSchema },
    ]),
  ],
  providers: [RepositoryService],
  exports: [RepositoryService],
})
export class RepositoryModule {}
