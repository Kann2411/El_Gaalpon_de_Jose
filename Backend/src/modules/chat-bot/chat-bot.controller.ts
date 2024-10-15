import { Body, Controller, Post } from '@nestjs/common';
import { chatBotService } from './chat-bot.service';

@Controller('chatbot')
export class chatBotController {
  constructor(private readonly chatBotService: chatBotService) {}

  @Post('message')
  handleMessage(@Body('message') message: string) {
    return this.chatBotService.getResponse(message);
  }
}
