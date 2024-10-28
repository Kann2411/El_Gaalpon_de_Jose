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
exports.Training = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
const users_entity_1 = require("../users/users.entity");
let Training = class Training {
    registerProgress(newProgress) {
        this.progress = newProgress;
    }
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => String }, date: { required: true, type: () => String }, duration: { required: true, type: () => String }, progress: { required: true, type: () => String }, user: { required: true, type: () => require("../users/users.entity").User } };
    }
};
exports.Training = Training;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Identificador único del entrenamiento',
        type: 'string',
        format: 'uuid',
    }),
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Training.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Fecha del entrenamiento',
        type: 'string',
    }),
    (0, typeorm_1.Column)({ type: 'varchar' }),
    __metadata("design:type", String)
], Training.prototype, "date", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Duración del entrenamiento en horas',
        type: 'string',
    }),
    (0, typeorm_1.Column)({ type: 'varchar' }),
    __metadata("design:type", String)
], Training.prototype, "duration", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Progreso del entrenamiento' }),
    (0, typeorm_1.Column)({ type: 'varchar', length: 255 }),
    __metadata("design:type", String)
], Training.prototype, "progress", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Usuario asociado al entrenamiento',
        type: () => users_entity_1.User,
    }),
    (0, typeorm_1.ManyToOne)(() => users_entity_1.User, (user) => user.trainings),
    __metadata("design:type", users_entity_1.User)
], Training.prototype, "user", void 0);
exports.Training = Training = __decorate([
    (0, typeorm_1.Entity)('trainings')
], Training);
//# sourceMappingURL=training.entity.js.map