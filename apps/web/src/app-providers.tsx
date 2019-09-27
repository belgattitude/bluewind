import React from 'react';
import { store } from './store';
import { Provider } from 'react-redux';

function AppProviders(props: any) {
    return <Provider store={store}>{props.children};</Provider>;
}

export default AppProviders;
