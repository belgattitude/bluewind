import { IAuthRepo } from './interface';
import { Result } from '@bluewind/error-flow';
import { AuthUser } from './interface';
import { assertNever } from '../../core/typeguards';
import { HashService } from '../../core/infra/hash-service';

export class AuthService {
    constructor(private userRepo: IAuthRepo) {
        this.userRepo = userRepo;
    }

    async authenticate(username: string, password: string): Promise<Result<AuthUser>> {
        return this.userRepo.findByUsername(username).then(async result => {
            const hashService = new HashService();

            const { payload } = result;
            // Narrowed to error
            if (payload.isError) {
                return result;
            }

            // Narrowed to User
            const user = payload.value;

            if (!(await hashService.comparePasswords(password, user.password))) {
                return Result.fail<AuthUser>(`Passwords does not match`);
            }

            switch (user.auth_status) {
                case 'disabled':
                    return Result.fail<AuthUser>(new Error(`Account disabled`));
                case 'locked':
                    return Result.fail<AuthUser>(new Error(`Account locked`));
                case 'pending':
                    return Result.fail<AuthUser>(new Error(`Account pending approval`));
                case 'expired':
                    return Result.fail<AuthUser>(new Error(`Account expired`));
            }

            if (user.auth_status === 'active') {
                return result;
            }

            // Exhaustive typechecks here
            // https://www.typescriptlang.org/docs/handbook/advanced-types.html#exhaustiveness-checking
            assertNever(user.auth_status);

            return Result.fail<AuthUser>(new Error(`Unexpected error`));
        });
    }
}
