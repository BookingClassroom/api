import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class SigninDto {
  @ApiProperty({ example: 'john.doe@example.com', description: 'Email de l\'utilisateur' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'password123', description: 'Mot de passe de l\'utilisateur' })
  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @ApiProperty({ 
    example: ['admin'], 
    description: 'Rôles de l\'utilisateur',
    isArray: true,
    required: false
  })
  roles: string[];
}
