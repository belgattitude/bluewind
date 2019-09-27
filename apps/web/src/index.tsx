import React from 'react';
import ReactDOM from 'react-dom';
import './assets/sass/global.scss';
import 'typeface-muli';

import App from './app';
import AppProviders from './app-providers';
import { Provider } from 'react-redux';
import { store } from './store';

ReactDOM.render(
    <>
        <Provider store={store}>
            <AppProviders>
                <App />
            </AppProviders>
        </Provider>
    </>,

    document.getElementById('root')
);
