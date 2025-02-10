import { Module } from '@nestjs/common';
import { ReservationsService } from './reservations.service';
import { ReservationsController } from './reservations.controller';
import { Reservation } from './entities/reservation.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Classroom } from 'src/classrooms/entities/classroom.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Reservation, User, Classroom])],
  controllers: [ReservationsController],
  providers: [ReservationsService],
})
export class ReservationsModule {}
