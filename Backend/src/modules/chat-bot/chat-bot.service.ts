import { Injectable } from '@nestjs/common';

@Injectable()
export class chatBotService {
  async getResponse(message: string) {
    const userMensaje = message.toLowerCase();
    let reply = 'No entiendo lo que quieres decir';

    if (userMensaje.includes('hola')) {
      reply = 'Hola, ¿en qué puedo ayudarte?';
    }

    return reply;
  }
}
