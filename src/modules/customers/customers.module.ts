import { MiddlewareConsumer, Module } from '@nestjs/common';
import { RepositoryModule } from '../repository';

@Module({
  imports: [RepositoryModule],
  controllers: [],
  providers: [],
  exports: [],
})
export class CustomersModule {}
