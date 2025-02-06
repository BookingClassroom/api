import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  @ApiProperty({ example: 1, description: 'ID unique de l\'utilisateur' })
  id: number;

  @Column({ unique: true })
  @ApiProperty({ example: 'john.doe@example.com', description: 'Email unique' })
  email: string;

  @Column()
  @ApiProperty({ example: '$2b$10$encryptedpassword', description: 'Mot de passe haché' })
  password: string;

  @Column()
  @ApiProperty({ example: 'John Doe', description: 'Nom complet' })
  fullName: string;

  @Column('simple-array', { 
    nullable: true,
    default: [] 
  })
  @ApiProperty({ 
    example: ['USER'], 
    description: 'Rôles de l\'utilisateur',
    isArray: true,
    required: false
  })
  roles: string[];
}
