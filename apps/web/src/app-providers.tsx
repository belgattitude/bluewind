import React from 'react';
import { store } from './store';
import { Provider as ReduxProvider } from 'react-redux';
import { ThemeProvider } from 'emotion-theming';
import { styledSystemTheme } from './component/ui/theme';

function AppProviders(props: any) {
    return (
        <ReduxProvider store={store}>
            <ThemeProvider theme={styledSystemTheme}>{props.children}</ThemeProvider>
        </ReduxProvider>
    );
}

export default AppProviders;
