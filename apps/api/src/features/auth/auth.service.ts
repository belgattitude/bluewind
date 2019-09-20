import { IUserRepo } from './user.repo';
import { Result } from '../../core/result';
import { User } from './user.interface';
import { assertNever } from '../../core/typeguards';
import { compareSync } from 'bcryptjs';

export class AuthService {
    constructor(private userRepo: IUserRepo) {
        this.userRepo = userRepo;
    }
    async authenticateAndReturnUser(username: string, password: string): Promise<Result<User>> {
        return this.userRepo.findByUsername(username).then(result => {
            const { payload } = result;

            // Narrowed to error
            if (payload.isError) {
                return result;
                // eventually: Result.fail("Authentication failure")
            }

            // Narrowed to User
            const user = payload.value;

            const pwdValidation = this.comparePassword(user.password, password).payload;
            if (pwdValidation.isError) {
                return Result.fail(pwdValidation.error);
            }

            switch (user.auth_status) {
                case 'disabled':
                    return Result.fail(new Error(`Expired account`));
                case 'locked':
                    return Result.fail(new Error(`Locked account`));
                case 'pending':
                    return Result.fail(new Error(`Account pending approval`));
                case 'expired':
                    return Result.fail(new Error(`Expired account`));
            }

            if (user.auth_status === 'active') {
                return result;
            }

            // Exhaustive typechecks here
            // https://www.typescriptlang.org/docs/handbook/advanced-types.html#exhaustiveness-checking
            assertNever(user.auth_status);

            return Result.fail(new Error(`Unexpected error`));
        });
    }

    /**
     * Will be refactored in a PasswordCryptService
     */
    comparePassword(password1: string, password2: string): Result<true> {
        if (!compareSync(password1, password2)) {
            return Result.fail(`Passwords does not match`);
        }
        return Result.ok(true);
    }
}
