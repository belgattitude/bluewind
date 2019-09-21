import React, { SyntheticEvent, useState } from 'react';
import { useAuth } from './core/context/auth-context';

type LoginFormProps = {
    onSubmit: (params: { username: string; password: string }) => void;
};

const LoginForm: React.FC<LoginFormProps> = props => {
    const [username, setUserName] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const handleSubmit = (e: SyntheticEvent) => {
        props.onSubmit({ username, password });
        e.preventDefault();
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Username:
                <input
                    name="login"
                    type="text"
                    value={username}
                    onChange={e => setUserName(e.target.value)}
                    placeholder={'Username or email'}
                    required
                />
            </label>
            <label>
                Password:
                <input
                    name="password"
                    type="text"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder={'Password'}
                    required
                />
            </label>
            <input type="submit" value={'Submit'} />
        </form>
    );
};

const UnAuthenticatedApp: React.FC = () => {
    const auth = useAuth();

    return (
        <div className="unauthenticated-app">
            Unauthenticated
            <LoginForm
                onSubmit={credentials => {
                    auth.login(credentials);
                }}
            />
        </div>
    );
};

export default UnAuthenticatedApp;
