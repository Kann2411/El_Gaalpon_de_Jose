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
exports.HorarioRepository = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@nestjs/typeorm");
const horario_entity_1 = require("./horario.entity");
const horarios = require("../../utils/clases.json");
const dia_enum_1 = require("../../enums/dia.enum");
let HorarioRepository = class HorarioRepository {
    constructor(horarioRepository, dataSource) {
        this.horarioRepository = horarioRepository;
        this.dataSource = dataSource;
    }
    async getHorarios() {
        try {
            const horarios = await this.horarioRepository.find();
            if (!horarios) {
                throw new Error('No hay horarios registrados');
            }
            return horarios;
        }
        catch (error) {
            throw error;
        }
    }
    async horariosSeeder() {
        horarios.map(async (element) => {
            await this.horarioRepository
                .createQueryBuilder()
                .insert()
                .into(horario_entity_1.Horario)
                .values({
                day: dia_enum_1.Dia[element.day],
                starttime: element.startTime,
                endtime: element.endTime,
            })
                .orIgnore()
                .execute();
        });
        return { message: 'Horarios creados con exito' };
    }
    async getHorarioById(id) {
        try {
            const horario = await this.horarioRepository.findOne({
                where: { id },
            });
            if (!horario) {
                throw new Error('El horario no existe');
            }
            return horario;
        }
        catch (error) {
            throw error;
        }
    }
    async createHorario(horarioData) {
        return await this.dataSource.manager.transaction(async (manager) => {
            try {
                const newHorario = manager.create(horario_entity_1.Horario, horarioData);
                await manager.save(newHorario);
                return newHorario;
            }
            catch (error) {
                throw error;
            }
        });
    }
    async updateHorario(id, horarioData) {
        return this.dataSource.manager.transaction(async (manager) => {
            try {
                const horarioToUpdate = await manager.findOne(horario_entity_1.Horario, {
                    where: { id },
                });
                if (!horarioToUpdate) {
                    throw new Error('El horario no existe');
                }
                Object.assign(horarioToUpdate, horarioData);
                await manager.save(horarioToUpdate);
                return horarioToUpdate;
            }
            catch (error) {
                throw error;
            }
        });
    }
    async deleteHorario(id) {
        return this.dataSource.manager.transaction(async (manager) => {
            try {
                const horarioToDelete = await manager.findOne(horario_entity_1.Horario, {
                    where: { id },
                });
                if (!horarioToDelete) {
                    throw new Error('El horario no existe');
                }
                await manager.delete(horario_entity_1.Horario, { id });
                return true;
            }
            catch (error) {
                throw error;
            }
        });
    }
};
exports.HorarioRepository = HorarioRepository;
exports.HorarioRepository = HorarioRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(horario_entity_1.Horario)),
    __param(1, (0, typeorm_2.InjectDataSource)()),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        typeorm_1.DataSource])
], HorarioRepository);
//# sourceMappingURL=horario.repository.js.map