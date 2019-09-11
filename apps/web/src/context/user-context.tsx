import React, {ReactNode} from 'react';

import {AuthContextState, useAuth} from './auth-context';

const UserContext = React.createContext<AuthContextState['user'] | null>(null);


function UserProvider(props: {children: ReactNode}) {
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
