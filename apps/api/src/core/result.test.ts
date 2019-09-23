import { Result } from './result';

type User = {
    username: string;
};

test('Payload.isError must be true on error, false on success.', () => {
    expect(Result.ok<User>({ username: 'Jest' }).payload.isError).toBeFalsy();
    expect(Result.fail(new Error('Error')).payload.isError).toBeTruthy();
});

test('Payload error must always give an Error object.', () => {
    // Arrange / Act
    const failFromError = Result.fail(new Error('from error')).payload;
    const failFromString = Result.fail('from string').payload;
    // Assert
    expect((failFromError as any).error).toBeInstanceOf(Error);
    expect((failFromString as any).error).toBeInstanceOf(Error);
});

