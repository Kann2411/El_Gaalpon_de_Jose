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
exports.ClassesModule = void 0;
const common_1 = require("@nestjs/common");
const classes_service_1 = require("./classes.service");
const classes_repository_1 = require("./classes.repository");
const classes_controller_1 = require("./classes.controller");
const typeorm_1 = require("@nestjs/typeorm");
const classes_entity_1 = require("./classes.entity");
let ClassesModule = class ClassesModule {
    constructor(classRepository) {
        this.classRepository = classRepository;
    }
    async onModuleInit() {
        console.log('preload Classes');
        await this.classRepository.classesSeeder();
    }
};
exports.ClassesModule = ClassesModule;
exports.ClassesModule = ClassesModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([classes_entity_1.Class])],
        providers: [classes_service_1.ClassService, classes_repository_1.ClassRepository],
        controllers: [classes_controller_1.ClassesController],
    }),
    __metadata("design:paramtypes", [classes_repository_1.ClassRepository])
], ClassesModule);
//# sourceMappingURL=classes.module.js.map