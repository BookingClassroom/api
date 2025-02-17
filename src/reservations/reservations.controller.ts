import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe } from '@nestjs/common';
import { ReservationsService } from './reservations.service';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Reservation } from './entities/reservation.entity';

@ApiTags('reservations')
@Controller('reservations')
export class ReservationsController {
  constructor(private readonly reservationsService: ReservationsService) {}

  @Post()
  @ApiOperation({ summary: 'Créer une réservation' })
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async create(@Body() createReservationDto: CreateReservationDto): Promise<Reservation> {
    return this.reservationsService.create(createReservationDto);
  }

  @Get()
  @ApiOperation({ summary: 'Récupérer toutes les réservations' })
  async findAll(): Promise<Reservation[]>  {
    return this.reservationsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Récupérer une réservation' })
  async findOne(@Param('id') id: string): Promise<Reservation> {
    return this.reservationsService.findOne(+id);
  }
  
  @Get('/classroom/:id')
  @ApiOperation({ summary: 'Récupérer toutes les réservations d\'une salle' })
  async findAllForOneClassroom(@Param('id') id: string): Promise<Reservation[]> {
    return this.reservationsService.findAllForOneClassroom(+id);
  }

  @Get('/user/:id')
  @ApiOperation({ summary: 'Récupérer toutes les réservations d\'un utilisateur' })
  async findAllForOneUser(@Param('id') id: string): Promise<Reservation[]> {
    return this.reservationsService.findAllForOneUser(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Modifier une réservation' })
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async update(@Param('id') id: string, @Body() updateReservationDto: UpdateReservationDto): Promise<Reservation> {
    return this.reservationsService.update(+id, updateReservationDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Supprimer une réservation' })
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async remove(@Param('id') id: string): Promise<void> {
    return this.reservationsService.remove(+id);
  }
}
