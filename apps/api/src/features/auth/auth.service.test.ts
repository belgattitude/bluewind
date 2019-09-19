import { AuthService } from './auth.service';
import { IUserRepo } from './user.repo';
import { User } from './user.interface';
import { Result } from '../../core/result';

test('authenticateAndReturnUser should work', async () => {
    const foundUser = {
        username: 'cool',
        password: 'theuserpasswOORD!',
        status: 'valid',
    } as Partial<User>;

    // Arrange
    const mockUserRepo = jest.fn(() => ({
        findByUsername(username: 'found' | 'dberror'): Result<Partial<User>> {
                switch (username) {
                    case 'found':
                        return Result.ok(foundUser);
                    case 'dberror':
                        return Result.fail(`Could not connect to database`);
                    default:
                        return Result.fail(`User ${username} cannot be found`);
                }
        },
    }));

    // Act
    const authService = new AuthService(mockUserRepo() as any);
    const auth = async (username: string, password: string) => {
        return await authService.authenticateAndReturnUser(username, password);
    };

    // Assert
    const result1 = await auth('dberror', '');
    expect((result1.payload as any).error.message).toEqual('Could not connect to database');

    const result2 = await auth('found', 'A');
    await expect((result2.payload as any).error.message).toEqual('Passwords does not match');

    const result3 = await auth('found', foundUser.password!);
    await expect((result3.payload as any).value).toEqual(foundUser);
});
