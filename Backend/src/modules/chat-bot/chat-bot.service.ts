import { Injectable } from '@nestjs/common';

@Injectable()
export class chatBotService {
  private awaitingResponse: string | null = null;

  async getResponse(message: string) {
    const userMensaje = message.toLowerCase();
    let reply =
      'No entiendo lo que quieres decir. ¿Puedes reformular tu pregunta?';

    //? preguntas esperadas
    if (this.awaitingResponse === 'clases') {
      if (userMensaje.includes('sí') || userMensaje.includes('si')) {
        reply = 'Hoy hay clases de yoga a las 6 PM y spinning a las 7 PM.';
      } else if (userMensaje.includes('no')) {
        reply = 'Entendido, avísame si necesitas información sobre otra cosa.';
      }
      this.awaitingResponse = null;
      return reply;
    }

    if (this.awaitingResponse === 'rutina') {
      if (userMensaje.includes('piernas')) {
        reply =
          'Para entrenar piernas, te sugiero hacer sentadillas, lunges, y peso muerto.';
      } else if (userMensaje.includes('brazos')) {
        reply =
          'Para trabajar brazos, puedes hacer flexiones, curls de bíceps y fondos.';
      }
      this.awaitingResponse = null;
      return reply;
    }

    if (this.awaitingResponse === 'dieta') {
      if (userMensaje.includes('sí') || userMensaje.includes('si')) {
        reply =
          'Aquí tienes algunas sugerencias: Pechuga de pollo con arroz integral, batido de proteínas con avena, o una ensalada con atún.';
      } else if (userMensaje.includes('no')) {
        reply = 'Entendido, avísame si necesitas algo más.';
      }
      this.awaitingResponse = null;
      return reply;
    }

    if (userMensaje.includes('hola')) {
      reply = 'Hola, ¿en qué puedo ayudarte?';
    } else if (userMensaje.includes('clases')) {
      reply =
        'Las clases están disponibles de 6 AM a 9 PM. ¿Te gustaría saber sobre alguna clase en particular?';
      this.awaitingResponse = 'clases';
    } else if (
      userMensaje.includes('entrenador') ||
      userMensaje.includes('entrenadores')
    ) {
      reply =
        'Hoy están disponibles los entrenadores Juan y Marta para sesiones personales.';
    } else if (userMensaje.includes('rutina')) {
      reply =
        'Puedo sugerirte una rutina de ejercicios. ¿Qué área te gustaría entrenar hoy? ¿Piernas o brazos?';
      this.awaitingResponse = 'rutina';
    } else if (userMensaje.includes('nutrición')) {
      reply =
        'Para antes de entrenar, te recomiendo una comida rica en proteínas y carbohidratos ligeros. ¿Te gustaría sugerencias de comidas?';
      this.awaitingResponse = 'nutricion';
    } else if (
      userMensaje.includes('suscripción') ||
      userMensaje.includes('membresía')
    ) {
      reply = 'La suscripción mensual cuesta $50.';
    }
  }
}
