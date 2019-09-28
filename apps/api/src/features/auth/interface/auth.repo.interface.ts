import { Result } from '@bluewind/error-flow';
import { AuthUser } from './auth-user.interface';

export interface IAuthRepo {
    findByUsername(username: string): Promise<Result<AuthUser>>;
}
