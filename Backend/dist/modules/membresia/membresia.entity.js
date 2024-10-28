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
exports.Membresia = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const estadoMembresia_enum_1 = require("../../enums/estadoMembresia.enum");
const typeorm_1 = require("typeorm");
let Membresia = class Membresia {
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => String }, plan: { required: true, type: () => String }, price: { required: true, type: () => Number }, currency: { required: true, type: () => String }, description: { required: true, type: () => String }, benefits: { required: true, type: () => [String] }, idealFor: { required: true, type: () => String }, startDate: { required: false, type: () => Date }, endDate: { required: false, type: () => Date }, status: { required: false, enum: require("../../enums/estadoMembresia.enum").EstadoMembresia } };
    }
};
exports.Membresia = Membresia;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Identificador único de la membresía',
        type: 'string',
        format: 'uuid',
    }),
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Membresia.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Tipo de membresía' }),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Membresia.prototype, "plan", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Precio de la membresía',
        type: 'number',
    }),
    (0, typeorm_1.Column)({ type: 'decimal' }),
    __metadata("design:type", Number)
], Membresia.prototype, "price", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Moneda de la membresía',
        type: 'string',
    }),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Membresia.prototype, "currency", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Descripción de la membresía',
        type: 'string',
    }),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Membresia.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Beneficios de la membresía',
        type: 'array',
        items: { type: 'string' },
    }),
    (0, typeorm_1.Column)('text', { array: true }),
    __metadata("design:type", Array)
], Membresia.prototype, "benefits", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Ideal para el tipo de persona',
        type: 'string',
    }),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Membresia.prototype, "idealFor", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Fecha de inicio de la membresía',
        type: 'string',
        format: 'date',
    }),
    (0, typeorm_1.Column)({ type: 'date', nullable: true }),
    __metadata("design:type", Date)
], Membresia.prototype, "startDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Fecha de fin de la membresía',
        type: 'string',
        format: 'date',
        nullable: true,
    }),
    (0, typeorm_1.Column)({ type: 'date', nullable: true }),
    __metadata("design:type", Date)
], Membresia.prototype, "endDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Estado de la membresía',
        nullable: true,
        enum: estadoMembresia_enum_1.EstadoMembresia,
    }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Membresia.prototype, "status", void 0);
exports.Membresia = Membresia = __decorate([
    (0, typeorm_1.Entity)({ name: 'membresias' })
], Membresia);
//# sourceMappingURL=membresia.entity.js.map