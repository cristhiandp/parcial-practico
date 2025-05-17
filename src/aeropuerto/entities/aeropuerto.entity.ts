import { Column, Entity, PrimaryGeneratedColumn, ManyToMany } from 'typeorm';
import { Aerolinea } from '../../aerolinea/entities/aerolinea.entity';

@Entity('aeropuerto')
class Aeropuerto {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 256 })
  nombre: string;

  @Column({ type: 'varchar', length: 3, unique: true })
  codigo: string;

  @Column({ type: 'varchar', length: 128 })
  pais: string;

  @Column({ type: 'varchar', length: 128 })
  ciudad: string;

  @ManyToMany(() => Aerolinea, (aerolinea) => aerolinea.aeropuertos)
  aerolineas: Aerolinea[];
}

export { Aeropuerto };
