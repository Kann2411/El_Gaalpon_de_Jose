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
exports.TrainingPlanRepository = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const trainingPlan_entity_1 = require("./trainingPlan.entity");
const typeorm_2 = require("typeorm");
let TrainingPlanRepository = class TrainingPlanRepository {
    constructor(trainingPlanRepository) {
        this.trainingPlanRepository = trainingPlanRepository;
    }
    async createTrainingPlan(planDto, coach) {
        const trainingPlan = this.trainingPlanRepository.create({
            ...planDto,
            coach,
        });
        try {
            await this.trainingPlanRepository.save(trainingPlan);
            return trainingPlan;
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('Error al crear el plan de entrenamiento');
        }
    }
    async getAllTrainingPlans() {
        return await this.trainingPlanRepository.find({ relations: ['coach'] });
    }
    async deleteTrainingPlans(id) {
        try {
            const result = await this.trainingPlanRepository.delete(id);
            if (result.affected === 0) {
                throw new common_1.NotFoundException(`Plan de entrenamiento con id ${id} no existe`);
            }
            return `Plan de entrenamiento eliminado con id: ${id}`;
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException) {
                throw error;
            }
            throw new common_1.InternalServerErrorException('Error al eliminar el plan de entrenamiento');
        }
    }
};
exports.TrainingPlanRepository = TrainingPlanRepository;
exports.TrainingPlanRepository = TrainingPlanRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(trainingPlan_entity_1.TrainingPlan)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], TrainingPlanRepository);
//# sourceMappingURL=trainingPlan.repository.js.map