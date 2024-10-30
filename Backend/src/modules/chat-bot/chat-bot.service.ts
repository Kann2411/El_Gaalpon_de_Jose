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
      start: "Hola, espero que te encuentres bien. ¿En qué puedo ayudarte?\n1. Información sobre nosotros.\n2. Horario del establecimiento.\n3. Consultas sobre membresía.\n4. Terminar conversación.",
      responses: {
        1: "Nosotros somos un gimnasio dedicado a ofrecer las mejores instalaciones y servicios para ayudarte a alcanzar tus metas de fitness. Contamos con un equipo de profesionales listos para guiarte.",
        2: "Los horarios del establecimiento son de lunes a viernes de 8:00 a 21:00 y los sábados de 9:00 a 14:00.",
        3: "Para consultas sobre membresía, por favor, revisa las opciones disponibles en nuestra página web. Por temas de cancelación o modificación, comunícate en administración."
      },
      end: "Me alegra poder haberte ayudado, gracias. Para más información, puedes comunicarte con gym@gym.com. ¡Saludos!"
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
      return "Opción no válida. Por favor, elige una opción del 1 al 4."; 
    }
  }
}
