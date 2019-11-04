import { configureStore, Action } from 'redux-starter-kit';
import { ThunkAction } from 'redux-thunk';

export type AppThunk = ThunkAction<void, RootState, null, Action<string>>;

import { authReducer } from './features/auth/auth.redux';

export const store = configureStore({
    reducer: {
        auth: authReducer,
    },
});

export type AppDispatch = typeof store.dispatch;

export type RootState = ReturnType<typeof store.getState>;
