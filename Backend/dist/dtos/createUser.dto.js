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
exports.CreateUserDto = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const role_enum_1 = require("../enums/role.enum");
const registrationMethod_1 = require("../enums/registrationMethod");
class CreateUserDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { name: { required: true, type: () => String, minLength: 3, maxLength: 80 }, dni: { required: true, type: () => String, minLength: 3, maxLength: 10 }, email: { required: true, type: () => String }, password: { required: true, type: () => String, pattern: "/^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!@#$%^&*]).{8,15}$/" }, confirmPassword: { required: true, type: () => String }, phone: { required: true, type: () => String }, role: { required: false, enum: require("../enums/role.enum").Role }, registrationMethod: { required: false, enum: require("../enums/registrationMethod").RegistrationMethod }, imgUrl: { required: false, type: () => String } };
    }
}
exports.CreateUserDto = CreateUserDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Nombre del usuario',
        type: 'string',
        minLength: 3,
        maxLength: 80,
        example: 'Juan Cordoba',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'El nombre es requerido.' }),
    (0, class_validator_1.Length)(3, 80, { message: 'El nombre debe tener entre 3 y 80 caracteres.' }),
    __metadata("design:type", String)
], CreateUserDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'DNI del usuario',
        type: 'string',
        minLength: 3,
        maxLength: 10,
        example: '12345678',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'El dni es requerido.' }),
    (0, class_validator_1.Length)(3, 10, { message: 'El DNI debe tener entre 3 y 10 caracteres.' }),
    __metadata("design:type", String)
], CreateUserDto.prototype, "dni", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Correo electrónico del usuario',
        type: 'string',
        example: 'example@gmail.com',
    }),
    (0, class_validator_1.IsEmail)({}, { message: 'El correo debe tener un formato válido.' }),
    __metadata("design:type", String)
], CreateUserDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Contraseña del usuario',
        type: 'string',
        example: 'cOnt12#trase',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Matches)(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,15}$/, {
        message: 'La contraseña debe tener entre 8 y 15 caracteres, al menos una letra minúscula, una letra mayúscula, un número y un carácter especial (!@#$%^&*).',
    }),
    __metadata("design:type", String)
], CreateUserDto.prototype, "password", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Confirmación de la contraseña',
        type: 'string',
        example: 'cOnt12#trase',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'La confirmación de la contraseña es requerida.' }),
    __metadata("design:type", String)
], CreateUserDto.prototype, "confirmPassword", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Número de teléfono del usuario',
        type: 'string',
        example: '123456789',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'El número de teléfono es requerido.' }),
    __metadata("design:type", String)
], CreateUserDto.prototype, "phone", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Rol del usuario en el sistema',
        enum: role_enum_1.Role,
        required: false,
        example: role_enum_1.Role.User,
    }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateUserDto.prototype, "role", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Método de registro del usuario',
        enum: registrationMethod_1.RegistrationMethod,
        required: false,
        example: registrationMethod_1.RegistrationMethod.Form,
    }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateUserDto.prototype, "registrationMethod", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateUserDto.prototype, "imgUrl", void 0);
//# sourceMappingURL=createUser.dto.js.map