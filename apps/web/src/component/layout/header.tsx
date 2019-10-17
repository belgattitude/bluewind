import React from 'react';
import { thunkLogoutRequest } from '../../features/auth/auth.redux';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import styled from '@emotion/styled';
import { Button } from '../ui/button';
import { useHistory, useLocation } from 'react-router';

type HeaderProps = {
    title: string;
    className?: string;
};

const routes = [{ path: '/', label: 'Home' }, { path: '/students', label: 'Students' }];

const UnstyledHeader: React.FC<HeaderProps> = props => {
    const { className } = props;

    const { logged, username } = useSelector((state: RootState) => state.auth);
    const dispatch = useDispatch();

    const location = useLocation();
    const history = useHistory();

    const handleLogout = (e: unknown) => {
        dispatch(thunkLogoutRequest());
    };

    return (
        <header className={className}>
            <div className="header-brand">{props.title}</div>
            <div className="header-nav">
                {routes.map(({ path, label }, idx) => {
                    const cls = path === location.pathname ? 'tab tab__active' : 'tab';
                    return (
                        <div key={path} role={'tab'} tabIndex={idx} className={cls} onClick={() => history.push(path)}>
                            {label}
                        </div>
                    );
                })}
            </div>
            <div className="header-user">
                {logged ? (
                    <Button size={'medium'} onClick={handleLogout}>
                        Logout {username}
                    </Button>
                ) : (
                    <Button size={'medium'} onClick={() => history.push('/logout')}>
                        Logout
                    </Button>
                )}
            </div>
        </header>
    );
};

export const Header = styled(UnstyledHeader)`
    display: flex;
    flex-direction: row;
    width: 100%;
    color: #333;
    font-weight: 300;
    align-items: stretch;
    box-shadow: rgb(0, 0, 0) 0px 5px 20px -10px;
    > div {
        margin: 5px;
    }
    .header-brand {
        border-bottom: 1px solid white;
        padding: 5px;
        margin: 5px;
        font-weight: 500;
        align-self: center;
    }

    .header-nav {
        flex: 1 1 100%;
        display: flex;
        flex-wrap: wrap;

        .tab {
            padding: 5px;
            margin: 5px;
            border-bottom: 1px solid #eee;
            &:hover {
                cursor: pointer;
            }
            &.tab__active {
                background-color: white;
                border-bottom: 1px solid deeppink;
            }
        }
    }
    .header-user {
        flex-wrap: nowrap;
    }
`;
