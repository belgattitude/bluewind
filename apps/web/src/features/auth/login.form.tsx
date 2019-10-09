import React, { SyntheticEvent, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import styled from '@emotion/styled';
import { Button, CircularProgress, TextField } from '../../component/ui';

type LoginFormProps = {
    className?: string;
    onSubmit: (params: { username: string; password: string }) => void;
};

const UnstyledLoginForm: React.FC<LoginFormProps> = props => {
    const { onSubmit, className = '' } = props;

    const { isLoading, error } = useSelector((state: RootState) => state.auth);

    const [username, setUserName] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const handleSubmit = (e: SyntheticEvent) => {
        onSubmit({ username, password });
        e.preventDefault();
    };

    return (
        <div className={className}>
            <form onSubmit={handleSubmit}>
                <label htmlFor={'login'}>Username:</label>
                <TextField
                    id="login"
                    name="login"
                    color={'black'}
                    bg={'white'}
                    type="text"
                    value={username}
                    onChange={e => setUserName(e.target.value)}
                    placeholder={'Username or email'}
                />
                <label htmlFor={'password'}>Password:</label>
                <TextField
                    id="password"
                    name="password"
                    type="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder={'Password'}
                />

                <Button type="submit" variant={'primary'} mt={3} size={'medium'}>
                    Login
                    {isLoading && (
                        <span style={{ float: 'right' }}>
                            <CircularProgress color={'white'} size={'0.8em'} />
                        </span>
                    )}
                </Button>
                {error}
            </form>
        </div>
    );
};

export const LoginForm = styled(UnstyledLoginForm)`
    display: flex;
    align-items: center;
    justify-content: center;
    form {
        padding: 30px;
        display: flex;
        flex-direction: column;
        label {
            padding: 5px 0px;
        }
        input {
            flex-grow: 1;
            line-height: 1.4em;
        }
    }
`;
