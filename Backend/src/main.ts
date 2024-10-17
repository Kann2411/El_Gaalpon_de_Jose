import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { rutasMiddleware } from './middlewares/middleware.rutas';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

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
<<<<<<< HEAD
=======

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Gimnasio')
    .setDescription('API para el gimnasio')
    .setVersion('1.0')
    .addBearerAuth()
    .build()

  const document = SwaggerModule.createDocument(app, swaggerConfig)
  SwaggerModule.setup('api', app, document)

>>>>>>> 89a00e06a6aa837b632b152e2771088732dfb061
  await app.listen(3001);
}
bootstrap();
