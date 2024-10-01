import { User } from 'src/auth/entities/auth.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

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

  @ManyToOne(() => User, (user) => user.trips, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  user: User;
}