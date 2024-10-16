import { Dia } from 'src/enums/dia.enum';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Class } from '../classes/classes.entity';

@Entity({
  name: 'horarios',
})
export class Horario {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  dia: Dia;

  @Column({
    type: 'time',
    default: '00:00:00',
  })
  horaInicio: Date;

  @Column({
    type: 'time',
  })
  horaFin: Date;

  @OneToMany(() => Class, (classEntity) => classEntity.horario)
  classes: Class[];
}
