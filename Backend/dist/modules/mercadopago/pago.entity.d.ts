import { EstadoPago } from 'src/enums/estadoPago.enum';
import { MetodoPago } from 'src/enums/metodoPago.enum';
export declare class Pago {
    id: string;
    monto: number;
    metodoPago: MetodoPago;
    fecha: Date;
    estado: EstadoPago;
    usuarioId: string;
    preferenceId: string;
}
