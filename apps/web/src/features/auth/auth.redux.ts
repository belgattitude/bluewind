import { createSlice, PayloadAction } from 'redux-starter-kit';
import { authApi, AuthRequestDTO, AuthUserDataResponseDTO } from './auth.api';
import { AppThunk } from '../../store';
import { getTokenStore } from '../../core/token-store';
import { AuthContextState } from '../../core/context/auth/auth-context';

type AuthState = {
    logged: boolean;
    isLoading: boolean;
    username: string | null;
    error: string | null;
};

const initialAuthState: AuthState = {
    logged: false,
    isLoading: false,
    username: null,
    error: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState: initialAuthState,
    reducers: {
        getAuthStart: state => {
            state.isLoading = true;
        },
        getAuthSuccess(state, { payload }: PayloadAction<AuthUserDataResponseDTO>) {
            state.isLoading = false;
            state.logged = true;
            state.error = null;
            state.username = payload.username;
        },
        getAuthFailure: (state, action: PayloadAction<string>) => {
            state.isLoading = false;
            state.error = action.payload;
        },
        getAuthLogout: state => {
            state.logged = false;
            state.username = null;
            state.isLoading = false;
        },
    },
});

// Action creators

export const { getAuthStart, getAuthFailure, getAuthSuccess, getAuthLogout } = authSlice.actions;
export default authSlice.reducer;

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
