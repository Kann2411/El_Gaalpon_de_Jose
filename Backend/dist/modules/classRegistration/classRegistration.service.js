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
exports.ClassRegistrationService = void 0;
const common_1 = require("@nestjs/common");
const classRegistration_repository_1 = require("./classRegistration.repository");
let ClassRegistrationService = class ClassRegistrationService {
    constructor(classRepository) {
        this.classRepository = classRepository;
    }
    getRegistrationUser(classId) {
        return this.classRepository.getRegistrationUser(classId);
    }
    getClassesForUser(userId) {
        return this.classRepository.getClassesForUser(userId);
    }
    registerUserToClass(classId, userId) {
        return this.classRepository.registerUserToClass(classId, userId);
    }
    deleteRegisterUserFromClass(classId, userId) {
        return this.classRepository.deleteRegisterUserFromClass(classId, userId);
    }
};
exports.ClassRegistrationService = ClassRegistrationService;
exports.ClassRegistrationService = ClassRegistrationService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [classRegistration_repository_1.classRegistrationRepository])
], ClassRegistrationService);
//# sourceMappingURL=classRegistration.service.js.map