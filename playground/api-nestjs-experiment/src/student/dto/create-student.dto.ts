import { IsEmail } from 'class-validator';

export class CreateStudentDto {
    @IsEmail()
    readonly last_name!: string;

    readonly first_name!: string;
    readonly email!: string;
}
