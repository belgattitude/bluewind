import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn} from 'typeorm';

// tslint:disable

@Entity('student')
export class StudentEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column('varchar', { length: 50 })
    first_name!: string;

    @Column('varchar', { length: 50 })
    last_name!: string;

    @Column('varchar', { length: 50, nullable: true})
    email?: string;

    @Column('varchar', { length: 20, nullable: true })
    phone?: string;

    @Column('varchar', { length: 20, nullable: true})
    mobile?: string;

    @Column('date', {nullable: true})
    birthdate?: string;

    @Column('varchar', { length: 50, nullable: true })
    facebook_url?: string;

    @CreateDateColumn()
    created_at?: string;

    @UpdateDateColumn()
    updated_at?: string;
}

