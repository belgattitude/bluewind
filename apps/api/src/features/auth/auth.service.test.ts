import { AuthService } from './auth.service';
import { AuthUser } from './interface';
import { Result } from '../../core/result';
import { IAuthRepo } from './interface';
import { ActiveStatus, AuthStatuses } from '../../entity/user.entity';
import { hashSync } from 'bcryptjs';

describe('AuthService tests', () => {
    /**
     * readonly users: User[] = [
     * { id: 1, username: 'valid_user', password: 'valid_pwd', auth_status: 'active' },
     * { id: 2, username: 'expired_user', password: 'valid_pwd', auth_status: 'expired' },
     * { id: 3, username: 'locked_user', password: 'valid_pwd', auth_status: 'locked' },
     * ];
     */

    test('authenticate should work', async () => {
        // Arrange
        const password = 'theuserpasswOORD!';
        const foundUser = {
            username: 'cool',
            password: hashSync(password, 10),
            auth_status: ActiveStatus,
        } as Partial<AuthUser>;
        const lockedUser = {
            username: 'locked',
            password: hashSync(password, 10),
            auth_status: 'locked',
        } as Partial<AuthUser>;

        const mockUserRepo = jest.fn(
            (): IAuthRepo => ({
                async findByUsername(username: 'found' | 'dberror' | 'locked'): Promise<Result<AuthUser>> {
                    switch (username) {
                        case 'found':
                            return Result.ok(foundUser as AuthUser);
                        case 'locked':
                            return Result.ok(lockedUser as AuthUser);
                        case 'dberror':
                            return Result.fail(`Could not connect to database`);
                        default:
                            return Result.fail(`User ${username} cannot be found`);
                    }
                },
            }),
        );

        // Act
        const authService = new AuthService(mockUserRepo() as any);
        const auth = async (username: string, pwd: string) => {
            return await authService.authenticate(username, pwd);
        };
        const resDbError = await auth('dberror', '');
        const resWrongPwd = await auth('found', 'A');
        const resOk = await auth('found', password);
        const resLocked = await auth('locked', password);

        // Assert
        await expect((resDbError.payload as any).error.message).toEqual(`Could not connect to database`);
        await expect((resWrongPwd.payload as any).error.message).toEqual(`Passwords does not match`);
        await expect((resOk.payload as any).value).toEqual(foundUser);
        await expect((resLocked.payload as any).error.message).toEqual(`Account locked`);
    });
});
