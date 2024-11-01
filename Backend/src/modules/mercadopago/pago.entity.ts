import { ApiProperty } from '@nestjs/swagger';
import { EstadoPago } from 'src/enums/estadoPago.enum';
import { MetodoPago } from 'src/enums/metodoPago.enum';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../users/users.entity';

@Entity({
  name: 'pagos',
})
export class Pago {
  @ApiProperty({
    description: 'Identificador único del Pago',
    type: 'string',
    format: 'uuid',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    description: 'Monto del Pago',
    type: 'float',
    minimum: 1000,
  })
  @Column({
    type: 'float',
    nullable: false,
  })
  monto: number;

  @ApiProperty({
    description: 'ID de la preferencia de pago en MercadoPago',
    type: 'string',
  })
  @Column({
    type: 'varchar',
    nullable: true,
  })
  preferenceId: string;

  @ApiProperty({
    description: 'Método de pago utilizado',
    enum: MetodoPago,
  })
  @Column({
    default: MetodoPago.MERCADOPAGO,
  })
  metodoPago: MetodoPago;

  @ApiProperty({
    description: 'Fecha en que se realizó el pago',
    type: 'date',
  })
  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  fecha: Date;

  @ApiProperty({
    description: 'Estado actual del pago',
    enum: EstadoPago,
  })
  @Column({
    default: EstadoPago.PENDIENTE,
  })
  estado: EstadoPago;

  @ApiProperty({
    description: 'Moneda utilizada para el pago',
    type: 'string',
  })
  @Column({
    type: 'varchar',
    nullable: false,
  })
  moneda: string;

  @ApiProperty({
    description: 'Usuario que realiza el pago',
    type: () => User,
  })
  @ManyToOne(() => User, (user) => user.pagos, { nullable: false })
  user: User;
}
