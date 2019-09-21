import {User, Role, IUserRepo} from './interface';
import { Result } from '../../core/result';
import { DatabaseError, RecordNotFoundError } from '../../core/exceptions';
import { Connection, getConnection } from 'typeorm';
import { UserEntity } from '../../entity/user.entity';


export class UserRepo implements IUserRepo {
    private conn: Connection;

    constructor(connection: Connection) {
        this.conn = connection;
    }

    async findByUsername(username: string): Promise<Result<User>> {
        return this.conn
            .getRepository(UserEntity)
            .findOne({
                where: { username },
            })
            .then(
                (entity): Result<User> => {
                    if (!entity) {
                        return Result.fail(new RecordNotFoundError(`Username cannot be found.`));
                    }
                    // If more complex make a mapper
                    const { id, password, auth_status } = entity;
                    return Result.ok({
                        id,
                        username,
                        password,
                        auth_status,
                        roles: [] // todo
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
