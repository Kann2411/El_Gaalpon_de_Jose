import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Post, Put } from "@nestjs/common";
import { membresiaService } from "./membresia.service";
import { UUID } from "crypto";
import { Membresia } from "./membresia.entity";

@Controller('membresia')
export class MembresiaController{
    constructor(
        private readonly membresiaService: membresiaService,
    ){}

    @Get()
    async getMembresias(){
        return await this.membresiaService.getMembresias()
    }

    @Get(':id')
    async getMembresiaById(@Param('id', ParseUUIDPipe) id: UUID){
        return await this.membresiaService.getMembresiaById(id)
    }


    @Post()
    async createMembresia(@Body() membresia: Membresia){
        return await this.membresiaService.createMembresia(membresia)
    }

    @Put()
    async updateMembresia(@Param('id', ParseUUIDPipe) id: UUID, @Body() membresia: Membresia){
        await this.membresiaService.updateMembresia(id, membresia)
    }

    @Delete()
    async deleteMembresia(@Param('id', ParseUUIDPipe) id: UUID){
        await this.membresiaService.deleteMembresia(id)
    }
}
