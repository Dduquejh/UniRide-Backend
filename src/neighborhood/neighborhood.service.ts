import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateNeighborhoodDto } from './dto/create-neighborhood.dto';
import { UpdateNeighborhoodDto } from './dto/update-neighborhood.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Neighborhood } from './entities/neighborhood.entity';
import { Like, Repository } from 'typeorm';
import { Zone } from 'src/zones/entities/zone.entity';

@Injectable()
export class NeighborhoodService {
  constructor(
    @InjectRepository(Neighborhood)
    private readonly neighborhoodRepository: Repository<Neighborhood>,

    @InjectRepository(Zone)
    private readonly zoneRepository: Repository<Zone>,
  ) {}

  async create(createNeighborhoodDto: CreateNeighborhoodDto) {
    const zone = await this.zoneRepository.findOneBy({
      id: createNeighborhoodDto.zoneId,
    });
    if (!zone) {
      throw new NotFoundException(
        `Zone #${createNeighborhoodDto.zoneId} not found`,
      );
    }
    const neighborhood = this.neighborhoodRepository.create({
      ...createNeighborhoodDto,
      zone,
    });
    await this.neighborhoodRepository.save(neighborhood);
    return neighborhood;
  }

  async findAll() {
    const neighborhoods = await this.neighborhoodRepository.find();
    return neighborhoods;
  }

  async findOne(id: number) {
    const neighborhood = await this.neighborhoodRepository.findOneBy({
      id: id,
    });
    if (!neighborhood) {
      throw new NotFoundException(`Neighborhood #${id} not found`);
    }
    return neighborhood;
  }

  async update(id: number, updateNeighborhoodDto: UpdateNeighborhoodDto) {
    const neighborhood = await this.neighborhoodRepository.preload({
      id: id,
      ...updateNeighborhoodDto,
    });
    if (!neighborhood)
      throw new NotFoundException(`Neighborhood #${id} not found`);
    await this.neighborhoodRepository.save(neighborhood);
    return neighborhood;
  }

  async remove(id: number) {
    const neighborhood = await this.findOne(id);
    this.neighborhoodRepository.delete(neighborhood.id);
    return neighborhood;
  }

  async searchNeighborhoodsByName(name: string) {
    const neighborhoods = await this.neighborhoodRepository
      .createQueryBuilder('neighborhood')
      .leftJoinAndSelect('neighborhood.zone', 'zone')
      .where('neighborhood.name ILIKE :name', { name: `%${name}%` })
      .getMany();

    if (neighborhoods.length === 0) {
      throw new NotFoundException(`Neighborhood with name ${name} not found`);
    }
    const zones = neighborhoods.map((neighborhood) => neighborhood.zone);
    return zones;
  }
}
