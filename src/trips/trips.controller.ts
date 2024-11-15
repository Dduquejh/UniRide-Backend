import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
} from '@nestjs/common';
import { TripsService } from './trips.service';
import { CreateTripDto } from './dto/create-trip.dto';
import { UpdateTripDto } from './dto/update-trip.dto';
import { searchTripsDto } from './dto/search-trips.dto';
import { searchTripsUserDto } from './dto/search-trips-user.dto';

@Controller('trips')
export class TripsController {
  constructor(private readonly tripsService: TripsService) {}

  @Post()
  create(@Body() createTripDto: CreateTripDto) {
    return this.tripsService.create(createTripDto);
  }

  @Get()
  findAll() {
    return this.tripsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tripsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTripDto: UpdateTripDto) {
    return this.tripsService.update(+id, updateTripDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tripsService.remove(+id);
  }

  @Post('search')
  searchTrips(@Body() searchTripsDto: searchTripsDto) {
    const trips = this.tripsService.searchTrips(
      searchTripsDto.zoneId,
      searchTripsDto.fromOrTo,
      searchTripsDto.date,
      searchTripsDto.hour,
    );
    return trips;
  }

  @Post('findTripsByUser')
  findTripsByUser(@Body() searchTripsUserDto: searchTripsUserDto) {
    const trips = this.tripsService.findTripsByUser(searchTripsUserDto.userId);
    return trips;
  }

  @Get('reserved/:userId')
  async findTripsReservedByUser(@Param('userId') userId: string) {
    try {
      // Llamamos al servicio para obtener los viajes reservados por el usuario
      return await this.tripsService.findTripsReservedByUser(userId);
    } catch (error) {
      // En caso de error (por ejemplo, si no se encuentran viajes), lanzamos una excepción
      throw new NotFoundException(error.message);
    }
  }
}
