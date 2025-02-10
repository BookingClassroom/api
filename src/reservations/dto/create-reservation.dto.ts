import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsInt } from 'class-validator';

export class CreateReservationDto {
  @ApiProperty({ example: 1, description: 'ID de l\'utilisateur' })
  @IsInt()
  userId: number;

  @ApiProperty({ example: 1, description: 'ID de la salle' })
  @IsInt()
  classroomId: number;

  @ApiProperty({ example: '2024-02-06T14:00:00Z', description: 'Date et heure de début' })
  @IsDateString()
  startTime: Date;

  @ApiProperty({ example: '2024-02-06T16:00:00Z', description: 'Date et heure de fin' })
  @IsDateString()
  endTime: Date;
}
