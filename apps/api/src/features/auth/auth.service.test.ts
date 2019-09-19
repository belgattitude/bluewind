import { AuthService } from './auth.service';
import { IUserRepo } from './user.repo';
import { User } from './user.interface';
import { Result } from '../../core/result';

test('authenticateAndReturnUser should work', async () => {
    const foundUser = {
        username: 'cool',
        password: 'theuserpasswOORD!',
        status: 'valid',
    } as User;

    // Arrange
    const mockUserRepo = jest.fn(() => ({
        async findByUsername(username: 'found' | 'dberror'): Promise<Result<Partial<User>>> {
            return new Promise(resolve => {
                switch (username) {
                    case 'found':
                        return resolve(Result.ok(foundUser));
                    case 'dberror':
                        return resolve(Result.fail(`Could not connect to database`));
                    default:
                        return resolve(Result.fail(`User ${username} cannot be found`));
                }
            });
        },
    }));

    // Act
    const authService = new AuthService(mockUserRepo() as any);
    const auth = async (username: string, password: string) => {
        return await authService.authenticateAndReturnUser(username, password);
    };

    // Assert
    const result1 = await auth('dberror', '');
    await expect((result1.payload as any).error.message).toEqual('Could not connect to database');

    const result2 = await auth('found', 'A');
    await expect((result2.payload as any).error.message).toEqual('Passwords does not match');

    const result3 = await auth('found', foundUser.password);
    await expect((result3.payload as any).value).toEqual(foundUser);
});
