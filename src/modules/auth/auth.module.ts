import { MiddlewareConsumer, Module } from '@nestjs/common';
import { CreateId } from 'src/common';
import { RepositoryModule } from '../repository';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { ToLowerUsername } from './middleware';

@Module({
  imports: [RepositoryModule],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ToLowerUsername).forRoutes('auth');
    consumer.apply(CreateId).forRoutes('auth/create');
  }
}
