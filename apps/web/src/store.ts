import { configureStore } from 'redux-starter-kit';

//import authReducer from './features/login/login.ducks';

export const store = configureStore({
    reducer: {
        //auth: authReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
