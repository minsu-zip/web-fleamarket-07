import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { IoAdapter } from '@nestjs/platform-socket.io';

const { FRONT_URL } = process.env;

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: { origin: FRONT_URL || '', credentials: true },
  });
  app.setGlobalPrefix('/api');
  app.useWebSocketAdapter(new IoAdapter(app));
  await app.listen(5000);
}

bootstrap();
