import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsArray,
} from 'class-validator';

export class CreateClassroomDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'Salle B202', description: 'Nom de la salle' })
  name: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ example: 30, description: 'Capacité de la salle' })
  capacity: number;

  @IsArray()
  @IsOptional()
  @ApiProperty({
    example: ['Tableau blanc', 'Vidéo projecteur'],
    description: 'Équipements disponibles',
    required: false,
  })
  equipments?: string[];
}
