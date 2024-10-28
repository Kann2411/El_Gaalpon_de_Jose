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
exports.classRegistrationRepository = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const classes_entity_1 = require("../classes/classes.entity");
const classesRegistration_entity_1 = require("../classes/classesRegistration.entity");
const users_entity_1 = require("../users/users.entity");
let classRegistrationRepository = class classRegistrationRepository {
    constructor(userDBRepository, classesRepository, classRegistrationRepository, dataSource) {
        this.userDBRepository = userDBRepository;
        this.classesRepository = classesRepository;
        this.classRegistrationRepository = classRegistrationRepository;
        this.dataSource = dataSource;
    }
    async getRegistrationUser(classId) {
        const classEntity = await this.classesRepository
            .createQueryBuilder('class')
            .leftJoinAndSelect('class.registrations', 'registration')
            .leftJoinAndSelect('registration.user', 'user')
            .where('class.id = :classId', { classId })
            .getOne();
        if (!classEntity) {
            throw new common_1.NotFoundException('Clase no encontrada');
        }
        return classEntity;
    }
    async getClassesForUser(userId) {
        const userWithClasses = await this.userDBRepository
            .createQueryBuilder('user')
            .leftJoinAndSelect('user.registrations', 'registration')
            .leftJoinAndSelect('registration.classEntity', 'classEntity')
            .where('user.id = :userId', { userId })
            .getOne();
        if (!userWithClasses) {
            throw new common_1.NotFoundException('Usuario no encontrado');
        }
        return userWithClasses.registrations.map((registration) => registration.classEntity);
    }
    async registerUserToClass(classId, userId) {
        const classEntity = await this.classesRepository.findOneBy({ id: classId });
        if (!classEntity) {
            throw new common_1.NotFoundException('La clase no existe');
        }
        const registrations = classEntity.registrations || [];
        if (registrations.length >= classEntity.capacity) {
            throw new common_1.BadRequestException('La clase está llena');
        }
        const user = await this.userDBRepository.findOneBy({ id: userId });
        const registration = this.classRegistrationRepository.create({
            user,
            classEntity,
        });
        await this.classRegistrationRepository.save(registration);
        return {
            message: `${user.name} te has registrado con exito a la clase de ${classEntity.name}`,
        };
    }
    async deleteRegisterUserFromClass(classId, userId) {
        const registration = await this.classRegistrationRepository.findOne({
            where: { user: { id: userId }, classEntity: { id: classId } },
        });
        if (!registration) {
            throw new common_1.NotFoundException('No estas registrado en esta clase');
        }
        await this.classRegistrationRepository.remove(registration);
    }
};
exports.classRegistrationRepository = classRegistrationRepository;
exports.classRegistrationRepository = classRegistrationRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(users_entity_1.User)),
    __param(1, (0, typeorm_1.InjectRepository)(classes_entity_1.Class)),
    __param(2, (0, typeorm_1.InjectRepository)(classesRegistration_entity_1.ClassRegistration)),
    __param(3, (0, typeorm_1.InjectDataSource)()),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.DataSource])
], classRegistrationRepository);
//# sourceMappingURL=classRegistration.repository.js.map