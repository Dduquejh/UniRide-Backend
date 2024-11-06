import { User } from 'src/auth/entities/auth.entity';
import { Trip } from 'src/trips/entities/trip.entity';
import {
  BeforeInsert,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Reservation {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.reservations, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  user: User;

  @ManyToOne(() => Trip, (trip) => trip.reservations, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  trip: Trip;

  @Column('int')
  reservedSeats: number;

  @BeforeInsert()
  async decresaseAvailableSeats() {
    if (this.trip.seats < this.reservedSeats) {
      throw new Error('Not enough available seats');
    }
    this.trip.seats -= this.reservedSeats;
  }
}
