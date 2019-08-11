import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { Redirect, Route } from 'react-router';

/* eslint @typescript-eslint/no-explicit-any: 1 */

export const PrivateRoute: React.FC<any> = ({ component: Component, ...rest }: any) => {
    // const { logged } = useSelector((state: RootState) => state.auth);
    const logged = false;
    return <Route {...rest} render={props => (logged ? <Component {...props} /> : <Redirect to="/login" />)} />;
};
