import React from 'react';
import { AuthProvider } from './auth-context';

function AppProviders(props: any) {
    return <AuthProvider>{props.children}</AuthProvider>;
}

export default AppProviders;
