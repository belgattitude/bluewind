import { UserProfile } from './interface';
import { Result } from '../../core/result';
import { DatabaseError, RecordNotFoundError } from '../../core/exceptions';
import { Connection, getConnection } from 'typeorm';
import { UserEntity } from '../../entity/user.entity';

export class UserRepo {
    private conn: Connection;

    constructor(connection: Connection) {
        this.conn = connection;
    }

    async getProfile(userId: number): Promise<Result<UserProfile>> {
        return this.conn
            .getRepository(UserEntity)
            .findOne({
                where: { user_id: userId },
            })
            .then(
                (entity): Result<UserProfile> => {
                    if (!entity) {
                        return Result.fail(new RecordNotFoundError(`User cannot be found.`));
                    }
                    // If more complex make a mapper
                    const { id, email, username, first_name, last_name } = entity;
                    return Result.ok({
                        id,
                        username,
                        first_name: first_name,
                        last_name: last_name,
                        email: email
                    });
                },
            )
            .catch(error => {
                return Result.fail(new DatabaseError('Could not connect to database'));
            });
    }

    static fromConnection(): UserRepo {
        return new UserRepo(getConnection());
    }
}
