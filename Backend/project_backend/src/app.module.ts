import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ChatBotModule } from './modules/chat-bot/chat-bot.module';

@Module({
  imports: [ChatBotModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
