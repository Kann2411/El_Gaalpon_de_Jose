import { EstadoMembresia } from 'src/enums/estadoMembresia.enum';
import { TipoMembresia } from 'src/enums/tipoMembresia.enum';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'membresias',
})
export class Membresia {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  tipo: TipoMembresia;

  @Column({
    type: 'date',
  })
  fechaInicio: Date;

  @Column({
    type: 'date',
  })
  fechaFin: Date;

  @Column()
  estado: EstadoMembresia;
}
