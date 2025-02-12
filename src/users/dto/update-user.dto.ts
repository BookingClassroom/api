import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @ApiPropertyOptional({ example: 'nouveau.nom@example.com', description: 'Nouvel email' })
  email?: string;

  @ApiPropertyOptional({ example: 'newpassword123', description: 'Nouveau mot de passe' })
  password?: string;

  @ApiPropertyOptional({ example: 'John2', description: 'Nouveau prénom' })
  firstname: string;

  @ApiPropertyOptional({ example: 'Doe2', description: 'nouveau nom' })
  lastname: string;
}
