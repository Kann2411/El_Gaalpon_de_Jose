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
exports.Class = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const estadoClase_enum_1 = require("../../enums/estadoClase.enum");
const typeorm_1 = require("typeorm");
const classesRegistration_entity_1 = require("./classesRegistration.entity");
let Class = class Class {
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => String }, name: { required: true, type: () => String }, intensity: { required: true, type: () => String }, capacity: { required: true, type: () => Number }, status: { required: true, enum: require("../../enums/estadoClase.enum").EstadoClase }, image: { required: true, type: () => String }, description: { required: true, type: () => String }, duration: { required: true, type: () => String }, day: { required: true, type: () => String }, starttime: { required: true, type: () => String }, endtime: { required: true, type: () => String }, registrations: { required: true, type: () => [require("./classesRegistration.entity").ClassRegistration] } };
    }
};
exports.Class = Class;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Identificador único de la clase',
        type: 'string',
        format: 'uuid',
    }),
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Class.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Nombre de la clase' }),
    (0, typeorm_1.Column)({ nullable: false }),
    __metadata("design:type", String)
], Class.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Intensidad de la clase',
    }),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Class.prototype, "intensity", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Capacidad máxima de la clase',
        type: 'integer',
        default: 0,
    }),
    (0, typeorm_1.Column)({ type: 'int', default: 0 }),
    __metadata("design:type", Number)
], Class.prototype, "capacity", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Estado actual de la clase',
        enum: estadoClase_enum_1.EstadoClase,
    }),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Class.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', default: 'defaultImage.webp' }),
    __metadata("design:type", String)
], Class.prototype, "image", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", String)
], Class.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Class.prototype, "duration", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Class.prototype, "day", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'time', default: '00:00:00' }),
    __metadata("design:type", String)
], Class.prototype, "starttime", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'time' }),
    __metadata("design:type", String)
], Class.prototype, "endtime", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => classesRegistration_entity_1.ClassRegistration, (classRegistration) => classRegistration.classEntity),
    __metadata("design:type", Array)
], Class.prototype, "registrations", void 0);
exports.Class = Class = __decorate([
    (0, typeorm_1.Entity)({ name: 'classes' })
], Class);
//# sourceMappingURL=classes.entity.js.map