import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, Index, UpdateDateColumn } from 'typeorm';

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

    @Column('varchar', { name: 'first_name', length: 50, nullable: true })
    firstName!: string | null;

    @Column('varchar', { name: 'last_name', length: 50, nullable: true })
    lastName!: string | null;

    @Column('varchar', { length: 20, nullable: true })
    phone!: string | null;

    @Column('varchar', { length: 20, nullable: true })
    mobile!: string | null;

    @Column('varchar', { name: 'password_reset_token', nullable: true })
    passwordResetToken!: string | null;

    @Column('datetime', { name: 'password_reset_expires', nullable: true })
    passwordResetExpires!: Date | null;

    @Column('varchar', { name: 'auth_status', default: 'active' })
    authStatus!: 'active' | 'locked' | 'pending' | 'disabled';

    @Column('varchar', { name: 'activation_token', nullable: true })
    activationToken!: string | null;

    @Column('datetime', { name: 'activation_expires', nullable: true })
    activationExpires!: Date | null;

    @CreateDateColumn({ name: 'created_at' })
    createdAt!: Date;

    @UpdateDateColumn({ name: 'updated_at', nullable: true })
    updatedAt!: Date | null;
}
