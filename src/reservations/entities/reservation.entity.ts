import { Entity, PrimaryGeneratedColumn, ManyToOne, Column, JoinColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/users/entities/user.entity';
import { Classroom } from 'src/classrooms/entities/classroom.entity';

@Entity('reservation')
export class Reservation {
  @PrimaryGeneratedColumn()
  @ApiProperty({ example: 1, description: 'ID unique de la réservation' })
  id: number;

  @ManyToOne(() => User, (user) => user.id, { 
    nullable: false, 
    eager: true,
    onDelete: 'CASCADE'
  })
  @JoinColumn()
  @ApiProperty({ description: "Utilisateur ayant fait la réservation" })
  user: User;

  @ManyToOne(() => Classroom, (classroom) => classroom.id, { 
    nullable: false, 
    eager: true,
    onDelete: 'CASCADE'
  })
  @JoinColumn()
  @ApiProperty({ description: "Salle réservée" })
  classroom: Classroom;

  @Column({ type: 'timestamptz', nullable: false })
  @ApiProperty({ example: '2026-02-06T14:00:00Z', description: 'Date et heure de début' })
  startTime: Date;

  @Column({ type: 'timestamptz', nullable: false })
  @ApiProperty({ example: '2026-02-06T16:00:00Z', description: 'Date et heure de fin' })
  endTime: Date;
}