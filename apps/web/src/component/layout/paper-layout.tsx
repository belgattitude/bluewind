import React from 'react';
import {createMuiTheme, createStyles, makeStyles, Theme, useTheme, withStyles} from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

let theme = createMuiTheme({
});

theme = {
    ...theme,
    overrides: {
        MuiButton: {
            label: {
                textTransform: 'none',
            },
            contained: {
                boxShadow: 'none',
                '&:active': {
                    boxShadow: 'none',
                },
            },
        },
    },
    props: {
    },
    mixins: {
        ...theme.mixins,
        toolbar: {

        },
    },
};

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
            minHeight: '100vh',
        },
        appContent: {
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
        },
        mainContent: {
            flex: 1,
            padding: '0',
            background: 'white',
        },
    }),
);


const PaperLayout: React.FC = (props) => {
        const classes = useStyles(useTheme());
        return (
            <ThemeProvider theme={theme}>
                <div className={classes.root}>
                    <CssBaseline />
                    <div className={classes.appContent}>
                        <main className={classes.mainContent}>
                            {props.children}
                        </main>
                    </div>
                </div>
            </ThemeProvider>
        );
}


export default PaperLayout;
