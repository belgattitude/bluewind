import { AuthUser, AuthRole, IAuthRepo } from './interface';
import {Result} from '@bluewind/error-flow';
import { DatabaseError, RecordNotFoundError } from '../../core/exceptions';
import { Connection, getConnection } from 'typeorm';
import { UserEntity } from '../../entity/user.entity';

export class AuthRepo implements IAuthRepo {
    private conn: Connection;

    constructor(connection: Connection) {
        this.conn = connection;
    }

    async findByUsername(username: string): Promise<Result<AuthUser>> {
        return this.conn
            .getRepository(UserEntity)
            .findOne({
                where: { username },
            })
            .then(
                (entity): Result<AuthUser> => {
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
                        roles: [], // todo
                    });
                },
            )
            .catch(error => {
                return Result.fail(new DatabaseError('Could not connect to database'));
            });
    }

    static fromConnection(): AuthRepo {
        return new AuthRepo(getConnection());
    }
}
