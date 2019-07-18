/** ------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
export class CreateStudentInput {
    name?: string;
    email?: string;
}

export abstract class IMutation {
    abstract createStudent(createStudentInput?: CreateStudentInput): Student | Promise<Student>;
}

export abstract class IQuery {
    abstract getStudents(): Student[] | Promise<Student[]>;

    abstract student(id: string): Student | Promise<Student>;
}

export class Student {
    id?: number;
    name?: string;
    email?: string;
}

export abstract class ISubscription {
    abstract studentCreated(): Student | Promise<Student>;
}
