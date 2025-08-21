import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { ValidationPipe } from '@nestjs/common';
import cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser()); 
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,              // remove unexpected fields
      forbidNonWhitelisted: true,   // throw error if extra fields
      transform: true,

    })
  )
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
