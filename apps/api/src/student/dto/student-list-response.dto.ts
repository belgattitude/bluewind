import {StudentEntity} from "../../entity/student.entity";
import {ApiModelProperty} from "@nestjs/swagger";

export class StudentListResponse implements NonNullable<StudentEntity> {
    @ApiModelProperty({ example: 1, description: 'Student id' })
    id!: number;
    @ApiModelProperty({ example: 'Pierre'})
    first_name!: string;
    @ApiModelProperty({ example: 'Curie' })
    last_name!: string;

}
