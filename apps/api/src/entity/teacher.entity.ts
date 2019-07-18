import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('teacher')
export class TeacherEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('varchar', { length: 80 })
    last_name: string;

    @Column('varchar', { length: 80 })
    first_name: string;

    @Column('varchar', { length: 80 })
    email: string;

    @CreateDateColumn()
    created_at?: string;
}
