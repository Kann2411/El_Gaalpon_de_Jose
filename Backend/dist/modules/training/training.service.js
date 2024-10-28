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
exports.TrainingService = void 0;
const common_1 = require("@nestjs/common");
const training_repository_1 = require("./training.repository");
let TrainingService = class TrainingService {
    constructor(trainingRepository) {
        this.trainingRepository = trainingRepository;
    }
    async createTraining(createTrainingDto, user) {
        return await this.trainingRepository.createTraining(createTrainingDto, user);
    }
    async getUserTrainings(userId) {
        return await this.trainingRepository.getTrainingsByUser(userId);
    }
};
exports.TrainingService = TrainingService;
exports.TrainingService = TrainingService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [training_repository_1.TrainingRepository])
], TrainingService);
//# sourceMappingURL=training.service.js.map