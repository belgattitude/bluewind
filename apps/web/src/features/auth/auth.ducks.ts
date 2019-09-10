import { createSlice, PayloadAction, Action } from 'redux-starter-kit';
import { ThunkAction } from 'redux-thunk';
import { authApi, AuthRequestDTO } from './auth.api';
import { RootState } from '../../store';

type AuthState = {
    logged: boolean;
    isLoading: boolean;
    username: string | null;
    error: Error | null;
};

const initialAuthState: AuthState = {
    logged: false,
    isLoading: false,
    username: null,
    error: null,
};

const authSlice = createSlice({
    slice: 'auth',
    initialState: initialAuthState,
    reducers: {
        getAuthStart: state => {
            state.isLoading = true;
        },
        getAuthSuccess(state, { payload }: PayloadAction<any>) {
            state.isLoading = false;
            state.logged = true;
            state.error = null;
            // still to do
            state.username = payload.username || null;
        },
        getAuthFailure: (state, action: PayloadAction<Error>) => {
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

export const runThunkAuthRequestAction = (
    loginRequestDto: AuthRequestDTO
): ThunkAction<void, RootState, null, Action<string>> => async dispatch => {
    try {
        dispatch(getAuthStart);
        const authResult = await authApi.login(loginRequestDto);
        dispatch(getAuthSuccess(authResult));
    } catch (err) {
        dispatch(getAuthFailure);
    }
};
