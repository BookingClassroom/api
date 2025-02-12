import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsArray,
  IsDate,
} from 'class-validator';

export class CreateClassroomDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ default: 'Classroom name'})
  name: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ default: 30})
  capacity: number;

  @IsArray()
  @IsOptional()
  @ApiProperty({
    default: ['Tableau blanc', 'Vidéo projecteur'],
    required: false,
  })
  equipments?: string[];

  @IsDate()
  @IsOptional()
  @ApiProperty({
    default: '09:00:00',
    required: false,
    description: 'Heure d\'ouverture de la salle',
  })
  openingTime?: Date;

  @IsDate()
  @IsOptional()
  @ApiProperty({
    default: '17:00:00',
    required: false,
    description: 'Heure de fermeture de la salle',
  })
  closingTime?: Date;
}
