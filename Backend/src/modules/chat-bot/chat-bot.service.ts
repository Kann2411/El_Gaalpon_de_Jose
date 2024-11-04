import { Injectable } from '@nestjs/common';

@Injectable()
export class chatBotService {
  private responses: any;
  private currentOption: number;

  constructor() {
    this.initializeResponses();
    this.currentOption = 0;
  }

  private initializeResponses() {
    this.responses = {
      start:
        'Hello, I hope you are well. How can I help you?\n1. Information about us.\n2. Establishment hours.\n3. Membership inquiries.\n4. End the conversation.',
      responses: {
        1: 'We are a gym dedicated to offering the best facilities and services to help you achieve your fitness goals. We have a team of professionals ready to guide you.',
        2: "The establishment's opening hours are Monday to Friday from 8:00 a.m. to 9:00 p.m. and Saturdays from 9:00 a.m. to 2:00 p.m.",
        3: 'For membership inquiries, please review the options available on our website. For cancellation or modification issues, contact administration.',
      },
      end: "I'm glad I could help you, thank you. For more information, you can contact gym@gym.com. Greetings!",
    };
  }

  async getResponse(option: number): Promise<string> {
    if (option === 0) {
      this.currentOption = 0;
      return this.responses.start;
    } else if (this.responses.responses[option]) {
      this.currentOption = option;
      return this.responses.responses[option];
    } else if (option === 4) {
      this.currentOption = 0;
      return this.responses.end;
    } else {
      return 'Invalid option. Please choose an option from 1 to 4.';
    }
  }
}
