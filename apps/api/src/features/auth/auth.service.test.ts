import { AuthService } from './auth.service';
import { AuthUser } from './interface';
import { Result } from '@bluewind/error-flow';
import { IAuthRepo } from './interface';
import { ActiveStatus } from '../../entity/user.entity';
import { hashSync } from 'bcryptjs';

describe('AuthService tests', () => {

    /**
     * @todo refactor this ! should be split in different tests
     */
    it('should pass authentication cases', async () => {
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
            })
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
        expect((resDbError.payload as any).error.message).toEqual(`Could not connect to database`);
        expect((resWrongPwd.payload as any).error.message).toEqual(`Passwords does not match`);
        expect((resOk.payload as any).value).toEqual(foundUser);
        expect((resLocked.payload as any).error.message).toEqual(`Account locked`);
    });
});
