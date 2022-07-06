import { MiddlewareConsumer, Module } from '@nestjs/common';
import { CreateId } from 'src/common';
import { RepositoryModule } from '../repository';
import { CustomersController } from './customers.controller';
import { CustomersService } from './customers.service';

@Module({
  imports: [RepositoryModule],
  controllers: [CustomersController],
  providers: [CustomersService],
  exports: [],
})
export class CustomersModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CreateId).forRoutes('customers/create');
  }
}
