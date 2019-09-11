import React from 'react';
import ReactDOM from 'react-dom';
import App from './app';
import AppProviders from "./context";

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render((
        <AppProviders>
            <App />
        </AppProviders>
    ), div);
    ReactDOM.unmountComponentAtNode(div);
});
