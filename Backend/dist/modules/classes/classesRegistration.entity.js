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
exports.ClassRegistration = void 0;
const openapi = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
const users_entity_1 = require("../users/users.entity");
const classes_entity_1 = require("./classes.entity");
let ClassRegistration = class ClassRegistration {
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => String }, user: { required: true, type: () => require("../users/users.entity").User }, classEntity: { required: true, type: () => require("./classes.entity").Class } };
    }
};
exports.ClassRegistration = ClassRegistration;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], ClassRegistration.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => users_entity_1.User, (user) => user.registrations),
    __metadata("design:type", users_entity_1.User)
], ClassRegistration.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => classes_entity_1.Class, (classEntity) => classEntity.registrations),
    __metadata("design:type", classes_entity_1.Class)
], ClassRegistration.prototype, "classEntity", void 0);
exports.ClassRegistration = ClassRegistration = __decorate([
    (0, typeorm_1.Entity)('class_registrations')
], ClassRegistration);
//# sourceMappingURL=classesRegistration.entity.js.map