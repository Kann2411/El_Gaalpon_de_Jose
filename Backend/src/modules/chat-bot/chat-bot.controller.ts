import { Body, Controller, Post } from '@nestjs/common';
import { chatBotService } from './chat-bot.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Chatbot')
@Controller('chatbot')
export class chatBotController {
  constructor(private readonly chatBotService: chatBotService) {}

  @Post('message')
  handleMessage(@Body('message') message: string) {
    return this.chatBotService.getResponse(message);
  }
}
