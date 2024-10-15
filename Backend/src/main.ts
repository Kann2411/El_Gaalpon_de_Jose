import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { LoggerGlobal } from './modules/middlewares/logger.middleware';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: 'http://localhost:3000', 
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, 
  }); 
  app.useGlobalPipes(new ValidationPipe({whitelist:true,forbidNonWhitelisted: true,transform: true,}))
  app.use(LoggerGlobal);
  await app.listen(3000);
}
bootstrap();
