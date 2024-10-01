import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTripDto } from './dto/create-trip.dto';
import { UpdateTripDto } from './dto/update-trip.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Trip } from './entities/trip.entity';
import { Repository } from 'typeorm';
import { User } from 'src/auth/entities/auth.entity';

@Injectable()
export class TripsService {
  constructor(
    @InjectRepository(Trip)
    private readonly tripRepository: Repository<Trip>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createTripDto: CreateTripDto) {
    const user = await this.userRepository.findOneBy({
      id: createTripDto.userId,
    });
    if (!user) {
      throw new NotFoundException(`User #${createTripDto.userId} not found`);
    }
    const trip = this.tripRepository.create({ ...createTripDto, user });
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
    this.tripRepository.delete(trip);
    return trip;
  }
}
