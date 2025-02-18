import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsArray, IsInt, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class FilterClassroomDto {
  @ApiPropertyOptional({
    example: ['projecteur', 'tableau blanc'],
    description: 'Liste des équipements souhaités',
    type: [String],
  })
  @IsOptional()
  @IsArray()
  equipments?: string[];

  @ApiPropertyOptional({
    example: 30,
    description: 'Capacité minimale de la salle',
  })
  @IsOptional()
  @IsInt()
  @Min(1)
  @Type(() => Number)
  minCapacity?: number;
}
