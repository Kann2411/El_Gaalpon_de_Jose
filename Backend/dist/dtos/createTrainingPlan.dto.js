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
exports.CreateTrainingPlanDto = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class CreateTrainingPlanDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { description: { required: true, type: () => String }, file: { required: false, type: () => String } };
    }
}
exports.CreateTrainingPlanDto = CreateTrainingPlanDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Descripción del plan de entrenamiento',
        type: 'string',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateTrainingPlanDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Archivo del plan de entrenamiento (ruta o nombre)',
        type: 'string',
    }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateTrainingPlanDto.prototype, "file", void 0);
//# sourceMappingURL=createTrainingPlan.dto.js.map