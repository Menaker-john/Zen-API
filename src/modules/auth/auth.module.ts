import { MiddlewareConsumer, Module } from '@nestjs/common';
import { RepositoryModule } from '../repository';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { CreateUserId } from './middleware/create-user-id';
import { ValidateNewUser } from './middleware/validate-new-user';

@Module({
  imports: [RepositoryModule],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ValidateNewUser, CreateUserId).forRoutes('auth/create');
  }
}
