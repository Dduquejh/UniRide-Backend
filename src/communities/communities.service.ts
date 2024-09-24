import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCommunityDto } from './dto/create-community.dto';
import { UpdateCommunityDto } from './dto/update-community.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Community } from './entities/community.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CommunitiesService {
  constructor(
    @InjectRepository(Community)
    private readonly communityRepository: Repository<Community>,
  ) {}

  async create(createCommunityDto: CreateCommunityDto) {
    const community = this.communityRepository.create(createCommunityDto);
    await this.communityRepository.save(community);
    return community;
  }

  async findAll() {
    const communities = await this.communityRepository.find();
    return communities;
  }

  async findOne(id: string) {
    const community = await this.communityRepository.findOneBy({ id: id });
    if (!community) {
      throw new NotFoundException(`Community #${id} not found`);
    }
    return community;
  }

  async update(id: string, updateCommunityDto: UpdateCommunityDto) {
    const community = await this.communityRepository.preload({
      id: id,
      ...updateCommunityDto,
    });
    if (!community) throw new NotFoundException(`Community #${id} not found`);
    await this.communityRepository.save(community);
    return community;
  }

  async remove(id: string) {
    const community = await this.findOne(id);
    this.communityRepository.delete(community);
    return community;
  }
}
