import { Result } from './result';

type User = {
    username: string;
};

test('Payload.isError should be true on error, false on success.', () => {
    expect(Result.ok<User>({ username: 'Jest' }).payload.isError).toBeFalsy();
    expect(Result.fail(new Error('Error')).payload.isError).toBeTruthy();
});
