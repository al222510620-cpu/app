import { NestFactory } from '@nestjs/core';
import type { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useBodyParser('json', { limit: '10mb' });
  app.enableCors({
    origin: ['http://localhost:8081', 'http://0.0.0.0:8081'],
    methods: 'GET, HEAD, PUT, PATCH, POST, DELETE, OPTIONS',
  });
  await app.listen(process.env.PORT ?? 3000);
}
void bootstrap();
