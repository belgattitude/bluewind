import React from 'react';
import { NavLink } from 'react-router-dom';

type HeaderProps = {
    title: string;
};

const Header: React.FC<HeaderProps> = props => {
    // To add redux / context or whatever
    const logged = false;

    const handleLogout = (e: any) => {
        // do the thing
    };

    return (
        <header>
            <div className="header-text">{props.title}</div>
            <nav>
                <li>
                    <NavLink to={'/'}>Home</NavLink>
                </li>
                <li>
                    <NavLink to={'/students'}>Student</NavLink>
                </li>
                <li>
                    <NavLink to={'/classes'}>Classes</NavLink>
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
