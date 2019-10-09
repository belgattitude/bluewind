import React from 'react';
import { BrowserRouter as Router, NavLink } from 'react-router-dom';
import useRouter from 'use-react-router';
import { thunkLogoutRequest } from '../../features/auth/auth.redux';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';

type HeaderProps = {
    title: string;
};

const Header: React.FC<HeaderProps> = props => {
    // To add redux / context or whatever
    const { logged } = useSelector((state: RootState) => state.auth);
    const dispatch = useDispatch();

    const { history } = useRouter();

    const handleLogout = (e: unknown) => {
        dispatch(thunkLogoutRequest());
    };

    return (
        <header>
            <div className="header-text">{props.title}</div>
            <nav>
                <li>
                    <a onClick={() => history.push('/')}>Home</a>
                </li>
                <li>
                    <a onClick={() => history.push('/students')}>Students</a>
                </li>
                <li>
                    {logged ? (
                        <a href="#" onClick={handleLogout}>
                            Logout
                        </a>
                    ) : (
                        <NavLink to={'/login'}>Login</NavLink>
                    )}
                </li>
            </nav>
        </header>
    );
};

export default Header;
