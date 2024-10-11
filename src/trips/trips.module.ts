import { Module } from '@nestjs/common';
import { TripsService } from './trips.service';
import { TripsController } from './trips.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Trip } from './entities/trip.entity';
import { AuthModule } from 'src/auth/auth.module';
import { ZonesModule } from 'src/zones/zones.module';

@Module({
  controllers: [TripsController],
  providers: [TripsService],
  imports: [TypeOrmModule.forFeature([Trip]), AuthModule, ZonesModule],
  exports: [TypeOrmModule],
})
export class TripsModule {}
