import { EstadoMembresia } from 'src/enums/estadoMembresia.enum';
export declare class MembresiaDto {
    plan: string;
    price: number;
    currency: string;
    description: string;
    benefits: string[];
    idealFor: string;
    startDate?: Date;
    endDate?: Date;
    status: EstadoMembresia;
}
