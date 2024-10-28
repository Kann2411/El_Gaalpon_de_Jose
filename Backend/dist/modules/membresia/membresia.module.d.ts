import { MembresiaRepository } from './membresia.repository';
export declare class MembresiaModule {
    private readonly membresiaRepository;
    constructor(membresiaRepository: MembresiaRepository);
    onModuleInit(): Promise<void>;
}
