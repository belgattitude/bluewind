import { compare, hash } from 'bcryptjs';

export class HashService {
    static readonly defaultSalt = 10;

    constructor(private salt: number | string = HashService.defaultSalt) {}

    async hashPassword(password: string) {
        return hash(password, this.salt);
    }

    async comparePasswords(password: string, hashed: string) {
        return compare(password, hashed);
    }
}
