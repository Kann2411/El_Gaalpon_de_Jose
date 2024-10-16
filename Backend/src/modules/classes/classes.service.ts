import { Injectable } from "@nestjs/common";
import { UUID } from "crypto";
import { Class } from "./classes.entity";
import { ClassRepository } from "./classes.repository";

@Injectable()
export class ClassService{
    constructor(private readonly classesRepository: ClassRepository){}

    async getClasses(){
        try {
            return await this.classesRepository.getClasses();

        } catch (error) {
            throw error
        }
    }

    async getClassById(id: UUID){
        try {
            return await this.classesRepository.getClassById(id);

        } catch (error) {
            throw error
        }
    }

    async createClass(classData: Class){
        try {
            return this.classesRepository.createClass(classData);
        } catch (error) {
            throw error
        }
    }

    async updateClass(id: UUID, classData: Class){
        try {
            return this.classesRepository.updateClass(id, classData);
        } catch (error) {
            throw error
        }
    }

    async deleteClass(id: UUID){
        try {
            return this.classesRepository.deleteClass(id);
        } catch (error) {
            throw error
        }
    }
}