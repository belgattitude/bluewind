import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { PrivateRoute } from './component/route/private-route';
import { ProfilePage } from './features/profile/profile.page';
import HomePage from './features/home/home.page';
import { StudentPage } from './features/student/student.page';
import { ClassesPage } from './features/classes/classes.page';
import DashboardLayout from './component/dashboard/dashboard-layout';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { RootState, store } from './store';
import { thunkLogoutRequest } from './features/auth/auth.redux';

const AuthenticatedApp: React.FC = () => {
    const dispatch = useDispatch();

    return (
        <div className="app">
            <DashboardLayout
                handleLogout={() => {
                    console.log('dispathing logout');
                    dispatch(thunkLogoutRequest());
                    console.log('end of dispathing logout');
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
    );
};

export default AuthenticatedApp;
