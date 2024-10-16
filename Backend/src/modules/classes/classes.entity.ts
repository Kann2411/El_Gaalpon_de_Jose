import { EstadoClase } from "src/enums/estadoClase.enum";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Horario } from "../horario/horario.entity";

@Entity({
    name: "classes"
})
export class Class{
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({
        nullable: false
    })
    name: string

    @Column({
        type: 'int',
        default: 0
    })
    capacidad: number

    @Column()
    estado: EstadoClase

    @ManyToOne(() => Horario, horario => horario.classes)
    horario: Horario
}