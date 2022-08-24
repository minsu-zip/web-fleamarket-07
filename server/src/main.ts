import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

const { FRONT_URL } = process.env;

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: { origin: FRONT_URL || '', credentials: true },
  });
  app.setGlobalPrefix('/api');
  await app.listen(5000);
}

bootstrap();
