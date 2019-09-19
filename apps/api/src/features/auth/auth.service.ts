import { IUserRepo } from './user.repo';
import { Result } from '../../core/result';
import { User } from './user.interface';
import { assertNever } from '../../core/typeguards';

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
            }

            // Narrowed to User
            const user = payload.value;

            const pwdValidation = this.comparePassword(user.password, password).payload;
            if (pwdValidation.isError) {
                return Result.fail(pwdValidation.error);
            }

            switch (user.status) {
                case 'expired':
                    return Result.fail(new Error(`Expired account`));
                case 'locked':
                    return Result.fail(new Error(`Locked account`));
            }

            if (user.status === 'valid') {
                return result;
            }

            // Exhaustive typechecks here
            // https://www.typescriptlang.org/docs/handbook/advanced-types.html#exhaustiveness-checking
            assertNever(user.status);

            return Result.fail(new Error(`Unexpected error`));
        });
    }

    /**
     * For purpose of example
     */
    comparePassword(password1: string, password2: string): Result<true> {
        const letsPretendABCryptComparison = password1 === password2;
        if (!letsPretendABCryptComparison) {
            return Result.fail(`Passwords does not match`);
        }
        if (password1.trim().length < 8) {
            return Result.fail(`Our security policy has been upgraded`);
        }

        return Result.ok(true);
    }
}
