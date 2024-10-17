import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Membresia } from "./membresia.entity";
import { Repository } from "typeorm";
import { UUID } from "crypto";

@Injectable()
export class MembresiaRepository{
    constructor(
        @InjectRepository(Membresia) private readonly membresiaRepository: Repository<Membresia>,
    ){}

    async getMembresias(){
        return await this.membresiaRepository.find()
    }

    async getMembresiaById(id: UUID){
        return await this.membresiaRepository.findOne({where: {id}})
    }

    async createMembresia(membresia: Membresia){
        return await this.membresiaRepository.save(membresia)
    }

    async updateMembresia(id: UUID, membresia: Membresia){
        await this.membresiaRepository.update({id}, membresia)
        return await this.membresiaRepository.findOne({where: {id}})
    }

    async deleteMembresia(id: UUID){
        await this.membresiaRepository.delete({id})
    }
}