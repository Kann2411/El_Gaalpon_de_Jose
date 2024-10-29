import { UUID } from 'crypto';
import { DataSource, Repository } from 'typeorm';
import { Horario } from './horario.entity';
export declare class HorarioRepository {
    private readonly horarioRepository;
    private dataSource;
    constructor(horarioRepository: Repository<Horario>, dataSource: DataSource);
    getHorarios(): Promise<Horario[]>;
    horariosSeeder(): Promise<{
        message: string;
    }>;
    getHorarioById(id: UUID): Promise<Horario>;
    createHorario(horarioData: Horario): Promise<Horario>;
    updateHorario(id: UUID, horarioData: Horario): Promise<Horario>;
    deleteHorario(id: UUID): Promise<boolean>;
}
