import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @ApiPropertyOptional({ example: 'nouveau.nom@example.com', description: 'Nouvel email' })
  email?: string;

  @ApiPropertyOptional({ example: 'newpassword123', description: 'Nouveau mot de passe' })
  password?: string;

  @ApiPropertyOptional({ example: 'John New Doe', description: 'Nouveau nom complet' })
  fullName?: string;
}
