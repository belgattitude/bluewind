import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, Index, UpdateDateColumn } from 'typeorm';

export const ActiveStatus = 'active';
export type AuthStatuses = typeof ActiveStatus | 'locked' | 'pending' | 'expired' | 'disabled';

@Entity('user')
export class UserEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ length: 80 })
    @Index({ unique: true })
    username!: string;

    @Column()
    password!: string;

    @Column({ length: 80 })
    @Index({ unique: true })
    email!: string;

    @Column('varchar', { length: 50, nullable: true })
    first_name!: string | null;

    @Column('varchar', { length: 50, nullable: true })
    last_name!: string | null;

    @Column('varchar', { length: 20, nullable: true })
    phone!: string | null;

    @Column('varchar', { length: 20, nullable: true })
    mobile!: string | null;

    @Column('varchar', { nullable: true })
    password_reset_token!: string | null;

    @Column('datetime', { nullable: true })
    password_reset_expires!: Date | null;

    @Column('varchar', { default: ActiveStatus })
    auth_status!: AuthStatuses;

    @Column('datetime', { nullable: true })
    auth_status_at!: Date | null;

    @Column('varchar', { nullable: true })
    activation_token!: string | null;

    @Column('datetime', { nullable: true })
    activation_expires!: Date | null;

    @CreateDateColumn()
    created_at!: Date;

    @UpdateDateColumn({ nullable: true })
    updated_at!: Date | null;
}
