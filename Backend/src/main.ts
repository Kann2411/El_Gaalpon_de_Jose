import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { rutasMiddleware } from './middlewares/middleware.rutas';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors(/* {
    origin: 'http://localhost:3000',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  } */);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  app.use(rutasMiddleware);
  await app.listen(3000);
}
bootstrap();
