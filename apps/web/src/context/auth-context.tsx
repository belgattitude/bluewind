import React, { useContext } from 'react';
import { authApi, AuthRequestDTO, AuthUserDataResponseDTO } from '../features/auth/auth.api';
import { useAsync } from 'react-async';

const localStorageKey = '__bluewind_token__';

type RegisterRequestDTO = {
    login: string;
    password: string;
};


export type AuthContextState = {
    user: {} & AuthUserDataResponseDTO | null;
};

export type AuthContextProps = {
    data: AuthContextState | null;
    login: (params: AuthRequestDTO) => void;
    logout: () => void;
    register: (params: RegisterRequestDTO) => void;
};

const AuthContext = React.createContext<AuthContextProps | null>(null);

async function boostrapUserData(): Promise<AuthContextState> {
    const token = window.localStorage.getItem(localStorageKey) || 'cool';
    const userData = await authApi.getUserData(token).catch(error => {
        window.localStorage.removeItem(localStorageKey);
        authApi.logout(token);
        return null;
    });
    return { user: userData };
}

function AuthProvider(props: { children: any }) {
    const [firstAttemptFinished, setFirstAttemptFinished] = React.useState<boolean>(false);

    const { data = { user: null }, error, isRejected, isPending, isSettled, reload } = useAsync({
        promiseFn: boostrapUserData,
    });

    React.useLayoutEffect(() => {
        if (isSettled) {
            setFirstAttemptFinished(true);
        }
    }, [isSettled]);

    if (!firstAttemptFinished) {
        if (isPending) {
            return <div>Loading spinner</div>;
        }
        if (isRejected) {
            return (
                <div style={{ color: 'red' }}>
                    <p>Uh oh... There's a problem. Try refreshing the app.</p>
                    {error && error.message && <pre>{error.message}</pre>}
                </div>
            );
        }
    }

    // Dispatch methods
    const login = (params: AuthRequestDTO) => {
        authApi
            .login(params)
            .then(({ token }) => {
                window.localStorage.setItem(localStorageKey, token);
            })
            .then(reload);
    };
    const logout = () => {
        const token = window.localStorage.getItem(localStorageKey);
        if (token !== null) {
            authApi.logout(token);
        }
        reload();
    };

    const register = () => {};

    return <AuthContext.Provider value={{ data: data, login, logout, register }} {...props} />;
}

function useAuth(): AuthContextProps {
    const context = useContext(AuthContext);
    if (context === undefined || context === null) {
        throw new Error(`useAuth must be used within an AuthProvider`);
    }
    return context;
}

export { AuthProvider, useAuth };
