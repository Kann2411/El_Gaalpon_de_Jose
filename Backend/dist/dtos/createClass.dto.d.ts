import { EstadoClase } from 'src/enums/estadoClase.enum';
export declare class CreateClassDto {
    name: string;
    intensity: string;
    capacity: number;
    status: EstadoClase;
    image: string;
    description: string;
    duration: string;
    day: string;
    starttime: string;
    endtime: string;
}
