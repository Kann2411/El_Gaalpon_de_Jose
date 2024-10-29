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
exports.HorarioService = void 0;
const common_1 = require("@nestjs/common");
const horario_repository_1 = require("./horario.repository");
let HorarioService = class HorarioService {
    constructor(horarioesRepository) {
        this.horarioesRepository = horarioesRepository;
    }
    getHorarios() {
        return this.horarioesRepository.getHorarios();
    }
    horariosSeeder() {
        return this.horarioesRepository.horariosSeeder();
    }
    getHorarioById(id) {
        return this.horarioesRepository.getHorarioById(id);
    }
    createHorario(horarioData) {
        return this.horarioesRepository.createHorario(horarioData);
    }
    updateHorario(id, horarioData) {
        return this.horarioesRepository.updateHorario(id, horarioData);
    }
    deleteHorario(id) {
        return this.horarioesRepository.deleteHorario(id);
    }
};
exports.HorarioService = HorarioService;
exports.HorarioService = HorarioService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [horario_repository_1.HorarioRepository])
], HorarioService);
//# sourceMappingURL=horario.service.js.map