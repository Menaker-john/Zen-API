import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app/app.module';
import helmet from 'helmet';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(helmet());
  app.useGlobalPipes(
    new ValidationPipe({
      disableErrorMessages: true,
    }),
  );
  await app.listen(3000);
}
bootstrap();
