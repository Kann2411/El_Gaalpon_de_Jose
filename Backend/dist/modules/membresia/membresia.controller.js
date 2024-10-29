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
exports.MembresiaController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const membresia_service_1 = require("./membresia.service");
const swagger_1 = require("@nestjs/swagger");
const createMembresia_dto_1 = require("../../dtos/createMembresia.dto");
const role_decorator_1 = require("../../decorators/role.decorator");
const roles_guard_1 = require("../../guards/roles.guard");
const role_enum_1 = require("../../enums/role.enum");
let MembresiaController = class MembresiaController {
    constructor(membresiaService) {
        this.membresiaService = membresiaService;
    }
    getMembresias() {
        return this.membresiaService.getMembresias();
    }
    seederData() {
        return this.membresiaService.seederData();
    }
    createMembresia(membresiaDto) {
        return this.membresiaService.createMembresia(membresiaDto);
    }
};
exports.MembresiaController = MembresiaController;
__decorate([
    (0, common_1.Get)(),
    openapi.ApiResponse({ status: 200, type: [require("./membresia.entity").Membresia] }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], MembresiaController.prototype, "getMembresias", null);
__decorate([
    (0, role_decorator_1.Roles)(role_enum_1.Role.Admin),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, common_1.Get)('seeder'),
    openapi.ApiResponse({ status: 200 }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], MembresiaController.prototype, "seederData", null);
__decorate([
    (0, role_decorator_1.Roles)(role_enum_1.Role.Admin),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, common_1.Post)(),
    openapi.ApiResponse({ status: 201, type: require("./membresia.entity").Membresia }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [createMembresia_dto_1.MembresiaDto]),
    __metadata("design:returntype", void 0)
], MembresiaController.prototype, "createMembresia", null);
exports.MembresiaController = MembresiaController = __decorate([
    (0, swagger_1.ApiTags)('Membresia'),
    (0, common_1.Controller)('membresia'),
    __metadata("design:paramtypes", [membresia_service_1.membresiaService])
], MembresiaController);
//# sourceMappingURL=membresia.controller.js.map