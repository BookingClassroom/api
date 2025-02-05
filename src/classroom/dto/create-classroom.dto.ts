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
}
