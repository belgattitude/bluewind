import { hot } from 'react-hot-loader/root';
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import { PrivateRoute } from './component/route/private-route';
import { ProfilePage } from './features/profile/profile.page';
import HomePage from './features/home/home.page';
import { StudentPage } from './features/student/student.page';
import { ClassesPage } from './features/classes/classes.page';
import ErrorBoundary from 'react-error-boundary';
import { ErrorBoundaryFallbackDev } from './component/error/error-boundary-fallback-dev';
import { ErrorHandler } from './utils/error-handler';
import DashboardLayout from './component/dashboard/dashboard-layout';
import { useAuth } from './context/auth-context';
import { useUser } from './context/user-context';

const FallbackComponent = ErrorBoundaryFallbackDev;

const App: React.FC = () => {
    const auth = useAuth();
    const user = useUser();

    console.log('auth', auth);

    if (user !== null) {
        return (
            <div>
                Unauthenticated
                <button
                    onClick={() => {
                        auth.login({ login: 'test', password: 'test' });
                    }}
                >
                    authenticate
                </button>
            </div>
        );
    }

    return (
        <Provider store={store}>
            <div className="app">
                <ErrorBoundary onError={ErrorHandler} FallbackComponent={FallbackComponent}>
                    <DashboardLayout
                        handleLogout={() => {
                            auth.logout();
                        }}
                    >
                        <Router>
                            <Switch>
                                <Route path="/" exact component={HomePage} />
                                <Route path="/student/:id" component={ProfilePage} />
                                <Route path="/students" component={StudentPage} />
                                <Route path="/classes" component={ClassesPage} />
                                <PrivateRoute path="/private" component={ProfilePage} />
                            </Switch>
                        </Router>
                    </DashboardLayout>
                </ErrorBoundary>
            </div>
        </Provider>
    );
};

export default hot(App);
