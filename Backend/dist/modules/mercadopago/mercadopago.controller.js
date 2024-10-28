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
exports.MercadoPagoController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const mercadopago_service_1 = require("./mercadopago.service");
let MercadoPagoController = class MercadoPagoController {
    constructor(mercadoPagoService) {
        this.mercadoPagoService = mercadoPagoService;
    }
    async getPaymentStatus(id) {
        return this.mercadoPagoService.getPaymentStatus(id);
    }
    async createPreference(bodySuscription) {
        return this.mercadoPagoService.createPreference(bodySuscription);
    }
};
exports.MercadoPagoController = MercadoPagoController;
__decorate([
    (0, common_1.Get)('status'),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, (0, common_1.Query)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], MercadoPagoController.prototype, "getPaymentStatus", null);
__decorate([
    (0, common_1.Post)('create_preference'),
    openapi.ApiResponse({ status: 201, type: Object }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], MercadoPagoController.prototype, "createPreference", null);
exports.MercadoPagoController = MercadoPagoController = __decorate([
    (0, common_1.Controller)('mercadopago'),
    __metadata("design:paramtypes", [mercadopago_service_1.MercadoPagoService])
], MercadoPagoController);
//# sourceMappingURL=mercadopago.controller.js.map