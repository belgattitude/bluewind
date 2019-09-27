import React, { ReactNode, useContext } from 'react';
import { authApi, AuthRequestDTO, AuthUserDataResponseDTO } from '../../../features/auth/auth.api';
import { useAsync } from 'react-async';
import { FullPageSpinner } from '../../../component/loading-spinner';
import { getTokenStore } from '../../token-store';

type RegisterRequestDTO = {
    username: string;
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

function AuthProvider(props: { children: ReactNode }) {
    const [firstAttemptFinished, setFirstAttemptFinished] = React.useState<boolean>(false);

    const { data = { user: null }, error, isRejected, isPending, isSettled, reload } = useAsync({
        promiseFn: bootstrapUserData,
    });

    React.useLayoutEffect(() => {
        if (isSettled) {
            setFirstAttemptFinished(true);
        }
    }, [isSettled]);

    if (!firstAttemptFinished) {
        if (isPending) {
            return <FullPageSpinner />;
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
                getTokenStore().setToken(token);
            })
            .then(reload)
            .catch(reason => {
                alert(reason);
            });
    };
    const logout = () => {
        const token = getTokenStore().getToken();
        if (token !== null) {
            getTokenStore().removeToken();
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
