import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { PrivateRoute } from './component/route/private-route';
import { ProfilePage } from './features/profile/profile.page';
import HomePage from './features/home/home.page';
import { StudentPage } from './features/student/student.page';
import { ClassesPage } from './features/classes/classes.page';
import DashboardLayout from './component/dashboard/dashboard-layout';
import { useAuth } from './context/auth-context';
import { Provider } from 'react-redux';
import { store } from './store';

const AuthenticatedApp: React.FC = () => {
    const auth = useAuth();

    return (
        <Provider store={store}>
            <div className="app">
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
            </div>
        </Provider>
    );
};

export default AuthenticatedApp;
