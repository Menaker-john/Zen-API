import { Module } from '@nestjs/common';
import { RepositoryModule } from '../repository/repository.module';
import { UsersModule } from '../users/users.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [UsersModule, RepositoryModule],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
