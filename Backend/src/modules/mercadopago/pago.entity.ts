import { EstadoPago } from "src/enums/estadoPago.enum";
import { MetodoPago } from "src/enums/metodoPago.enum";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({
    name: 'Pagos'
})
export class Pago{
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({
        type: 'float',
        nullable: false
    })
    monto: number

    @Column({
        default: MetodoPago.MERCADOPAGO
    })
    metodoPago: MetodoPago

    @Column()
    fecha: Date

    @Column({
        default: EstadoPago.PENDIENTE
    })
    estado: EstadoPago
}