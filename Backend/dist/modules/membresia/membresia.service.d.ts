import { MembresiaRepository } from './membresia.repository';
import { MembresiaDto } from 'src/dtos/createMembresia.dto';
export declare class membresiaService {
    private readonly membresiaRepository;
    constructor(membresiaRepository: MembresiaRepository);
    getMembresias(): Promise<import("./membresia.entity").Membresia[]>;
    seederData(): Promise<void>;
    createMembresia(membresiaDto: MembresiaDto): Promise<import("./membresia.entity").Membresia>;
}
