import { Injectable } from '@nestjs/common';
import { OpenAI } from 'openai';

@Injectable()
export class chatBotService {
  private openai = new OpenAI({
    apiKey:
      'sk-lRfFl29lo7gFf2mEXHT1YI2RNnXeQMJevy6vP0SEo6T3BlbkFJNcO9pGpa4jXMGEAUi0tVCo7aKCpm1byT4p_j7eGGkA',
  });

  async getResponse(message: string) {
    const response = await this.openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: message }],
    });
    return response.choices[0].message.content;
  }
}
