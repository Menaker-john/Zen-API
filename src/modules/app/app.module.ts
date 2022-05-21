import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule, AuthService, JwtAuthGuard, JwtStrategy } from '../auth';
import { RepositoryModule } from '../repository';
import { RolesGuard } from '../roles';
import { UsersModule } from '../users';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGO_URI),
    RepositoryModule,
    UsersModule,
    AuthModule,
  ],
  controllers: [],
  providers: [
    AuthService,
    JwtStrategy,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
