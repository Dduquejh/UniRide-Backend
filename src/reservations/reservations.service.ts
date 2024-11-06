import { Injectable } from '@nestjs/common';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Reservation } from './entities/reservation.entity';
import { Repository } from 'typeorm';
import { Trip } from 'src/trips/entities/trip.entity';
import { User } from 'src/auth/entities/auth.entity';

@Injectable()
export class ReservationsService {
  constructor(
    @InjectRepository(Reservation)
    private readonly reservationRepository: Repository<Reservation>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Trip)
    private readonly zoneRepository: Repository<Trip>,
  ) {}

  create(createReservationDto: CreateReservationDto) {
    return 'This action adds a new reservation';
  }

  findAll() {
    return `This action returns all reservations`;
  }

  findOne(id: number) {
    return `This action returns a #${id} reservation`;
  }

  update(id: number, updateReservationDto: UpdateReservationDto) {
    return `This action updates a #${id} reservation`;
  }

  remove(id: number) {
    return `This action removes a #${id} reservation`;
  }

  async reserveTrip(userId: string, tripId: number, seats: number) {
    const user = await this.userRepository.findOneBy({ id: userId });
    const trip = await this.zoneRepository.findOneBy({ id: tripId });

    if (!user) {
      throw new Error('User not found');
    }

    if (!trip) {
      throw new Error('Trip not found');
    }

    if (trip.seats < seats) {
      throw new Error('Not enough available seats');
    }

    trip.seats -= seats;
    await this.zoneRepository.save(trip);

    const reservation = this.reservationRepository.create({
      user,
      trip,
      reservedSeats: seats,
    });

    await this.reservationRepository.save(reservation);
    return reservation;
  }
}
