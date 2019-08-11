import React from 'react';
import { hot } from 'react-hot-loader/root';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Layout from './component/layout/layout';
import { Provider } from 'react-redux';
import { store } from './store';
import { PrivateRoute } from './component/route/private-route';
import { ProfilePage } from './features/profile/profile.page';
import { HomePage } from './features/home/home.page';
import { StudentPage } from './features/student/student.page';
import { ClassesPage } from './features/classes/classes.page';
import ErrorBoundary from 'react-error-boundary';
import {ErrorBoundaryFallbackDev} from "./component/error/error-boundary-fallback-dev";

const myErrorHandler = (error: Error, componentStack: string) => {
    // Do something with the error
    // E.g. log to an error logging client here
};

const FallbackComponent = ErrorBoundaryFallbackDev;

const App: React.FC = () => {
    return (
        <Provider store={store}>
            <div className="app">
                <ErrorBoundary onError={myErrorHandler} FallbackComponent={FallbackComponent}>
                    <Router>
                        <Layout>
                            <Switch>
                                <Route path="/" exact component={HomePage} />
                                <Route path="/student/:id" component={ProfilePage} />
                                <Route path="/students" component={StudentPage} />
                                <Route path="/classes" component={ClassesPage} />
                                <PrivateRoute path="/private" component={ProfilePage} />
                            </Switch>
                        </Layout>
                    </Router>
                </ErrorBoundary>
            </div>
        </Provider>
    );
};

export default hot(App);
