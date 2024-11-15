import { Module } from '@nestjs/common';
import { NeighborhoodService } from './neighborhood.service';
import { NeighborhoodController } from './neighborhood.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Neighborhood } from './entities/neighborhood.entity';
import { AuthModule } from 'src/auth/auth.module';
import { ZonesModule } from 'src/zones/zones.module';

@Module({
  controllers: [NeighborhoodController],
  providers: [NeighborhoodService],
  imports: [TypeOrmModule.forFeature([Neighborhood]), AuthModule, ZonesModule],
  exports: [TypeOrmModule.forFeature([Neighborhood])],
})
export class NeighborhoodModule {}
