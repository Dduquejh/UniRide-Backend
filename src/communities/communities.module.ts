import { Module } from '@nestjs/common';
import { CommunitiesService } from './communities.service';
import { CommunitiesController } from './communities.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Community } from './entities/community.entity';

@Module({
  controllers: [CommunitiesController],
  providers: [CommunitiesService],
  imports: [TypeOrmModule.forFeature([Community])],
  exports: [TypeOrmModule],
})
export class CommunitiesModule {}
