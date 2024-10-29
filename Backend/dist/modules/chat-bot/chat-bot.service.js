"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.chatBotService = void 0;
const common_1 = require("@nestjs/common");
let chatBotService = class chatBotService {
    constructor() {
        this.awaitingResponse = null;
    }
    async getResponse(message) {
        const userMensaje = message.toLowerCase();
        let reply = 'No entiendo lo que quieres decir. ¿Puedes reformular tu pregunta?';
        if (this.awaitingResponse === 'clases') {
            if (userMensaje.includes('sí') || userMensaje.includes('si')) {
                reply = 'Hoy hay clases de yoga a las 6 PM y spinning a las 7 PM.';
            }
            else if (userMensaje.includes('no')) {
                reply = 'Entendido, avísame si necesitas información sobre otra cosa.';
            }
            this.awaitingResponse = null;
            return reply;
        }
        if (this.awaitingResponse === 'rutina') {
            if (userMensaje.includes('piernas')) {
                reply =
                    'Para entrenar piernas, te sugiero hacer sentadillas, lunges, y peso muerto.';
            }
            else if (userMensaje.includes('brazos')) {
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
            }
            else if (userMensaje.includes('no')) {
                reply = 'Entendido, avísame si necesitas algo más.';
            }
            this.awaitingResponse = null;
            return reply;
        }
        if (userMensaje.includes('hola')) {
            reply = 'Hola, ¿en qué puedo ayudarte?';
        }
        else if (userMensaje.includes('clases')) {
            reply =
                'Las clases están disponibles de 6 AM a 9 PM. ¿Te gustaría saber sobre alguna clase en particular?';
            this.awaitingResponse = 'clases';
        }
        else if (userMensaje.includes('entrenador') ||
            userMensaje.includes('entrenadores')) {
            reply =
                'Hoy están disponibles los entrenadores Juan y Marta para sesiones personales.';
        }
        else if (userMensaje.includes('rutina')) {
            reply =
                'Puedo sugerirte una rutina de ejercicios. ¿Qué área te gustaría entrenar hoy? ¿Piernas o brazos?';
            this.awaitingResponse = 'rutina';
        }
        else if (userMensaje.includes('nutrición')) {
            reply =
                'Para antes de entrenar, te recomiendo una comida rica en proteínas y carbohidratos ligeros. ¿Te gustaría sugerencias de comidas?';
            this.awaitingResponse = 'nutricion';
        }
        else if (userMensaje.includes('suscripción') ||
            userMensaje.includes('membresía')) {
            reply = 'La suscripción mensual cuesta $50.';
        }
    }
};
exports.chatBotService = chatBotService;
exports.chatBotService = chatBotService = __decorate([
    (0, common_1.Injectable)()
], chatBotService);
//# sourceMappingURL=chat-bot.service.js.map