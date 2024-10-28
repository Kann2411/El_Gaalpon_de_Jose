"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.chatBotController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const chat_bot_service_1 = require("./chat-bot.service");
const swagger_1 = require("@nestjs/swagger");
let chatBotController = class chatBotController {
    constructor(chatBotService) {
        this.chatBotService = chatBotService;
    }
    handleMessage(message) {
        return this.chatBotService.getResponse(message);
    }
};
exports.chatBotController = chatBotController;
__decorate([
    (0, common_1.Post)('message'),
    openapi.ApiResponse({ status: 201, type: String }),
    __param(0, (0, common_1.Body)('message')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], chatBotController.prototype, "handleMessage", null);
exports.chatBotController = chatBotController = __decorate([
    (0, swagger_1.ApiTags)('Chatbot'),
    (0, common_1.Controller)('chatbot'),
    __metadata("design:paramtypes", [chat_bot_service_1.chatBotService])
], chatBotController);
//# sourceMappingURL=chat-bot.controller.js.map