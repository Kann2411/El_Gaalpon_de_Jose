import { Module } from '@nestjs/common';
import { chatBotController } from './chat-bot.controller';
import { chatBotService } from './chat-bot.service';

@Module({
  imports: [],
  controllers: [chatBotController],
  providers: [chatBotService],
})
export class ChatBotModule {}
