import React from 'react';
import { AuthProvider } from './auth-context';
import { UserProvider } from './user-context';

function AppProviders(props: any) {
    return (
        <AuthProvider>
            <UserProvider>{props.children}</UserProvider>
        </AuthProvider>
    );
}

export default AppProviders;
