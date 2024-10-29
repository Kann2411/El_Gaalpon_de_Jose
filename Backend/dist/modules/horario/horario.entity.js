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
exports.Horario = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const dia_enum_1 = require("../../enums/dia.enum");
const typeorm_1 = require("typeorm");
let Horario = class Horario {
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => String }, day: { required: true, enum: require("../../enums/dia.enum").Dia }, starttime: { required: true, type: () => Date }, endtime: { required: true, type: () => Date } };
    }
};
exports.Horario = Horario;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Identificador único del horario',
        type: 'string',
        format: 'uuid',
    }),
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Horario.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Día de la semana',
        enum: dia_enum_1.Dia,
    }),
    (0, typeorm_1.Column)({ unique: true }),
    __metadata("design:type", String)
], Horario.prototype, "day", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Hora de inicio del horario',
        type: 'string',
        format: 'time',
        default: '00:00:00',
    }),
    (0, typeorm_1.Column)({ type: 'time', default: '00:00:00' }),
    __metadata("design:type", Date)
], Horario.prototype, "starttime", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Hora de fin del horario',
        type: 'string',
        format: 'time',
    }),
    (0, typeorm_1.Column)({ type: 'time' }),
    __metadata("design:type", Date)
], Horario.prototype, "endtime", void 0);
exports.Horario = Horario = __decorate([
    (0, typeorm_1.Entity)({ name: 'horarios' })
], Horario);
//# sourceMappingURL=horario.entity.js.map