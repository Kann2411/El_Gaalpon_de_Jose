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
exports.TrainingPlan = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
const users_entity_1 = require("../users/users.entity");
let TrainingPlan = class TrainingPlan {
    constructor() {
        this.file = 'default-image-url';
    }
    downloadPlan() {
    }
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => String }, description: { required: true, type: () => String }, file: { required: true, type: () => String, default: "default-image-url" }, coach: { required: true, type: () => require("../users/users.entity").User } };
    }
};
exports.TrainingPlan = TrainingPlan;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Identificador único del plan de entrenamiento',
        type: 'string',
        format: 'uuid',
    }),
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], TrainingPlan.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Descripción del plan de entrenamiento' }),
    (0, typeorm_1.Column)({ type: 'varchar', length: 255 }),
    __metadata("design:type", String)
], TrainingPlan.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Archivo asociado al plan de entrenamiento',
        type: 'string',
    }),
    (0, typeorm_1.Column)({ type: 'varchar', length: 255 }),
    __metadata("design:type", String)
], TrainingPlan.prototype, "file", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Entrenador asociado al plan de entrenamiento',
        type: () => users_entity_1.User,
    }),
    (0, typeorm_1.ManyToOne)(() => users_entity_1.User, (coach) => coach.trainingPlans),
    __metadata("design:type", users_entity_1.User)
], TrainingPlan.prototype, "coach", void 0);
exports.TrainingPlan = TrainingPlan = __decorate([
    (0, typeorm_1.Entity)('training_plans')
], TrainingPlan);
//# sourceMappingURL=trainingPlan.entity.js.map