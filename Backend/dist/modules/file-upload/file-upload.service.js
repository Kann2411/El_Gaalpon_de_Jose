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
exports.FileService = void 0;
const common_1 = require("@nestjs/common");
const file_upload_repository_1 = require("./file-upload.repository");
const typeorm_1 = require("@nestjs/typeorm");
const trainingPlan_entity_1 = require("../training/trainingPlan.entity");
const typeorm_2 = require("typeorm");
const users_entity_1 = require("../users/users.entity");
let FileService = class FileService {
    constructor(fileRepository, trainingPlanRepository, userRepository) {
        this.fileRepository = fileRepository;
        this.trainingPlanRepository = trainingPlanRepository;
        this.userRepository = userRepository;
    }
    async uploadImgProfile(userid, file) {
        const user = await this.userRepository.findOneBy({ id: userid });
        if (!user) {
            throw new common_1.NotFoundException(`User ${userid} not found`);
        }
        const uploadImage = await this.fileRepository.uploadImage(file);
        await this.userRepository.update(userid, {
            imgUrl: uploadImage.secure_url,
        });
        const findUser = await this.userRepository.findOneBy({ id: userid });
        return findUser;
    }
    async updateClassImage(trainingId, file) {
        const training = await this.trainingPlanRepository.findOneBy({
            id: trainingId,
        });
        if (!training) {
            throw new common_1.NotFoundException(`Training ${trainingId} not found`);
        }
        const uploadImage = await this.fileRepository.uploadImage(file);
        await this.trainingPlanRepository.update(trainingId, {
            file: uploadImage.secure_url,
        });
        const findUpdateImage = await this.trainingPlanRepository.findOneBy({
            id: trainingId,
        });
        return findUpdateImage;
    }
};
exports.FileService = FileService;
exports.FileService = FileService = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, typeorm_1.InjectRepository)(trainingPlan_entity_1.TrainingPlan)),
    __param(2, (0, typeorm_1.InjectRepository)(users_entity_1.User)),
    __metadata("design:paramtypes", [file_upload_repository_1.FileRepository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], FileService);
//# sourceMappingURL=file-upload.service.js.map