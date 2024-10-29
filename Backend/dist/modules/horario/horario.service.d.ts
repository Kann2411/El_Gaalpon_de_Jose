import { UUID } from 'crypto';
import { Horario } from './horario.entity';
import { HorarioRepository } from './horario.repository';
export declare class HorarioService {
    private readonly horarioesRepository;
    constructor(horarioesRepository: HorarioRepository);
    getHorarios(): Promise<Horario[]>;
    horariosSeeder(): Promise<{
        message: string;
    }>;
    getHorarioById(id: UUID): Promise<Horario>;
    createHorario(horarioData: Horario): Promise<Horario>;
    updateHorario(id: UUID, horarioData: Horario): Promise<Horario>;
    deleteHorario(id: UUID): Promise<boolean>;
}
