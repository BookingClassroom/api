import { ApiProperty } from '@nestjs/swagger';
import { IsDateString } from 'class-validator';

export class UpdateReservationDto {
  @ApiProperty({ example: '2024-02-06T14:00:00Z', description: 'Date et heure de début' })
  @IsDateString()
  startTime: Date;

  @ApiProperty({ example: '2024-02-06T16:00:00Z', description: 'Date et heure de fin' })
  @IsDateString()
  endTime: Date;
}
