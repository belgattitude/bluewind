import { EntitySchema } from 'typeorm';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('teacher')
export class TeacherEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column('varchar', { name: 'last_name', length: 80 })
    lastName!: string;

    @Column('varchar', { name: 'first_name', length: 80 })
    firstName!: string;

    @Column('varchar', { name: 'email', length: 80 })
    email!: string;

    @CreateDateColumn({ name: 'created_at' })
    createdAt?: string;
}
