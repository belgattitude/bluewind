import { createMuiTheme } from '@material-ui/core';
import { blue, deepOrange, indigo, orange, pink } from '@material-ui/core/colors';

export const muiTheme = createMuiTheme({
    palette: {
        secondary: {
            main: blue[900],
        },
        primary: {
            main: pink[700],
        },
    },
    typography: {
        fontFamily: ['"Roboto"', 'sans-serif'].join(','),
    },
});
