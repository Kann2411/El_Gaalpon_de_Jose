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
exports.MembresiaModule = void 0;
const common_1 = require("@nestjs/common");
const membresia_controller_1 = require("./membresia.controller");
const membresia_service_1 = require("./membresia.service");
const membresia_repository_1 = require("./membresia.repository");
const typeorm_1 = require("@nestjs/typeorm");
const membresia_entity_1 = require("./membresia.entity");
let MembresiaModule = class MembresiaModule {
    constructor(membresiaRepository) {
        this.membresiaRepository = membresiaRepository;
    }
    async onModuleInit() {
        console.log('preload Membresias');
        await this.membresiaRepository.seederData();
    }
};
exports.MembresiaModule = MembresiaModule;
exports.MembresiaModule = MembresiaModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([membresia_entity_1.Membresia])],
        controllers: [membresia_controller_1.MembresiaController],
        providers: [membresia_service_1.membresiaService, membresia_repository_1.MembresiaRepository],
    }),
    __metadata("design:paramtypes", [membresia_repository_1.MembresiaRepository])
], MembresiaModule);
//# sourceMappingURL=membresia.module.js.map