import React, { SyntheticEvent, useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import styled from '@emotion/styled';
import { Button, CircularProgress, TextField } from '../../component/ui';
import { keyof } from 'io-ts';

const initialFormData = {
    username: '',
    password: '',
};
type FormData = typeof initialFormData;

type LoginFormProps = {
    className?: string;
    onSubmit: (params: FormData) => void;
};

function useTextField(props: { name: string; placeHolder: string; type: 'password' | 'text' }) {
    const [value, setValue] = useState('');
    const input = (
        <TextField
            name={props.name}
            type={props.type}
            value={value}
            onChange={e => setValue(e.target.value)}
            placeholder={props.placeHolder}
        />
    );
    return [value, input];
}

const LoginForm: React.FC<LoginFormProps> = props => {
    const { onSubmit, className = '' } = props;

    const { isLoading, error } = useSelector((state: RootState) => state.auth);

    const [data, setData] = useState<FormData>(initialFormData);
    const [touchedValues, setTouchedValues] = useState<Partial<{ [k in keyof FormData]: boolean }>>({});
    const [errors, setErrors] = useState<Partial<{ [k in keyof FormData]: string | null }>>({});

    const handleSubmit = useCallback(
        (e: SyntheticEvent) => {
            onSubmit(data);
            e.preventDefault();
        },
        [data]
    );

    const validate = (field: string, value: string | null): Partial<{ [k in keyof FormData]: string }> => {
        const errors: Partial<{ [k in keyof FormData]: string }> = {};
        switch (field) {
            case 'username':
                if (!value) {
                    errors.username = 'Username required';
                } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
                    errors.username = 'Invalid email address';
                }
                break;
            case 'password':
                if (!value) {
                    errors.password = 'Password required';
                }
        }
        return errors;
    };

    const handleChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            const target = e.target;
            const value = target.type === 'checkbox' ? target.checked : target.value;
            const name = target.name;
            setData({ ...data, [name]: value });
        },
        [data.username, data.password]
    );

    const handleBlur = useCallback(
        (event: React.SyntheticEvent<HTMLInputElement>) => {
            const target = event.currentTarget;
            const name = target.name;
            setTouchedValues({
                ...touchedValues,
                [name]: true,
            });
            const e = validate(name, target.value);
            setErrors({
                ...errors,
                ...e,
            });
        },
        [data.username, data.password]
    );

    return (
        <div className={className}>
            <form onSubmit={handleSubmit}>
                <label>
                    <span className={'label'}>Login:</span>
                    <TextField
                        name="username"
                        value={data.username}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder={'Username or email'}
                    />
                </label>
                <label>
                    <span className={'label'}>Password:</span>
                    <TextField
                        name="password"
                        type="password"
                        value={data.password}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder={'Password'}
                    />
                </label>

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

export const StyledLoginForm = styled(LoginForm)`
    display: flex;
    align-items: center;
    justify-content: center;
    form {
        padding: 30px;
        display: flex;
        flex-direction: column;
        label {
            padding: 5px 0;
            display: flex;
            flex-direction: column;
            span.label {
                margin-bottom: 5px;
            }
            input {
                flex-grow: 1;
                line-height: 1.4em;
            }
        }
    }
`;
