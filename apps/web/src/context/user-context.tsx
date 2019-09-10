import React from 'react';

import { AuthContextProps, useAuth, UserData } from './auth-context';

const UserContext = React.createContext<UserData | null>(null);

type UserProviderProps = {};

function UserProvider(props: UserProviderProps) {
    const auth = useAuth();
    return <UserContext.Provider value={auth.data ? auth.data.user : null} {...props} />;
}

function useUser() {
    const context = React.useContext(UserContext);
    if (context === undefined) {
        throw new Error(`useUser must be used within a UserProvider`);
    }
    return context;
}

export { UserProvider, useUser };
