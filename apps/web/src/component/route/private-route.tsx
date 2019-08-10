import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { Redirect, Route } from 'react-router';

// tslint:disable-next-line:no-any
export const PrivateRoute: React.FC<any> = ({ component: Component, ...rest }: any) => {
    // const { logged } = useSelector((state: RootState) => state.auth);
    const logged = false;
    return <Route {...rest} render={props => (logged ? <Component {...props} /> : <Redirect to="/login" />)} />;
};
