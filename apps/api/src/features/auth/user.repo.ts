import { User } from './user.interface';
import { Result } from '../../core/result';
import { DatabaseError, RecordNotFoundError } from '../../core/exceptions';

export interface IUserRepo {
    findByUsername(username: string): Promise<Result<User>> | Result<User>;
}

export class UserRepo implements IUserRepo {
    readonly users: User[] = [
        { username: 'valid_user', password: 'valid_pwd', status: 'valid' },
        { username: 'expired_user', password: 'valid_pwd', status: 'expired' },
        { username: 'locked_user', password: 'valid_pwd', status: 'locked' },
    ];

    async findByUsername(username: string): Promise<Result<User>> {
        return new Promise(resolve => {
            if (username === 'user_to_simulate_db_error') {
                resolve(Result.fail(new DatabaseError('Could not connect to database')));
            }
            const result = this.users.filter(user => user.username === username);
            if (result.length !== 1) {
                resolve(Result.fail(new RecordNotFoundError(`Username '${username}' cannot be found`)));
            }
            resolve(Result.ok(result[0]));
        });
    }
}
