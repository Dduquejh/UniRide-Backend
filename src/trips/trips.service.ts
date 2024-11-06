import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTripDto } from './dto/create-trip.dto';
import { UpdateTripDto } from './dto/update-trip.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Trip } from './entities/trip.entity';
import { Repository } from 'typeorm';
import { User } from 'src/auth/entities/auth.entity';
import { Zone } from 'src/zones/entities/zone.entity';

@Injectable()
export class TripsService {
  constructor(
    @InjectRepository(Trip)
    private readonly tripRepository: Repository<Trip>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Zone)
    private readonly zoneRepository: Repository<Zone>,
  ) {}

  async create(createTripDto: CreateTripDto) {
    const user = await this.userRepository.findOneBy({
      id: createTripDto.userId,
    });

    const zone = await this.zoneRepository.findOneBy({
      id: createTripDto.zoneId,
    });
    if (!user) {
      throw new NotFoundException(`User #${createTripDto.userId} not found`);
    } else if (!zone) {
      throw new NotFoundException(`Zone #${createTripDto.zoneId} not found`);
    }

    const trip = this.tripRepository.create({ ...createTripDto, user, zone });
    await this.tripRepository.save(trip);
    return trip;
  }

  async findAll() {
    const trips = await this.tripRepository.find();
    return trips;
  }

  async findOne(id: number) {
    const trip = await this.tripRepository.findOneBy({ id: id });
    if (!trip) {
      throw new NotFoundException(`Trip #${id} not found`);
    }
    return trip;
  }

  async update(id: number, updateTripDto: UpdateTripDto) {
    const trip = await this.tripRepository.preload({
      id: id,
      ...updateTripDto,
    });
    if (!trip) throw new NotFoundException(`Trip #${id} not found`);
    await this.tripRepository.save(trip);
    return trip;
  }

  async remove(id: number) {
    const trip = await this.findOne(id);
    this.tripRepository.delete(trip.id);
    return trip;
  }

  async searchTrips(
    zoneId: string,
    fromOrTo?: string,
    date?: string,
    hour?: string,
  ) {
    const queryBuilder = this.tripRepository
      .createQueryBuilder('trip')
      .leftJoinAndSelect('trip.user', 'user')
      .where('trip.zoneId = :zoneId', { zoneId });

    if (fromOrTo) {
      queryBuilder.andWhere('trip.fromOrTo = :fromOrTo', { fromOrTo });
    }

    if (date) {
      queryBuilder.andWhere('trip.date = :date', { date });
    }

    if (hour) {
      queryBuilder.andWhere('trip.hour = :hour', { hour });
    }
    queryBuilder
      .orderBy("TO_DATE(trip.date, 'DD/MM/YYYY')", 'ASC')
      .addOrderBy('trip.hour', 'ASC');

    const trips = await queryBuilder.getMany();

    const tripsWithUserNames = trips.map((trip) => ({
      ...trip,
      userName: trip.user.fullName,
    }));

    return tripsWithUserNames;
  }

  async findTripsByUser(userId: string) {
    const trips = await this.tripRepository
      .createQueryBuilder('trip')
      .leftJoinAndSelect('trip.user', 'user')
      .where('trip.userId = :userId', { userId })
      .orderBy("TO_DATE(trip.date, 'DD/MM/YYYY')", 'ASC')
      .addOrderBy('trip.hour', 'ASC')
      .getMany();

    if (!trips || trips.length === 0) {
      throw new NotFoundException(`No trips found for user #${userId}`);
    }

    const tripsWithUserNames = trips.map((trip) => ({
      ...trip,
      userName: trip.user.fullName,
    }));

    return tripsWithUserNames;
  }
}
