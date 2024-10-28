import { UUID } from 'crypto';
import { Horario } from './horario.entity';
import { HorarioService } from './horario.service';
export declare class HorarioController {
    private readonly horarioService;
    constructor(horarioService: HorarioService);
    getHorario(): Promise<Horario[]>;
    horariosSeeder(): Promise<{
        message: string;
    }>;
    getHorarioById(id: UUID): Promise<Horario>;
    createHorario(horarioData: Horario): Promise<Horario>;
    updateHorario(id: UUID, horarioData: Horario): Promise<Horario>;
    deleteClass(id: UUID): Promise<boolean>;
}
