import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Aeropuerto } from '../../aeropuerto/entities/aeropuerto.entity';

@Entity('aerolinea')
class Aerolinea {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 512, unique: true })
  nombre: string;

  @Column({ type: 'text', length: 2048 })
  descripcion: string;

  @Column({ type: 'date' })
  fechaFundacion: Date;

  @Column({ type: 'varchar', length: 2048 })
  paginaWeb: string;

  @ManyToMany(() => Aeropuerto, (aeropuerto) => aeropuerto.aerolineas)
  @JoinTable()
  aeropuertos: Aeropuerto[];
}

export { Aerolinea };
