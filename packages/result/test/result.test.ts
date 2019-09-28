import { Result } from '../src/result';

describe('Result tests', () => {
    type User = {
        username: string;
    };

    class ExampleError extends Error {
        constructor(message: string) {
            super(message);
            Object.setPrototypeOf(this, ExampleError.prototype);
            this.name = this.constructor.name;
        }
    }

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

    test('Result map().', () => {
        // Arrange
        const success = Result.ok<User>({ username: 'Jest' });
        // Act
        const result = success
            .map<string>(r => {
                return `Username is ${r.username}`;
            })
            .map<string[]>(r => {
                return r.toLowerCase().split(' ');
            })
            .mapErr(e => {
                throw new Error(`This cannot happen: ${e.message}`);
            })
            .unwrap();
        // Assert
        expect(result).toEqual(['username', 'is', 'jest']);
    });

    test('Result mapErr().', () => {
        // Arrange
        const fail = Result.fail(new ExampleError(`I'm a failure :)`));
        const mockCallback = jest.fn(() => {});

        // Act
        const result = fail
            .map<string>(r => {
                throw new Error(`This cannot happen: ${r}`);
            })
            .mapErr(e => {
                if (e instanceof ExampleError) {
                    mockCallback();
                    return new Error('cool');
                }
                return e;
            })
            .map<string>(r => {
                throw new Error(`This cannot happen too:  ${r}`);
            })
            .unwrap();

        // Assert
        expect(mockCallback.mock.calls.length).toBe(1);
        expect(result).toBeInstanceOf(Error);
        expect((result as any).message).toEqual('cool');
        expect((result as any).name).toEqual('Error');
    });
});
