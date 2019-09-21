import {IsNumber} from 'class-validator';
import {Transform, Type} from 'class-transformer';

export class GetProfileDto {
    @Type(() => Number)
    @Transform(parseInt)
    @IsNumber()
    public user_id!: number;
}
