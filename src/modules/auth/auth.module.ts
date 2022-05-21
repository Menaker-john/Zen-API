import { Module } from '@nestjs/common';
import { RepositoryModule } from '../repository';
import { UsersModule } from '../users';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [UsersModule, RepositoryModule],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
