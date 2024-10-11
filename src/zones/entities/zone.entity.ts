import { Trip } from 'src/trips/entities/trip.entity';
import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';

@Entity()
export class Zone {
  @PrimaryColumn('text')
  id: string;

  @Column('text', { unique: true })
  text: string;

  @Column('text')
  imageSource: string;

  @OneToMany(() => Trip, (trip) => trip.zone)
  trips: Trip[];
}
