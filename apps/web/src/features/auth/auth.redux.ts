import { createSlice, PayloadAction } from 'redux-starter-kit';
import { authApi, AuthRequestDTO } from './auth.api';
import { AppThunk } from '../../store';
import { getTokenStore, ITokenStore } from '../../core/token-store';
import { JwtParser } from '../../core/utils/jwt/jwt-parser';
import { getUserIdFromJwtPayload } from './utils';

export type AuthState = {
    isLoading: boolean;
    userId: number | null;
    error: string | null;
};

/**
 * Return the initial userId
 * @todo load it async later and check for rememberMe option
 *       or any more advanced techniques.
 */
const getInitialUser = (): AuthState['userId'] => {
    let userId: AuthState['userId'] = null;
    try {
        const token = getTokenStore().getToken();
        if (token !== null) {
            const payload = JwtParser.getPayload(token);
            userId = getUserIdFromJwtPayload(payload);
        }
    } catch (e) {
        userId = null;
    }
    return userId;
};

const initialAuthState: AuthState = {
    isLoading: false,
    error: null,
    userId: getInitialUser(),
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
            error: null,
            userId: action.payload.userId,
        }),
        getAuthFailure: (state, action: PayloadAction<string>) => ({
            isLoading: false,
            error: action.payload,
            userId: null,
        }),
        getAuthLogout: state => ({
            isLoading: false,
            error: null,
            userId: null,
        }),
    },
});

// Action creators

export const { getAuthStart, getAuthFailure, getAuthSuccess, getAuthLogout } = authSlice.actions;
export const authReducer = authSlice.reducer;
export { authSlice };

// Async thunks

/**
 * Run authentication with provided credentials
 * @param loginRequestDto - DTO containing th credentials
 * @param jwtUserIdClaim - The jwt claim containing the usedId: by default 'sub'.
 * @param deps - essentially for mocking internal dependencies
 */
export const runLoginThunk = (
    loginRequestDto: AuthRequestDTO,
    jwtUserIdClaim = 'sub',
    deps?: {
        tokenStore?: ITokenStore;
    }
): AppThunk => async dispatch => {
    dispatch(getAuthStart());
    authApi
        .login(loginRequestDto)
        .then(response => {
            const { token } = response;
            const jwtPayload = JwtParser.getPayload(token);
            const userId = getUserIdFromJwtPayload(jwtPayload, jwtUserIdClaim);
            const { tokenStore = getTokenStore() } = deps || {};
            tokenStore.setToken(token);
            dispatch(getAuthSuccess({ userId }));
        })
        .catch(e => {
            dispatch(getAuthFailure(e.message));
        });
};

/**
 * Execute a logout request
 * @param tokenStore
 * @param deps essentially for mocking internal dependencies
 */
export const runLogoutThunk = (deps?: { tokenStore?: ITokenStore }): AppThunk => async dispatch => {
    try {
        const { tokenStore = getTokenStore() } = deps || {};
        const token = tokenStore.getToken();
        tokenStore.removeToken();
        if (token) {
            const authResult = await authApi.logout(token);
        }
    } finally {
        dispatch(getAuthLogout());
    }
};

/*
export const runLoginAndLoadUserDataThunk = (loginRequestDto: AuthRequestDTO): AppThunk => async dispatch => {
    try {
        dispatch(getAuthStart());
        const response = await authApi.login(loginRequestDto);
        const { token } = response;
        getTokenStore().setToken(token);

        // read user data
        const userData = await authApi.getUserData(token).catch(error => {
            dispatch(runLogoutThunk());
            throw error;
        });

        dispatch(getAuthSuccess(userData));
    } catch (err) {
        const msg = err instanceof Error ? err.message : err;
        dispatch(getAuthFailure(msg));
    }
};
*/
