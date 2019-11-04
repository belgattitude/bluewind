import { createSlice, PayloadAction } from 'redux-starter-kit';
import { authApi, AuthRequestDTO } from './auth.api';
import { AppThunk } from '../../store';
import { getTokenStore } from '../../core/token-store';
import { AuthContextState } from '../../core/context/auth/auth-context';

export type AuthState = {
    isLoading: boolean;
    userId: number | null;
    error: string | null;
};

const initialAuthState: AuthState = {
    isLoading: false,
    error: null,
    userId: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState: initialAuthState,
    reducers: {
        getAuthStart: state => ({
            isLoading: true,
            error: null,
            userId: null,
        }),
        getAuthSuccess: (state, action: PayloadAction<{ userId: number }>) => ({
            isLoading: false,
            userId: action.payload.userId,
            error: null,
        }),
        getAuthFailure: (state, action: PayloadAction<string>) => ({
            isLoading: false,
            userId: null,
            error: action.payload,
        }),
        getAuthLogout: state => ({
            userId: null,
            isLoading: false,
            error: null,
        }),
    },
});

// Action creators

export const { getAuthStart, getAuthFailure, getAuthSuccess, getAuthLogout } = authSlice.actions;
export const authReducer = authSlice.reducer;

// Thunks

/**
 * Authenticate user thunk
 */
export const authenticateThunk = (loginRequestDto: AuthRequestDTO): AppThunk => async dispatch => {
    dispatch(getAuthStart());
    authApi
        .login(loginRequestDto)
        .then(response => {
            const { token } = response;
            dispatch(getAuthSuccess({ userId: 1 }));
        })
        .catch(e => {
            dispatch(getAuthFailure(e));
        });
};

export const thunkAuthRequestUserData = (loginRequestDto: AuthRequestDTO): AppThunk => async dispatch => {
    try {
        dispatch(getAuthStart());
        const response = await authApi.login(loginRequestDto);
        const { token } = response;
        getTokenStore().setToken(token);

        // read user data
        const userData = await authApi.getUserData(token).catch(error => {
            dispatch(thunkLogoutRequest());
            throw error;
        });

        dispatch(getAuthSuccess(userData));
    } catch (err) {
        const msg = err instanceof Error ? err.message : err;
        dispatch(getAuthFailure(msg));
    }
};

export const thunkLogoutRequest = (): AppThunk => async dispatch => {
    try {
        const token = getTokenStore().getToken();
        getTokenStore().removeToken();
        if (token) {
            const authResult = await authApi.logout(token);
        }
    } finally {
        dispatch(getAuthLogout());
    }
};

async function bootstrapUserData(): Promise<AuthContextState> {
    const token = getTokenStore().getToken();
    if (token === null) {
        return { user: null };
    }
    const userData = await authApi.getUserData(token).catch(error => {
        getTokenStore().removeToken();
        authApi.logout(token);
        return null;
    });
    return { user: userData };
}
