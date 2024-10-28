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
const estadoPago_enum_1 = require("../../enums/estadoPago.enum");
const metodoPago_enum_1 = require("../../enums/metodoPago.enum");
(0, dotenv_1.config)({ path: '.env' });
const client = new mercadopago_1.default({ accessToken: process.env.ACCESS_TOKEN });
let MercadoPagoRepository = class MercadoPagoRepository {
    constructor(mercadoPagoRepository, dataSource) {
        this.mercadoPagoRepository = mercadoPagoRepository;
        this.dataSource = dataSource;
    }
    async getPaymentStatus(id, userId) {
        try {
            const response = await fetch(`https://api.mercadopago.com/v1/payments/${id}`, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
                }
            });
            if (response.ok) {
                const data = await response.json();
                const pago = await this.mercadoPagoRepository.findOne({
                    where: { preferenceId: data.id },
                });
                const newPago = {
                    estado: estadoPago_enum_1.EstadoPago.COMPLETADO,
                    fecha: data.date_approved,
                    metodoPago: metodoPago_enum_1.MetodoPago.MERCADOPAGO,
                    preferenceId: data.id,
                    userId: userId,
                    moneda: data.currency_id,
                    monto: data.transaction_details.total_paid_amount,
                };
                return this.dataSource.manager.transaction(async (manager) => {
                    const pagoData = manager.create(pago_entity_1.Pago, newPago);
                    const result = await manager.save(pago_entity_1.Pago, pago);
                    return "Pago successfully" + result;
                });
            }
        }
        catch (error) {
            console.log('errorssdsds: ', error);
            return error;
        }
    }
    async createPreference(bodySuscription) {
        bodySuscription.userId = "userId";
        console.log(bodySuscription);
        const body = {
            items: [
                {
                    id: bodySuscription.id,
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
            const pago = this.mercadoPagoRepository.create({
                preferenceId: preference.id,
                userId: bodySuscription.userId,
                estado: estadoPago_enum_1.EstadoPago.PENDIENTE,
                monto: body.items[0].quantity,
                moneda: 'USD',
                fecha: new Date(),
                metodoPago: metodoPago_enum_1.MetodoPago.MERCADOPAGO,
            });
            await this.mercadoPagoRepository.save(pago);
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
    __param(1, (0, typeorm_1.InjectDataSource)()),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.DataSource])
], MercadoPagoRepository);
//# sourceMappingURL=mercadopago.repository.js.map