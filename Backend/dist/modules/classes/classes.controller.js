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
exports.ClassesController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const classes_entity_1 = require("./classes.entity");
const classes_service_1 = require("./classes.service");
const swagger_1 = require("@nestjs/swagger");
const createClass_dto_1 = require("../../dtos/createClass.dto");
let ClassesController = class ClassesController {
    constructor(classesService) {
        this.classesService = classesService;
    }
    getClasses() {
        return this.classesService.getClasses();
    }
    getClassesSeeder() {
        return this.classesService.classesSeeder();
    }
    getClassById(id) {
        return this.classesService.getClassById(id);
    }
    createClass(classData) {
        return this.classesService.createClass(classData);
    }
    updateClass(id, classData) {
        return this.classesService.updateClass(id, classData);
    }
    deleteClass(id) {
        return this.classesService.deleteClass(id);
    }
};
exports.ClassesController = ClassesController;
__decorate([
    (0, common_1.Get)(),
    openapi.ApiResponse({ status: 200, type: [require("./classes.entity").Class] }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ClassesController.prototype, "getClasses", null);
__decorate([
    (0, common_1.Get)('seeder'),
    openapi.ApiResponse({ status: 200 }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ClassesController.prototype, "getClassesSeeder", null);
__decorate([
    (0, common_1.Get)(':id'),
    openapi.ApiResponse({ status: 200, type: require("./classes.entity").Class }),
    __param(0, (0, common_1.Param)(common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ClassesController.prototype, "getClassById", null);
__decorate([
    (0, common_1.Post)(),
    openapi.ApiResponse({ status: 201, type: require("./classes.entity").Class }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [createClass_dto_1.CreateClassDto]),
    __metadata("design:returntype", void 0)
], ClassesController.prototype, "createClass", null);
__decorate([
    (0, common_1.Put)(),
    openapi.ApiResponse({ status: 200, type: require("./classes.entity").Class }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, classes_entity_1.Class]),
    __metadata("design:returntype", void 0)
], ClassesController.prototype, "updateClass", null);
__decorate([
    (0, common_1.Delete)(),
    openapi.ApiResponse({ status: 200, type: String }),
    __param(0, (0, common_1.Param)(common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ClassesController.prototype, "deleteClass", null);
exports.ClassesController = ClassesController = __decorate([
    (0, swagger_1.ApiTags)('Class'),
    (0, common_1.Controller)('class'),
    __metadata("design:paramtypes", [classes_service_1.ClassService])
], ClassesController);
//# sourceMappingURL=classes.controller.js.map