import { IsEmail } from 'class-validator';

export class CreateTeacherDto {
    @IsEmail()
    readonly lastName!: string;

    readonly firstName!: string;
    readonly email!: string;
}
