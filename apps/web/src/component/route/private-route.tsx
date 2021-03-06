import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { Redirect, Route } from 'react-router';

/* eslint @typescript-eslint/no-explicit-any: 1 */

export const PrivateRoute: React.FC<any> = ({ component: Component, ...rest }: any) => {
    const { userId } = useSelector((state: RootState) => state.auth);
    return (
        <Route {...rest} render={props => (userId !== null ? <Component {...props} /> : <Redirect to="/login" />)} />
    );
};
