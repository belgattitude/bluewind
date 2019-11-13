import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, Index } from 'typeorm';

export type Gender = 'm' | 'f';

@Entity('student')
export class StudentEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column('varchar', { length: 50 })
    first_name!: string;

    @Column('varchar', { length: 50, nullable: true })
    last_name!: string | null;

    @Column('varchar', { length: 1, nullable: true })
    gender!: string | null;

    @Column('varchar', { length: 50, nullable: true })
    @Index({ unique: true })
    email?: string;

    @Column('varchar', { length: 20, nullable: true })
    phone?: string;

    @Column('varchar', { length: 20, nullable: true })
    mobile?: string;

    @Column('date', { nullable: true })
    birthdate?: Date | null;

    @Column('varchar', { length: 50, nullable: true })
    facebook_url?: string | null;

    @CreateDateColumn()
    created_at?: Date;

    @UpdateDateColumn({ nullable: true })
    updated_at?: Date | null;
}
