"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClassRegistrationModule = void 0;
const common_1 = require("@nestjs/common");
const classRegistration_controller_1 = require("./classRegistration.controller");
const classRegistration_service_1 = require("./classRegistration.service");
const classRegistration_repository_1 = require("./classRegistration.repository");
const typeorm_1 = require("@nestjs/typeorm");
const users_entity_1 = require("../users/users.entity");
const classesRegistration_entity_1 = require("../classes/classesRegistration.entity");
const classes_entity_1 = require("../classes/classes.entity");
let ClassRegistrationModule = class ClassRegistrationModule {
};
exports.ClassRegistrationModule = ClassRegistrationModule;
exports.ClassRegistrationModule = ClassRegistrationModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([users_entity_1.User]),
            typeorm_1.TypeOrmModule.forFeature([classesRegistration_entity_1.ClassRegistration]),
            typeorm_1.TypeOrmModule.forFeature([classes_entity_1.Class]),
        ],
        controllers: [classRegistration_controller_1.ClassRegistrationController],
        providers: [classRegistration_service_1.ClassRegistrationService, classRegistration_repository_1.classRegistrationRepository],
    })
], ClassRegistrationModule);
//# sourceMappingURL=classRegistration.module.js.map