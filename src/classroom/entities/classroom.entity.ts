import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('classroom')
export class Classroom {
  @PrimaryGeneratedColumn()
  @ApiProperty({ example: 1, description: 'ID unique de la salle' })
  id: number;

  @Column()
  @ApiProperty({ example: 'Salle A101', description: 'Nom de la salle' })
  name: string;

  @Column()
  @ApiProperty({ example: 20, description: 'Capacité de la salle' })
  capacity: number;

  @Column('simple-array', { nullable: true })
  @ApiProperty({
    example: ['projecteur', 'tableau blanc'],
    description: 'Liste des équipements disponibles',
  })
  equipments: string[];
}
