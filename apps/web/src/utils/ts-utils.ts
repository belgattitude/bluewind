
export function autoImplement<T>(defaults?: Partial<T>) {
    return class {
        constructor() {
            Object.assign(this, defaults || {});
        }
    } as new () => T
}
/*
export class StudentDetailDTO extends autoImplement<IStudentDetailDTO>() {
    constructor(props: IStudentDetailDTO) {
        super();
    }
}

*/

