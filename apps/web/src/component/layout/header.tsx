import React from 'react';
import { NavLink } from 'react-router-dom';

const Header: React.FC = () => {
    // To add redux / context or whatever
    const logged = false;

    const handleLogout = (e: any) => {
        // do the thing
    };

    return (
        <header>
            <div className="header-text">Interview</div>
            <nav>
                <li>
                    <NavLink to={'/'}>Home</NavLink>
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
