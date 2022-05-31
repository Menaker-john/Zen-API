import { MiddlewareConsumer, Module } from '@nestjs/common';
import { RepositoryModule } from '../repository';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { CreateUserId, ToLowerUsername } from './middleware';

@Module({
  imports: [RepositoryModule],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ToLowerUsername).forRoutes('auth');
    consumer.apply(CreateUserId).forRoutes('auth/create');
  }
}
