import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { CommunitiesModule } from './communities/communities.module';
import { ZonesModule } from './zones/zones.module';
import { TripsModule } from './trips/trips.module';
import { ReservationsModule } from './reservations/reservations.module';
import { NeighborhoodModule } from './neighborhood/neighborhood.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      database: process.env.DB_NAME,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      synchronize: true,
      autoLoadEntities: true,
    }),
    AuthModule,
    CommunitiesModule,
    ZonesModule,
    TripsModule,
    ReservationsModule,
    NeighborhoodModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
