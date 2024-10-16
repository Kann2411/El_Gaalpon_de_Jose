import { Injectable } from "@nestjs/common";
import { UUID } from "crypto";
import { Horario } from "./horario.entity";
import { HorarioRepository } from "./horario.repository";

@Injectable()
export class HorarioService{
    constructor(private readonly horarioesRepository: HorarioRepository){}

    async getHorarios(){
        try {
            return await this.horarioesRepository.getHorarios();

        } catch (error) {
            throw error
        }
    }

    async getHorarioById(id: UUID){
        try {
            return await this.horarioesRepository.getHorarioById(id);

        } catch (error) {
            throw error
        }
    }

    async createHorario(horarioData: Horario){
        try {
            return this.horarioesRepository.createHorario(horarioData);
        } catch (error) {
            throw error
        }
    }

    async updateHorario(id: UUID, horarioData: Horario){
        try {
            return this.horarioesRepository.updateHorario(id, horarioData);
        } catch (error) {
            throw error
        }
    }

    async deleteHorario(id: UUID){
        try {
            return this.horarioesRepository.deleteHorario(id);
        } catch (error) {
            throw error
        }
    }
}