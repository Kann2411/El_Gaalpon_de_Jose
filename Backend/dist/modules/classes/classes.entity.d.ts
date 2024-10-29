import { EstadoClase } from 'src/enums/estadoClase.enum';
import { ClassRegistration } from './classesRegistration.entity';
export declare class Class {
    id: string;
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
    registrations: ClassRegistration[];
}
