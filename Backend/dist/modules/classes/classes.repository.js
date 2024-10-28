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
exports.ClassRepository = void 0;
const common_1 = require("@nestjs/common");
const classes_entity_1 = require("./classes.entity");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@nestjs/typeorm");
const clases = require("../../utils/clases.json");
const estadoClase_enum_1 = require("../../enums/estadoClase.enum");
let ClassRepository = class ClassRepository {
    constructor(classesRepository, dataSource) {
        this.classesRepository = classesRepository;
        this.dataSource = dataSource;
    }
    async getClasses() {
        try {
            const classes = await this.classesRepository.find();
            if (!classes) {
                throw new Error('No se encontraron clases.');
            }
            return classes;
        }
        catch (error) {
            throw error;
        }
    }
    async classesSeeder() {
        for (const classItem of clases) {
            const existingClass = await this.classesRepository.findOneBy({ name: classItem.name });
            if (!existingClass) {
                const nuevaClase = new classes_entity_1.Class();
                nuevaClase.name = classItem.name;
                nuevaClase.capacity = classItem.capacity;
                nuevaClase.intensity = classItem.intensity;
                nuevaClase.duration = classItem.duration;
                nuevaClase.image = classItem.image;
                nuevaClase.description = classItem.description;
                nuevaClase.status = estadoClase_enum_1.EstadoClase[classItem.status];
                nuevaClase.day = classItem.day.toLowerCase();
                nuevaClase.starttime = classItem.startTime;
                nuevaClase.endtime = classItem.endTime;
                await this.classesRepository.save(nuevaClase);
            }
        }
        return { message: 'Clases creadas con éxito' };
    }
    async getClassById(id) {
        try {
            const classData = await this.classesRepository.findOneBy({ id });
            if (!classData) {
                throw new Error('No se encontró la clase.');
            }
            return classData;
        }
        catch (error) {
            throw error;
        }
    }
    async createClass(classData) {
        const nuevaClase = new classes_entity_1.Class();
        nuevaClase.name = classData.name;
        nuevaClase.capacity = classData.capacity;
        nuevaClase.status = classData.status;
        nuevaClase.image = classData.image;
        nuevaClase.description = classData.description;
        nuevaClase.duration = classData.duration;
        nuevaClase.intensity = classData.intensity;
        nuevaClase.day = classData.day;
        nuevaClase.starttime = classData.starttime;
        nuevaClase.endtime = classData.endtime;
        await this.classesRepository.save(nuevaClase);
        const savedClass = await this.classesRepository.findOneBy({
            name: nuevaClase.name,
        });
        return savedClass;
    }
    async updateClass(id, classData) {
        return this.dataSource.manager.transaction(async (manager) => {
            try {
                let oldClass = await this.getClassById(id);
                if (!oldClass) {
                    throw new Error('No se encontró la clase.');
                }
                oldClass = {
                    id: oldClass.id,
                    ...classData,
                };
                await manager.save(oldClass);
                return oldClass;
            }
            catch (error) {
                throw error;
            }
        });
    }
    async deleteClass(id) {
        return await this.dataSource.transaction(async (manager) => {
            try {
                const classData = await this.getClassById(id);
                if (!classData) {
                    throw new Error('No se encontró la clase.');
                }
                await manager.remove(classData);
                return 'Clase eliminada exitosamente';
            }
            catch (error) {
                throw error;
            }
        });
    }
};
exports.ClassRepository = ClassRepository;
exports.ClassRepository = ClassRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(classes_entity_1.Class)),
    __param(1, (0, typeorm_2.InjectDataSource)()),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        typeorm_1.DataSource])
], ClassRepository);
//# sourceMappingURL=classes.repository.js.map