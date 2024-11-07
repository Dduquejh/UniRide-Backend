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
import { ReservationsService } from './reservations.service';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';

@Controller('reservations')
export class ReservationsController {
  constructor(private readonly reservationsService: ReservationsService) {}

  @Post()
  create(@Body() createReservationDto: CreateReservationDto) {
    return this.reservationsService.create(createReservationDto);
  }

  @Get()
  findAll() {
    return this.reservationsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.reservationsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateReservationDto: UpdateReservationDto,
  ) {
    return this.reservationsService.update(+id, updateReservationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.reservationsService.remove(+id);
  }

  @Post('reserve')
  async reserveTrip(
    @Body('userId') userId: string,
    @Body('tripId') tripId: number,
    @Body('seats') seats: number,
  ) {
    return this.reservationsService.reserveTrip(userId, tripId, seats);
  }

  @Post('cancel')
  async cancelReservation(
    @Body('userId') userId: string,
    @Body('tripId') tripId: number,
  ) {
    try {
      const result = await this.reservationsService.cancelReservation(
        userId,
        tripId,
      );
      return result;
    } catch (error) {
      // Si ocurre un error, se lanza una excepción adecuada
      throw new NotFoundException(error.message);
    }
  }
}
