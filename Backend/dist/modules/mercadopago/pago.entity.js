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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Pago = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const estadoPago_enum_1 = require("../../enums/estadoPago.enum");
const metodoPago_enum_1 = require("../../enums/metodoPago.enum");
const typeorm_1 = require("typeorm");
let Pago = class Pago {
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => String }, monto: { required: true, type: () => Number }, preferenceId: { required: true, type: () => String }, userId: { required: true, type: () => String }, metodoPago: { required: true, enum: require("../../enums/metodoPago.enum").MetodoPago }, fecha: { required: true, type: () => Date }, estado: { required: true, enum: require("../../enums/estadoPago.enum").EstadoPago }, moneda: { required: true, type: () => String } };
    }
};
exports.Pago = Pago;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Identificador único del Pago',
        type: 'string',
        format: 'uuid',
    }),
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Pago.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Monto del Pago',
        type: 'float',
        minimum: 1000,
    }),
    (0, typeorm_1.Column)({
        type: 'float',
        nullable: false,
    }),
    __metadata("design:type", Number)
], Pago.prototype, "monto", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'ID de la preferencia de pago en MercadoPago',
        type: 'string',
    }),
    (0, typeorm_1.Column)({
        type: 'varchar',
        nullable: true,
    }),
    __metadata("design:type", String)
], Pago.prototype, "preferenceId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'ID del usuario que realiza el pago',
        type: 'string',
        format: 'uuid',
    }),
    (0, typeorm_1.Column)({
        type: 'varchar',
        nullable: false,
    }),
    __metadata("design:type", String)
], Pago.prototype, "userId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Método de pago utilizado',
        enum: metodoPago_enum_1.MetodoPago,
    }),
    (0, typeorm_1.Column)({
        default: metodoPago_enum_1.MetodoPago.MERCADOPAGO,
    }),
    __metadata("design:type", String)
], Pago.prototype, "metodoPago", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Fecha en que se realizó el pago',
        type: 'date',
    }),
    (0, typeorm_1.Column)({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP',
    }),
    __metadata("design:type", Date)
], Pago.prototype, "fecha", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Estado actual del pago',
        enum: estadoPago_enum_1.EstadoPago,
    }),
    (0, typeorm_1.Column)({
        default: estadoPago_enum_1.EstadoPago.PENDIENTE,
    }),
    __metadata("design:type", String)
], Pago.prototype, "estado", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Moneda utilizada para el pago',
        type: 'string',
    }),
    (0, typeorm_1.Column)({
        type: 'varchar',
        nullable: false,
    }),
    __metadata("design:type", String)
], Pago.prototype, "moneda", void 0);
exports.Pago = Pago = __decorate([
    (0, typeorm_1.Entity)({
        name: 'Pagos',
    })
], Pago);
//# sourceMappingURL=pago.entity.js.map