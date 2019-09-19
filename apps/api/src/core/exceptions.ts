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
