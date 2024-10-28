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
exports.HorarioController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const horario_entity_1 = require("./horario.entity");
const horario_service_1 = require("./horario.service");
const swagger_1 = require("@nestjs/swagger");
let HorarioController = class HorarioController {
    constructor(horarioService) {
        this.horarioService = horarioService;
    }
    getHorario() {
        return this.horarioService.getHorarios();
    }
    horariosSeeder() {
        return this.horarioService.horariosSeeder();
    }
    getHorarioById(id) {
        return this.horarioService.getHorarioById(id);
    }
    createHorario(horarioData) {
        return this.horarioService.createHorario(horarioData);
    }
    updateHorario(id, horarioData) {
        return this.horarioService.updateHorario(id, horarioData);
    }
    deleteClass(id) {
        return this.horarioService.deleteHorario(id);
    }
};
exports.HorarioController = HorarioController;
__decorate([
    (0, common_1.Get)(),
    openapi.ApiResponse({ status: 200, type: [require("./horario.entity").Horario] }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], HorarioController.prototype, "getHorario", null);
__decorate([
    (0, common_1.Get)('seeder'),
    openapi.ApiResponse({ status: 200 }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], HorarioController.prototype, "horariosSeeder", null);
__decorate([
    (0, common_1.Get)(':id'),
    openapi.ApiResponse({ status: 200, type: require("./horario.entity").Horario }),
    __param(0, (0, common_1.Param)(common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], HorarioController.prototype, "getHorarioById", null);
__decorate([
    (0, common_1.Post)(),
    openapi.ApiResponse({ status: 201, type: require("./horario.entity").Horario }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [horario_entity_1.Horario]),
    __metadata("design:returntype", void 0)
], HorarioController.prototype, "createHorario", null);
__decorate([
    (0, common_1.Put)(),
    openapi.ApiResponse({ status: 200, type: require("./horario.entity").Horario }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, horario_entity_1.Horario]),
    __metadata("design:returntype", void 0)
], HorarioController.prototype, "updateHorario", null);
__decorate([
    (0, common_1.Delete)(),
    openapi.ApiResponse({ status: 200, type: Boolean }),
    __param(0, (0, common_1.Param)(common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], HorarioController.prototype, "deleteClass", null);
exports.HorarioController = HorarioController = __decorate([
    (0, swagger_1.ApiTags)('Horario'),
    (0, common_1.Controller)('horario'),
    __metadata("design:paramtypes", [horario_service_1.HorarioService])
], HorarioController);
//# sourceMappingURL=horario.controller.js.map