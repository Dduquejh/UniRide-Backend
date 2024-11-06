import { Module } from '@nestjs/common';
import { ReservationsService } from './reservations.service';
import { ReservationsController } from './reservations.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reservation } from './entities/reservation.entity';
import { User } from 'src/auth/entities/auth.entity';
import { Trip } from 'src/trips/entities/trip.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Reservation, User, Trip])],
  controllers: [ReservationsController],
  providers: [ReservationsService],
})
export class ReservationsModule {}
