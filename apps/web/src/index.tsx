import React from 'react';
import ReactDOM from 'react-dom';
import './assets/sass/global.scss';
import 'typeface-muli';

import App from './app';
import AppProviders from './core/context';
import DevTools from 'react-async-devtools';

ReactDOM.render(
    <>
        <DevTools />
        <AppProviders>
            <App />
        </AppProviders>
    </>,

    document.getElementById('root')
);
