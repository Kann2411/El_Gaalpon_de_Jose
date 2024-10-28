"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TrainingModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const training_controller_1 = require("./training.controller");
const training_service_1 = require("./training.service");
const training_repository_1 = require("./training.repository");
const training_entity_1 = require("./training.entity");
const trainingPlan_controller_1 = require("./trainingPlan.controller");
const trainingPlan_service_1 = require("./trainingPlan.service");
const trainingPlan_repository_1 = require("./trainingPlan.repository");
const trainingPlan_entity_1 = require("./trainingPlan.entity");
let TrainingModule = class TrainingModule {
};
exports.TrainingModule = TrainingModule;
exports.TrainingModule = TrainingModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([training_entity_1.Training, trainingPlan_entity_1.TrainingPlan])],
        controllers: [training_controller_1.TrainingController, trainingPlan_controller_1.TrainingPlanController],
        providers: [
            training_service_1.TrainingService,
            training_repository_1.TrainingRepository,
            trainingPlan_service_1.TrainingPlanService,
            trainingPlan_repository_1.TrainingPlanRepository,
        ],
    })
], TrainingModule);
//# sourceMappingURL=training.module.js.map