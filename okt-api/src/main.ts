import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  dotenv.config();
  console.log("UI_HOST -> " + process.env.UI_HOST);
  app.enableCors({
    origin: process.env.UI_HOST,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization']
  });

  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
