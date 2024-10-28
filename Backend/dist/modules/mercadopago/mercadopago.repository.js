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
exports.MercadoPagoRepository = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const mercadopago_1 = require("mercadopago");
const dotenv_1 = require("dotenv");
const pago_entity_1 = require("./pago.entity");
const typeorm_2 = require("typeorm");
(0, dotenv_1.config)({ path: '.env' });
const client = new mercadopago_1.default({ accessToken: process.env.ACCESS_TOKEN });
let MercadoPagoRepository = class MercadoPagoRepository {
    constructor(mercadoPagoRepository) {
        this.mercadoPagoRepository = mercadoPagoRepository;
    }
    async getPaymentStatus(preferenceId) {
        try {
            console.log(typeof preferenceId);
            const response = await new mercadopago_1.Payment(client).get({ id: '123' });
            const status = response.status;
            console.log('Payment status: ', status);
            return { status };
        }
        catch (error) {
            console.log('errorssdsds: ', error);
            return error;
        }
    }
    async createPreference(bodySuscription) {
        console.log(bodySuscription);
        const body = {
            items: [
                {
                    id: '123',
                    title: bodySuscription.title,
                    quantity: Number(bodySuscription.quantity),
                    unit_price: Number(bodySuscription.unit_price),
                    currency_id: 'ARS',
                },
            ],
            payer: {
                email: 'test_user_1072648989@testuser.com',
            },
        };
        try {
            const preference = await new mercadopago_1.Preference(client).create({ body });
            console.log('preference: ', preference);
            console.log(preference.id);
            return { redirectUrl: preference.init_point };
        }
        catch (error) {
            console.log('error: ', error);
            return error;
        }
    }
};
exports.MercadoPagoRepository = MercadoPagoRepository;
exports.MercadoPagoRepository = MercadoPagoRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(pago_entity_1.Pago)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], MercadoPagoRepository);
//# sourceMappingURL=mercadopago.repository.js.map