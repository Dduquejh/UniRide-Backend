import { Module } from '@nestjs/common';
import { ZonesService } from './zones.service';
import { ZonesController } from './zones.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Zone } from './entities/zone.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [ZonesController],
  providers: [ZonesService],
  imports: [TypeOrmModule.forFeature([Zone]), AuthModule],
  exports: [TypeOrmModule],
})
export class ZonesModule {}
