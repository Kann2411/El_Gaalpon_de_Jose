import { Membresia } from './membresia.entity';
import { DataSource, Repository } from 'typeorm';
import { UUID } from 'crypto';
export declare class MembresiaRepository {
    private readonly membresiaRepository;
    private readonly dataSouce;
    constructor(membresiaRepository: Repository<Membresia>, dataSouce: DataSource);
    getMembresias(): Promise<Membresia[]>;
    seederData(): Promise<void>;
    getMembresiaById(id: UUID): Promise<Membresia>;
    createMembresia(membresiaDto: any): Promise<Membresia>;
}
