import React from 'react';
import './App.css';
import StudentList from '../student-list/student-list';
import { Container, CssBaseline } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/styles';
import { muiTheme } from './themes/mui-theme';
import { hot } from 'react-hot-loader/root';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { appRoutes } from '../../routes';
import AppHeader from './header/app-header';
import Layout from './layout/layout';

const App: React.FC = () => {
    return (
        <div className="App">
            <Router>
                <>
                    <CssBaseline />
                    <ThemeProvider theme={muiTheme}>
                        <Layout menuItems={appRoutes}>
                            {appRoutes.map((route, index) => (
                                <Route
                                    key={`${index}-${route.path}`}
                                    path={route.path}
                                    exact={route.exact}
                                    component={route.main}
                                />
                            ))}
                        </Layout>
                    </ThemeProvider>
                </>
            </Router>
        </div>
    );
};

export default hot(App);
