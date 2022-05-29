import { MiddlewareConsumer, Module } from '@nestjs/common';
import { RepositoryModule } from '../repository';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { CreateUserId } from './middleware/create-user-id';

@Module({
  imports: [RepositoryModule],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CreateUserId).forRoutes('auth/create');
  }
}
