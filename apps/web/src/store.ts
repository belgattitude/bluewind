import { configureStore, Action } from '@reduxjs/toolkit';
import { ThunkAction } from 'redux-thunk';
import { authReducer } from './features/auth/auth.redux';

export const store = configureStore({
    reducer: {
        auth: authReducer,
    },
});

export type AppThunk = ThunkAction<void, RootState, unknown, Action<string>>;

export type RootState = ReturnType<typeof store.getState>;
