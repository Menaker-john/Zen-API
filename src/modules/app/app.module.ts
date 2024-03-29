import { MiddlewareConsumer, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { MongooseModule } from '@nestjs/mongoose';

import { AuthModule, AuthService, JwtAuthGuard, JwtStrategy } from '../auth';
import { RepositoryModule } from '../repository';
import { RolesGuard } from '../roles';
import { UsersModule } from '../users';
import { GenerateSort } from 'src/common/middleware/generate.sort';
import { CustomersModule } from '../customers/customers.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGO_URI),
    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 30,
    }),
    RepositoryModule,
    UsersModule,
    AuthModule,
    CustomersModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
    JwtStrategy,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
    AuthService,
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(GenerateSort).forRoutes('*/list');
  }
}
