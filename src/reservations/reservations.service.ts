import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Reservation } from './entities/reservation.entity';
import { Repository, DataSource } from 'typeorm';
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
    private readonly tripRepository: Repository<Trip>,
    private readonly dataSource: DataSource,
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
    if (!user) throw new NotFoundException('User not found');

    const trip = await this.tripRepository.findOneBy({ id: tripId });
    if (!trip) throw new NotFoundException('Trip not found');

    if (trip.seats < seats)
      throw new ConflictException('Not enough available seats');

    return this.dataSource.transaction(async (manager) => {
      // Verificamos los asientos nuevamente dentro de la transacción
      const existingTrip = await manager.findOne(Trip, {
        where: { id: tripId },
        lock: { mode: 'pessimistic_write' },
      });

      if (!existingTrip || existingTrip.seats < seats) {
        throw new ConflictException('Seats are no longer available');
      }

      // Reducimos la cantidad de asientos disponibles
      existingTrip.seats -= seats;
      await manager.save(existingTrip); // Guardamos el viaje con los asientos actualizados

      // Creamos la reserva
      const reservation = this.reservationRepository.create({
        user,
        trip: existingTrip,
        reservedSeats: seats,
      });

      return manager.save(reservation); // Guardamos la reserva
    });
  }
}
