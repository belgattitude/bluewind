import { ValidationError } from 'class-validator';

export class DatabaseError extends Error {
    constructor(message: string) {
        super(message);
        Object.setPrototypeOf(this, DatabaseError.prototype);
        this.name = this.constructor.name;
    }
}
export class RecordNotFoundError extends Error {
    constructor(message: string) {
        super(message);
        Object.setPrototypeOf(this, RecordNotFoundError.prototype);
        this.name = this.constructor.name;
    }
}

export class DTOValidationError extends Error {
    readonly errors: ValidationError[];
    constructor(message: string, errors: ValidationError[]) {
        super(message);
        Object.setPrototypeOf(this, DTOValidationError.prototype);
        this.name = this.constructor.name;
        this.errors = errors;
    }
}
