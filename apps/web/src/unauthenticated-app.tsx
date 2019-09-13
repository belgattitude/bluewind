import React from 'react';
import { useAuth } from './context/auth-context';

const UnAuthenticatedApp: React.FC = () => {
    const auth = useAuth();

    return (
        <div className="unauthenticated-app">
            Unauthenticated
            <button
                onClick={() => {
                    auth.login({ login: 'test', password: 'test' });
                }}
            >
                authenticate
            </button>
        </div>
    );
};

export default UnAuthenticatedApp;
