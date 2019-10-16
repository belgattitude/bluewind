import React from 'react';
import './username.page.scss';
import styled from '@emotion/styled';

const UnstyledLoginPage: React.FC = () => {
    const logged = true;
    return (
        <>
            {logged ? (
                <div>Already logged</div>
            ) : (
                <div className="login-page-ctn">
                    <form>
                        <input type="text" placeholder="username or email" />
                        <input type="password" placeholder="password" />
                        <button>Login</button>
                    </form>
                    <div className="login-page-footer">
                        <button>No account yet ?</button>
                    </div>
                </div>
            )}
        </>
    );
};

export const LoginPage = styled(UnstyledLoginPage)``;
