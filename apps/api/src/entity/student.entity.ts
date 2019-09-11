import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, Index } from 'typeorm';

@Entity('student')
export class StudentEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column('varchar', { name: 'first_name', length: 50 })
    firstName!: string;

    @Column('varchar', { name: 'last_name', length: 50, nullable: true })
    lastName!: string | null;

    @Column('varchar', { length: 50, nullable: true })
    @Index({ unique: true })
    email?: string;

    @Column('varchar', { length: 20, nullable: true })
    phone?: string;

    @Column('varchar', { length: 20, nullable: true })
    mobile?: string;

    @Column('date', { nullable: true })
    birthdate?: Date | null;

    @Column('varchar', { name: 'facebook_url', length: 50, nullable: true })
    facebookUrl?: string | null;

    @CreateDateColumn({ name: 'created_at' })
    createdAt?: Date;

    @UpdateDateColumn({ name: 'updated_at', nullable: true })
    updatedAt?: Date | null;
}
