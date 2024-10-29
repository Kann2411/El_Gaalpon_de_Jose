import { chatBotService } from './chat-bot.service';
export declare class chatBotController {
    private readonly chatBotService;
    constructor(chatBotService: chatBotService);
    handleMessage(message: string): Promise<string>;
}
