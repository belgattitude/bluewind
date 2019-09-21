import React from 'react';
import { useAuth } from './core/context/auth-context';

const UnAuthenticatedApp: React.FC = () => {
    const auth = useAuth();

    return (
        <div className="unauthenticated-app">
            Unauthenticated
            <form>
                <input name="login" type="text" value="" />
                <input name="password" type="text" value="" />
                <button>Submit</button>
            </form>
        </div>
    );
};

export default UnAuthenticatedApp;
