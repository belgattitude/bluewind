import { ApiModelProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';

export class CreateStudentDto {
    @ApiModelProperty({
        description: 'Last name',
        required: true,
        maxLength: 80,
        minLength: 2,
    })
    @IsEmail()
    readonly lastName: string;

    @ApiModelProperty({
        description: 'First name',
        required: true,
        maxLength: 80,
        minLength: 2,
    })
    readonly firstName: string;
    @ApiModelProperty({
        description: 'Email',
        required: true,
        maxLength: 80,
        minLength: 5,
    })
    readonly email: string;
}
