import { HorarioRepository } from './horario.repository';
export declare class HorarioModule {
    private readonly horarioRepository;
    constructor(horarioRepository: HorarioRepository);
    onModuleInit(): Promise<void>;
}
