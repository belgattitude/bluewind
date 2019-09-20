import { AuthService } from './auth.service';
import { User } from './user.interface';
import { Result } from '../../core/result';
import { IUserRepo } from './user.repo';
import {ActiveStatus, AuthStatuses} from '../../entity/user.entity';
import { hashSync } from 'bcryptjs';

test('authenticateAndReturnUser should work', async () => {
    /**
     * readonly users: User[] = [
     * { id: 1, username: 'valid_user', password: 'valid_pwd', auth_status: 'active' },
     * { id: 2, username: 'expired_user', password: 'valid_pwd', auth_status: 'expired' },
     * { id: 3, username: 'locked_user', password: 'valid_pwd', auth_status: 'locked' },
     * ];
     */
    const password = 'theuserpasswOORD!';
    const foundUser = {
        username: 'cool',
        password: hashSync(password, 10),
        auth_status: ActiveStatus,
    } as Partial<User>;
    const lockedUser = {
        username: 'locked',
        password: hashSync(password, 10),
        auth_status: 'locked',
    } as Partial<User>;


    // Arrange
    const mockUserRepo = jest.fn(
        (): IUserRepo => ({
            async findByUsername(username: 'found' | 'dberror' | 'locked'): Promise<Result<User>> {
                switch (username) {
                    case 'found':
                        return Result.ok(foundUser as User);
                    case 'dberror':
                        return Result.fail(`Could not connect to database`);
                    case 'locked':
                        return Result.fail(`Account locked`);
                    default:
                        return Result.fail(`User ${username} cannot be found`);
                }
            },
        }),
    );

    // Act
    const authService = new AuthService(mockUserRepo() as any);
    const auth = async (username: string, password: string) => {
        return await authService.authenticateAndReturnUser(username, password);
    };

    // Assert
    const result1 = await auth('dberror', '');
    expect((result1.payload as any).error.message).toEqual(`Could not connect to database`);

    const result2 = await auth('found', 'A');
    await expect((result2.payload as any).error.message).toEqual(`Passwords does not match`);

    const result3 = await auth('found', password);
    await expect((result3.payload as any).value).toEqual(foundUser);

    const result4 = await auth('locked', password);
    await expect((result4.payload as any).error.message).toEqual(`Account locked`);
});
