import React from 'react';

function AppProviders(props: any) {
    return <>{props.children};</>;
    /*
    return (
        <AuthProvider>
            <UserProvider>{props.children}</UserProvider>
        </AuthProvider>
    );
     */
}

export default AppProviders;
