import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { rutasMiddleware } from './middlewares/middleware.rutas';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ExcludePasswordInterceptor } from './interceptors/omit-password.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: [
      'http://localhost:3001',
      'https://fitzzone.vercel.app',
      'https://el-gaalpon-de-jose.onrender.com',
    ],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  app.useGlobalInterceptors(new ExcludePasswordInterceptor());
  app.use(rutasMiddleware);

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Gimnasio')
    .setDescription('API para el gimnasio')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
