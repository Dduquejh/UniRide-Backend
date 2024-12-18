import { User } from 'src/auth/entities/auth.entity';
import { Reservation } from 'src/reservations/entities/reservation.entity';
import { Zone } from 'src/zones/entities/zone.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Trip {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  fromOrTo: string;

  @Column('text')
  date: string;

  @Column('text')
  hour: string;

  @Column('int')
  seats: number;

  @Column('text')
  description: string;

  @Column('text')
  plate: string;

  @ManyToOne(() => User, (user) => user.trips, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  user: User;

  @ManyToOne(() => Zone, (zone) => zone.trips, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  zone: Zone;

  @OneToMany(() => Reservation, (reservation) => reservation.trip)
  reservations: Reservation[];
}
