import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateZoneDto } from './dto/create-zone.dto';
import { UpdateZoneDto } from './dto/update-zone.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Zone } from './entities/zone.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ZonesService {
  constructor(
    @InjectRepository(Zone)
    private readonly zoneRepository: Repository<Zone>,
  ) {}

  async create(createZoneDto: CreateZoneDto) {
    const zone = this.zoneRepository.create(createZoneDto);
    await this.zoneRepository.save(zone);
    return zone;
  }

  async findAll() {
    const zones = await this.zoneRepository.find();
    return zones;
  }

  async findOne(id: string) {
    const zone = await this.zoneRepository.findOneBy({ id: id });
    if (!zone) {
      throw new NotFoundException(`Zone #${id} not found`);
    }
    return zone;
  }

  async update(id: string, updateZoneDto: UpdateZoneDto) {
    const zone = await this.zoneRepository.preload({
      id: id,
      ...updateZoneDto,
    });
    if (!zone) throw new NotFoundException(`Zone #${id} not found`);
    await this.zoneRepository.save(zone);
    return zone;
  }

  async remove(id: string) {
    const zone = await this.findOne(id);
    this.zoneRepository.delete(zone);
    return zone;
  }
}
