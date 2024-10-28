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
exports.HorarioModule = void 0;
const common_1 = require("@nestjs/common");
const horario_controller_1 = require("./horario.controller");
const horario_service_1 = require("./horario.service");
const horario_repository_1 = require("./horario.repository");
const typeorm_1 = require("@nestjs/typeorm");
const horario_entity_1 = require("./horario.entity");
let HorarioModule = class HorarioModule {
    constructor(horarioRepository) {
        this.horarioRepository = horarioRepository;
    }
    async onModuleInit() {
        console.log('preload Horarios');
        await this.horarioRepository.horariosSeeder();
    }
};
exports.HorarioModule = HorarioModule;
exports.HorarioModule = HorarioModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([horario_entity_1.Horario])],
        controllers: [horario_controller_1.HorarioController],
        providers: [horario_service_1.HorarioService, horario_repository_1.HorarioRepository],
    }),
    __metadata("design:paramtypes", [horario_repository_1.HorarioRepository])
], HorarioModule);
//# sourceMappingURL=horario.module.js.map