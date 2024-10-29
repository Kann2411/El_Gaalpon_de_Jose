"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileUploadModule = void 0;
const common_1 = require("@nestjs/common");
const file_upload_controller_1 = require("./file-upload.controller");
const file_upload_service_1 = require("./file-upload.service");
const file_upload_repository_1 = require("./file-upload.repository");
const cludinary_1 = require("../../config/cludinary");
const typeorm_1 = require("@nestjs/typeorm");
const users_entity_1 = require("../users/users.entity");
const users_repository_1 = require("../users/users.repository");
const trainingPlan_entity_1 = require("../training/trainingPlan.entity");
let FileUploadModule = class FileUploadModule {
};
exports.FileUploadModule = FileUploadModule;
exports.FileUploadModule = FileUploadModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([users_entity_1.User, trainingPlan_entity_1.TrainingPlan])],
        controllers: [file_upload_controller_1.FileUploadController],
        providers: [file_upload_service_1.FileService, file_upload_repository_1.FileRepository, cludinary_1.cloudinaryConfig, users_repository_1.UsersRepository],
    })
], FileUploadModule);
//# sourceMappingURL=file-upload.module.js.map