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

  @Column({ default: 'user' }) // Peut être 'admin' ou 'user'
  @ApiProperty({ example: 'user', description: 'Rôle de l\'utilisateur' })
  role: string;
}
