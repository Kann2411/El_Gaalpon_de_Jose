import { EstadoPago } from 'src/enums/estadoPago.enum';
import { MetodoPago } from 'src/enums/metodoPago.enum';
export declare class Pago {
    id: string;
    monto: number;
    preferenceId: string;
    userId: string;
    metodoPago: MetodoPago;
    fecha: Date;
    estado: EstadoPago;
    moneda: string;
}
