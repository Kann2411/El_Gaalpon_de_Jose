import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ChatBotModule } from './modules/chat-bot/chat-bot.module';
import { FileUploadModule } from './modules/file-upload/file-upload.module';

@Module({
  imports: [ChatBotModule, FileUploadModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
