import { authReducer, getAuthStart, getAuthSuccess, getAuthFailure } from './auth.redux';
import { AnyAction } from 'redux';

describe('Redux Auth', () => {
    describe('Action creators and reducers', () => {
        const unauthenticatedState = {
            error: null,
            isLoading: false,
            userId: null,
        };

        it('Should return an unauthenticated initial state', () => {
            expect(authReducer(undefined, {} as AnyAction)).toEqual(unauthenticatedState);
        });

        it('Should return a loading state and reset userId and error on getAuthStart', () => {
            expect(authReducer({ userId: 10, isLoading: false, error: 'X' }, getAuthStart)).toEqual({
                isLoading: true,
                error: null,
                userId: null,
            });
        });

        it('Should return error and reset isLoading and userId on getAuthFailure', () => {
            expect(authReducer({ error: null, userId: 10, isLoading: true }, getAuthFailure('XXX'))).toEqual({
                isLoading: false,
                error: 'XXX',
                userId: null,
            });
        });

        it('Should return the userId and reset isLoading and error on getAuthSuccess', () => {
            expect(authReducer({ userId: 10, isLoading: true, error: 'X' }, getAuthSuccess({ userId: 3 }))).toEqual({
                isLoading: false,
                error: null,
                userId: 3,
            });
        });
    });

    describe('Async actions', () => {
        // @todo thunks
    });
});
