import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { PrivateRoute } from './component/route/private-route';
import { ProfilePage } from './features/profile/profile.page';
import { HomePage } from './features/home/home.page';
import { StudentPage } from './features/student/student.page';
import { Layout } from './component/layout/layout';

const AuthenticatedApp: React.FC = () => {
    return (
        <div className="app">
            <Router>
                <Layout>
                    <Switch>
                        <Route path="/" exact component={HomePage} />
                        <Route path="/student/:id" component={ProfilePage} />
                        <Route path="/students" component={StudentPage} />
                        <PrivateRoute path="/private" component={ProfilePage} />
                    </Switch>
                </Layout>
            </Router>
        </div>
    );
};

export default AuthenticatedApp;
