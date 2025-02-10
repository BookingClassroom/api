import { PartialType } from '@nestjs/mapped-types';
import { CreateClassroomDto } from './create-classroom.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateClassroomDto extends PartialType(CreateClassroomDto) {
  @ApiPropertyOptional({ example: 'Salle B303', description: 'Nom de la salle' })
  name?: string;

  @ApiPropertyOptional({ example: 25, description: 'Capacité de la salle' })
  capacity?: number;

  @ApiPropertyOptional({ example: ['Tableau interactif', 'Sonorisation'], description: 'Équipements disponibles' })
  equipments?: string[];

  @ApiPropertyOptional({ example: '09:00:00', description: 'Heure d\'ouverture de la salle' })
  openingTime?: Date;

  @ApiPropertyOptional({ example: '17:00:00', description: 'Heure de fermeture de la salle' })
  closingTime?: Date;
}
