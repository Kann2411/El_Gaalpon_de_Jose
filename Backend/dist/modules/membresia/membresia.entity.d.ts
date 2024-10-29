import { EstadoMembresia } from 'src/enums/estadoMembresia.enum';
export declare class Membresia {
    id: string;
    plan: string;
    price: number;
    currency: string;
    description: string;
    benefits: string[];
    idealFor: string;
    startDate?: Date;
    endDate?: Date;
    status?: EstadoMembresia;
}
