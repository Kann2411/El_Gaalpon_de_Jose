import { Body, Controller, Get, Post, Query, Res, Response } from '@nestjs/common';
import { chatBotService } from './chat-bot.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Chatbot')
@Controller('chatbot')
export class chatBotController {
  constructor(private readonly chatBotService: chatBotService) {}
  
  @Get('start')
  async startChat(@Res() response) {
    const result = await this.chatBotService.getResponse(0);
    return response.send(result); 
  }

  @Get('response')
  async getResponse(@Query('option') option: number, @Res() response) {
    const result = await this.chatBotService.getResponse(option);
    return response.send(result); 
  }
}
