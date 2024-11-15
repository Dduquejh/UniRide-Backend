import { Zone } from 'src/zones/entities/zone.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Neighborhood {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column('text')
  name: string;

  @ManyToOne(() => Zone, (zone) => zone.neighborhoods)
  zone: Zone;
}
