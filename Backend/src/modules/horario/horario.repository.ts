import { Injectable } from "@nestjs/common";
import { UUID } from "crypto";
import { DataSource, Repository } from "typeorm";
import { InjectDataSource, InjectRepository } from "@nestjs/typeorm";
import { Horario } from "./horario.entity";

@Injectable()
export class HorarioRepository{
    constructor(
        @InjectRepository(Horario) private readonly horarioRepository: Repository<Horario>,
        @InjectDataSource() private dataSource: DataSource,
    ){}

    async getHorarios(){
        try {
            const horarios = await this.horarioRepository.find();
            if(!horarios){
                throw new Error('No hay horarios registrados');
            }
            return horarios
        } catch (error) {
            throw error
        }
    }

    async getHorarioById(id: UUID){
        try {
            const horario = await this.horarioRepository.findOne({
                where: {id},
            })
            if(!horario){
                throw new Error('El horario no existe');
            }
            return horario
        } catch (error) {
            throw error
        }
    }

    async createHorario(horarioData: Horario){
        return await this.dataSource.manager.transaction(async (manager) => {
            try {
                const newHorario = manager.create(Horario, horarioData)
                await manager.save(newHorario)
                return newHorario
            } catch (error) {
                throw error
            }
        })
    }

    async updateHorario(id: UUID, horarioData: Horario){
        return this.dataSource.manager.transaction(async (manager) => {
            try {
                const horarioToUpdate = await manager.findOne(Horario, {where: {id}})
                if(!horarioToUpdate){
                    throw new Error('El horario no existe');
                }
                Object.assign(horarioToUpdate, horarioData);
                await manager.save(horarioToUpdate)
                return horarioToUpdate
            } catch (error) {
                throw error
            }
        })
    }

    async deleteHorario(id: UUID){
        return this.dataSource.manager.transaction(async (manager) => {
            try {
                const horarioToDelete = await manager.findOne(Horario, {where: {id}})
                if(!horarioToDelete){
                    throw new Error('El horario no existe');
                }
                await manager.delete(Horario, {id})
                return true
            } catch (error) {
                throw error
            }
        })
    }
}