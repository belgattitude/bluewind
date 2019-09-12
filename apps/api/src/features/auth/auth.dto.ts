import { IsString, IsNotEmpty, MaxLength } from 'class-validator';

export class LoginRequestDto {
    @IsString()
    @IsNotEmpty()
    @MaxLength(50)
    public username!: string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(50)
    public password!: string;
}
