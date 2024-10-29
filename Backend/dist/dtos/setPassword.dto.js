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
exports.SetPasswordDto = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class SetPasswordDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { newPassword: { required: true, type: () => String, pattern: "/^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!@#$%^&*]).{8,15}$/" }, confirmPassword: { required: true, type: () => String } };
    }
}
exports.SetPasswordDto = SetPasswordDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Nueva contraseña del usuario',
        type: 'string',
        example: 'NewPassw0rd!',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Matches)(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,15}$/, {
        message: 'La nueva contraseña debe tener entre 8 y 15 caracteres, al menos una letra minúscula, una letra mayúscula, un número y un carácter especial (!@#$%^&*).',
    }),
    __metadata("design:type", String)
], SetPasswordDto.prototype, "newPassword", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Confirmación de la nueva contraseña',
        type: 'string',
        example: 'NewPassw0rd!',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)({
        message: 'La confirmación de la nueva contraseña es requerida.',
    }),
    __metadata("design:type", String)
], SetPasswordDto.prototype, "confirmPassword", void 0);
//# sourceMappingURL=setPassword.dto.js.map