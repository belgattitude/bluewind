import { configureStore } from 'redux-starter-kit';

import authReducer from './features/auth/auth.ducks';

export const store = configureStore({
    reducer: {
        auth: authReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
