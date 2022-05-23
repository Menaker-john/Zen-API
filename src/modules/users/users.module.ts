import { MiddlewareConsumer, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/schema';
import { RepositoryModule } from '../repository';
import { CreateUserId } from './middleware/create-user-id';
import { ValidateNewUser } from './middleware/validate-new-user';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [
    RepositoryModule,
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ValidateNewUser, CreateUserId).forRoutes('users/create');
  }
}
