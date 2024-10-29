import { membresiaService } from './membresia.service';
import { MembresiaDto } from 'src/dtos/createMembresia.dto';
export declare class MembresiaController {
    private readonly membresiaService;
    constructor(membresiaService: membresiaService);
    getMembresias(): Promise<import("./membresia.entity").Membresia[]>;
    seederData(): Promise<void>;
    createMembresia(membresiaDto: MembresiaDto): Promise<import("./membresia.entity").Membresia>;
}
