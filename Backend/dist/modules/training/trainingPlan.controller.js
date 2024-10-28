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
exports.TrainingPlanController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const trainingPlan_service_1 = require("./trainingPlan.service");
const createTrainingPlan_dto_1 = require("../../dtos/createTrainingPlan.dto");
const role_enum_1 = require("../../enums/role.enum");
const role_decorator_1 = require("../../decorators/role.decorator");
const auth_guard_1 = require("../../guards/auth.guard");
const swagger_1 = require("@nestjs/swagger");
let TrainingPlanController = class TrainingPlanController {
    constructor(trainingPlanService) {
        this.trainingPlanService = trainingPlanService;
    }
    create(createTrainingPlanDto, req) {
        const coach = req.user;
        return this.trainingPlanService.createTrainingPlan(createTrainingPlanDto, coach);
    }
    getAll() {
        return this.trainingPlanService.getAllTrainingPlans();
    }
    delete(id) {
        return this.trainingPlanService.deleteTrainingPlans(id);
    }
};
exports.TrainingPlanController = TrainingPlanController;
__decorate([
    (0, common_1.Post)(),
    openapi.ApiResponse({ status: 201, type: require("./trainingPlan.entity").TrainingPlan }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [createTrainingPlan_dto_1.CreateTrainingPlanDto, Object]),
    __metadata("design:returntype", void 0)
], TrainingPlanController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    openapi.ApiResponse({ status: 200, type: [require("./trainingPlan.entity").TrainingPlan] }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], TrainingPlanController.prototype, "getAll", null);
__decorate([
    (0, common_1.Delete)(':id'),
    openapi.ApiResponse({ status: 200, type: String }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TrainingPlanController.prototype, "delete", null);
exports.TrainingPlanController = TrainingPlanController = __decorate([
    (0, swagger_1.ApiTags)('TrainingsPlans'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Controller)('training-plans'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, role_decorator_1.Roles)(role_enum_1.Role.Coach),
    __metadata("design:paramtypes", [trainingPlan_service_1.TrainingPlanService])
], TrainingPlanController);
//# sourceMappingURL=trainingPlan.controller.js.map