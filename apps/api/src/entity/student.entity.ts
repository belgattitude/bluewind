import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity('student')
export class StudentEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { length: 80 })
  firstName: string;

  @Column('varchar', { length: 80 })
  lastName: string;

  @Column('varchar', { length: 80 })
  email: string;

  @CreateDateColumn()
  created_at?: string;

  @Column('bool', { default: true })
  isActive?: boolean;
}
