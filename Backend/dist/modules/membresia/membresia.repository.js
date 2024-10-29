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
exports.MembresiaRepository = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const membresia_entity_1 = require("./membresia.entity");
const typeorm_2 = require("typeorm");
const memberships = require("../../utils/membresias.json");
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)({ path: '.env' });
let MembresiaRepository = class MembresiaRepository {
    constructor(membresiaRepository, dataSouce) {
        this.membresiaRepository = membresiaRepository;
        this.dataSouce = dataSouce;
    }
    async getMembresias() {
        const membresias = await this.membresiaRepository.find();
        return membresias;
    }
    async seederData() {
        const queryRunner = this.dataSouce.createQueryRunner();
        await queryRunner.startTransaction();
        try {
            for (const membershipData of memberships.memberships) {
                const existingMembership = await queryRunner.manager.findOne(membresia_entity_1.Membresia, {
                    where: {
                        plan: membershipData.plan,
                        price: membershipData.price,
                    },
                });
                if (existingMembership) {
                    console.log(`Membresía con plan ${membershipData.plan} ya existe, omitiendo...`);
                    continue;
                }
                const membresia = queryRunner.manager.create(membresia_entity_1.Membresia, {
                    ...membershipData,
                    features: [],
                    plan: membershipData.plan,
                    price: membershipData.price,
                    currency: membershipData.currency,
                    description: membershipData.description,
                    benefits: membershipData.benefits,
                    idealFor: membershipData.idealFor,
                });
                await queryRunner.manager.save(membresia_entity_1.Membresia, membresia);
            }
            await queryRunner.commitTransaction();
        }
        catch (error) {
            await queryRunner.rollbackTransaction();
            console.error('Error during seeding:', error);
            throw error;
        }
        finally {
            await queryRunner.release();
        }
    }
    async getMembresiaById(id) {
        return await this.membresiaRepository.findOne({ where: { id } });
    }
    async createMembresia(membresiaDto) {
        const { plan, price, currency, description, benefits, idealFor } = membresiaDto;
        const membresia = this.membresiaRepository.create({
            plan,
            price,
            currency,
            description,
            benefits,
            idealFor,
        });
        await this.membresiaRepository.save(membresia);
        return await this.membresiaRepository.findOne({
            where: { id: membresia.id },
        });
    }
};
exports.MembresiaRepository = MembresiaRepository;
exports.MembresiaRepository = MembresiaRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(membresia_entity_1.Membresia)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.DataSource])
], MembresiaRepository);
//# sourceMappingURL=membresia.repository.js.map