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
exports.User = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
const role_enum_1 = require("../../enums/role.enum");
const training_entity_1 = require("../training/training.entity");
const trainingPlan_entity_1 = require("../training/trainingPlan.entity");
const registrationMethod_1 = require("../../enums/registrationMethod");
const classesRegistration_entity_1 = require("../classes/classesRegistration.entity");
let User = class User {
    constructor() {
        this.imgUrl = 'https://res.cloudinary.com/dgg9abj0i/image/upload/v1730043484/znl4jfzwva8qnueryxet.png';
    }
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => String }, name: { required: true, type: () => String }, dni: { required: true, type: () => String }, email: { required: true, type: () => String }, password: { required: true, type: () => String }, phone: { required: true, type: () => String }, imgUrl: { required: true, type: () => String, default: "https://res.cloudinary.com/dgg9abj0i/image/upload/v1730043484/znl4jfzwva8qnueryxet.png" }, role: { required: true, enum: require("../../enums/role.enum").Role }, registrationMethod: { required: true, enum: require("../../enums/registrationMethod").RegistrationMethod }, isBanned: { required: true, type: () => Boolean }, trainings: { required: true, type: () => [require("../training/training.entity").Training] }, trainingPlans: { required: true, type: () => [require("../training/trainingPlan.entity").TrainingPlan] }, registrations: { required: true, type: () => [require("../classes/classesRegistration.entity").ClassRegistration] } };
    }
};
exports.User = User;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Identificador único del usuario',
        type: 'string',
        format: 'uuid',
    }),
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], User.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Nombre completo del usuario',
        type: 'string',
        maxLength: 50,
    }),
    (0, typeorm_1.Column)({ type: 'varchar', length: 50 }),
    __metadata("design:type", String)
], User.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Número de identificación del usuario (DNI)',
        type: 'string',
        maxLength: 10,
    }),
    (0, typeorm_1.Column)({ type: 'varchar', length: 10 }),
    __metadata("design:type", String)
], User.prototype, "dni", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Correo electrónico del usuario',
        type: 'string',
        maxLength: 50,
        uniqueItems: true,
    }),
    (0, typeorm_1.Column)({ type: 'varchar', length: 50, unique: true }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Contraseña del usuario',
        type: 'string',
        maxLength: 128,
    }),
    (0, typeorm_1.Column)({ type: 'varchar', length: 128 }),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Número de teléfono del usuario (opcional)',
        type: 'string',
        nullable: true,
    }),
    (0, typeorm_1.Column)({ type: 'varchar', nullable: true }),
    __metadata("design:type", String)
], User.prototype, "phone", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'URL de la imagen de perfil del usuario',
        type: 'string',
        nullable: true,
        default: 'default-image-url',
    }),
    (0, typeorm_1.Column)({ type: 'varchar', nullable: true }),
    __metadata("design:type", String)
], User.prototype, "imgUrl", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Rol del usuario en el sistema',
        enum: role_enum_1.Role,
        default: role_enum_1.Role.User,
    }),
    (0, typeorm_1.Column)({ type: 'enum', enum: role_enum_1.Role, default: role_enum_1.Role.User }),
    __metadata("design:type", String)
], User.prototype, "role", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Método de registro del usuario',
        enum: registrationMethod_1.RegistrationMethod,
        default: registrationMethod_1.RegistrationMethod.Form,
    }),
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: registrationMethod_1.RegistrationMethod,
        default: registrationMethod_1.RegistrationMethod.Form,
    }),
    __metadata("design:type", String)
], User.prototype, "registrationMethod", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Indica si el usuario está baneado',
        default: false,
    }),
    (0, typeorm_1.Column)({ type: 'boolean', default: false }),
    __metadata("design:type", Boolean)
], User.prototype, "isBanned", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Entrenamientos asociados al usuario',
        type: () => [training_entity_1.Training],
    }),
    (0, typeorm_1.OneToMany)(() => training_entity_1.Training, (training) => training.user),
    __metadata("design:type", Array)
], User.prototype, "trainings", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Planes de entrenamiento creados por el usuario (como entrenador)',
        type: () => [trainingPlan_entity_1.TrainingPlan],
    }),
    (0, typeorm_1.OneToMany)(() => trainingPlan_entity_1.TrainingPlan, (trainingPlan) => trainingPlan.coach),
    __metadata("design:type", Array)
], User.prototype, "trainingPlans", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => classesRegistration_entity_1.ClassRegistration, (classRegistration) => classRegistration.user),
    __metadata("design:type", Array)
], User.prototype, "registrations", void 0);
exports.User = User = __decorate([
    (0, typeorm_1.Entity)('users')
], User);
//# sourceMappingURL=users.entity.js.map