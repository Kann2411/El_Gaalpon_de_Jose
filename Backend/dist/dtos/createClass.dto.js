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
exports.CreateClassDto = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const estadoClase_enum_1 = require("../enums/estadoClase.enum");
class CreateClassDto {
    constructor() {
        this.image = 'defaultImage.webp';
    }
    static _OPENAPI_METADATA_FACTORY() {
        return { name: { required: true, type: () => String }, intensity: { required: true, type: () => String }, capacity: { required: true, type: () => Number, minimum: 0, maximum: 20 }, status: { required: true, enum: require("../enums/estadoClase.enum").EstadoClase }, image: { required: true, type: () => String, default: "defaultImage.webp" }, description: { required: true, type: () => String }, duration: { required: true, type: () => String }, day: { required: true, type: () => String }, starttime: { required: true, type: () => String, pattern: "/^\\d{2}:\\d{2}$/" }, endtime: { required: true, type: () => String, pattern: "/^\\d{2}:\\d{2}$/" } };
    }
}
exports.CreateClassDto = CreateClassDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Nombre de la clase', example: 'Yoga' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateClassDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Intensidad de la clase', example: 'Alta' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateClassDto.prototype, "intensity", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Capacidad máxima de la clase', example: 20 }),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.Max)(20),
    __metadata("design:type", Number)
], CreateClassDto.prototype, "capacity", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Estado actual de la clase', enum: estadoClase_enum_1.EstadoClase }),
    (0, class_validator_1.IsEnum)(estadoClase_enum_1.EstadoClase),
    __metadata("design:type", String)
], CreateClassDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Imagen de la clase',
        example: 'yogaClass.jpg',
        default: 'defaultImage.webp',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateClassDto.prototype, "image", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Descripción de la clase',
        example: 'Clase de yoga avanzada.',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateClassDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Duración de la clase en minutos',
        example: '60',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateClassDto.prototype, "duration", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Día de la clase', example: 'Lunes' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateClassDto.prototype, "day", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Hora de inicio de la clase',
        example: '08:00',
    }),
    (0, class_validator_1.Matches)(/^\d{2}:\d{2}$/, { message: 'starttime must be in HH:mm format' }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateClassDto.prototype, "starttime", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Hora de finalización de la clase',
        example: '09:00',
    }),
    (0, class_validator_1.Matches)(/^\d{2}:\d{2}$/, { message: 'endtime must be in HH:mm format' }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateClassDto.prototype, "endtime", void 0);
//# sourceMappingURL=createClass.dto.js.map