import { Injectable, BadRequestException, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { Reservation } from './entities/reservation.entity';
import { User } from 'src/users/entities/user.entity';
import { Classroom } from 'src/classrooms/entities/classroom.entity';
import { UpdateReservationDto } from './dto/update-reservation.dto';

@Injectable()
export class ReservationsService {
  constructor(
    @InjectRepository(Reservation)
    private readonly reservationRepository: Repository<Reservation>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    @InjectRepository(Classroom)
    private readonly classroomRepository: Repository<Classroom>,
  ) {}

  private formatTimeDisplay(date: Date): string {
    return date.toISOString().split('T')[1].substring(0, 5);
  }

  private isValidTimeSlot(date: Date): boolean {
    const minutes = date.getUTCMinutes();
    return minutes === 0 || minutes === 30;
  }

  private isWithinOpeningHours(startTime: Date, endTime: Date, openingTime: string, closingTime: string): boolean {
    const openingHour = parseInt(openingTime.substring(0, 2));
    const openingMinute = parseInt(openingTime.substring(3, 5));
    const closingHour = parseInt(closingTime.substring(0, 2));
    const closingMinute = parseInt(closingTime.substring(3, 5));

    const startHour = startTime.getUTCHours();
    const startMinute = startTime.getUTCMinutes();
    const endHour = endTime.getUTCHours();
    const endMinute = endTime.getUTCMinutes();

    return (startHour > openingHour || (startHour === openingHour && startMinute >= openingMinute)) &&
    (endHour < closingHour || (endHour === closingHour && endMinute <= closingMinute));
  }

  async create(dto: CreateReservationDto): Promise<Reservation> {
    const { userId, classroomId, startTime, endTime } = dto;

    // Utilisation directe des dates fournies en UTC
    const startDate = new Date(startTime);
    const endDate = new Date(endTime);

    // Validation des dates
    await this.validateReservation(startDate, endDate, classroomId);

    // Vérification de l'existence de l'utilisateur
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) throw new BadRequestException("Utilisateur non trouvé");

    // Vérification de l'existence de la salle
    const classroom = await this.classroomRepository.findOne({ where: { id: classroomId } });
    if (!classroom) throw new BadRequestException("Salle non trouvée");

    // Création de la nouvelle réservation
    const newReservation = this.reservationRepository.create({
      user,
      classroom,
      startTime: startDate,
      endTime: endDate,
    });

    return this.reservationRepository.save(newReservation);
  }

  async update(id: number, updateReservationDto: UpdateReservationDto): Promise<Reservation> {
    const existingReservation = await this.findOne(id);
    if (!existingReservation) {
      throw new NotFoundException('Réservation non trouvée');
    }

    const startDate = updateReservationDto.startTime
      ? new Date(updateReservationDto.startTime)
      : existingReservation.startTime;

    const endDate = updateReservationDto.endTime
      ? new Date(updateReservationDto.endTime)
      : existingReservation.endTime;

    // Validation des dates
    await this.validateReservation(startDate, endDate, existingReservation.classroom.id, id);

    existingReservation.startTime = startDate;
    existingReservation.endTime = endDate;

    return this.reservationRepository.save(existingReservation);
  }

  async findAll(): Promise<Reservation[]> {
    return await this.reservationRepository.find({ relations: ['user', 'classroom'] });
  }

  async findOne(id: number): Promise<Reservation> {
    const reservation = await this.reservationRepository.findOne({ where: { id }, relations: ['user', 'classroom'] });
    if (!reservation) {
      throw new NotFoundException('Réservation non trouvée');
    }
    return reservation;
  }

  async findAllForOneClassroom(id: number): Promise<Reservation[]> {
    const classroom = await this.classroomRepository.findOne({ where: { id } });
    if (!classroom) {
      throw new NotFoundException('Classroom not found !');
    }

    const reservations = await this.reservationRepository.find({
      where: { classroom: { id } },
      relations: ['user', 'classroom'],
      order: {
        startTime: 'ASC'
      }
    });
  
    return reservations;
  }

  async remove(id: number): Promise<void> {
    const result = await this.reservationRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException('Réservation non trouvée');
    }
  }

  private async validateReservation(startDate: Date, endDate: Date, classroomId: number, reservationId?: number): Promise<void> {
    const dateNow = new Date(Date.now());
  
    // Vérifie que l'heure de début et de fin ne sont pas identiques
    if (startDate.getTime() === endDate.getTime()) {
      throw new ConflictException('Start time and end time cannot be the same');
    }
  
    // Vérifie que la réservation n'est pas dans le passé
    if (startDate < dateNow || endDate < dateNow) {
      throw new ConflictException('Reservation cannot start or end before the current date and time');
    }
  
    // Vérifie que l'heure de début est avant l'heure de fin
    if (startDate >= endDate) {
      throw new ConflictException('Start time must be before end time');
    }
  
    // Vérifie que les créneaux sont bien sur des intervalles de 30 minutes
    if (!this.isValidTimeSlot(startDate) || !this.isValidTimeSlot(endDate)) {
      throw new BadRequestException('Reservations must start and end at 30-minute intervals');
    }
  
    // Vérifie que la salle existe
    const classroom = await this.classroomRepository.findOne({ where: { id: classroomId } });
    if (!classroom) throw new BadRequestException("Salle non trouvée");
  
    // Vérifie les horaires d'ouverture de la salle
    if (classroom.openingTime && classroom.closingTime) {
      if (!this.isWithinOpeningHours(startDate, endDate, classroom.openingTime.toString(), classroom.closingTime.toString())) {
        throw new BadRequestException(`La salle est ouverte de ${classroom.openingTime} à ${classroom.closingTime}`);
      }
    }
  
    // Vérifie les conflits de réservation
    const queryBuilder = this.reservationRepository.createQueryBuilder('reservation')
      .leftJoinAndSelect('reservation.user', 'user')
      .where('reservation.classroomId = :classroomId', { classroomId })
      .andWhere('(reservation.endTime > :startDate AND reservation.startTime < :endDate)', {
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
      });
  
    // Exclut la réservation en cours de modification si un ID est fourni
    if (reservationId) {
      queryBuilder.andWhere('reservation.id != :reservationId', { reservationId });
    }
  
    const existingReservations = await queryBuilder.getMany();
  
    // Si des conflits sont trouvés, prépare un message d'erreur détaillé
    if (existingReservations.length > 0) {
      const conflicts = existingReservations.map(r => ({
        period: `${this.formatTimeDisplay(r.startTime)}-${this.formatTimeDisplay(r.endTime)}`,
        user: `${r.user.firstname} ${r.user.lastname}`
      }));
  
      const uniqueConflicts = Array.from(
        new Set(conflicts.map(c => `${c.period} (réservé par ${c.user})`))
      );
  
      throw new ConflictException(
        `La salle est déjà réservée aux horaires suivants : ${uniqueConflicts.join('; ')}`
      );
    }
  }
}
