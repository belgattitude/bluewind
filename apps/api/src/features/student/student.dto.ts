export class StudentSearchRequestDto {
    id?: number;
    fragment?: string;
    limit?: number;
    offset?: number;
}

export class StudentSearchResponseDto {}

export class CreateStudentDto {
    readonly last_name!: string;
    readonly first_name!: string;
    readonly email!: string;
}
