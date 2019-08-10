import React from 'react';
import { hot } from 'react-hot-loader/root';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Layout from './component/layout/layout';
import { Provider } from 'react-redux';
import { store } from './store';
import { PrivateRoute } from './component/route/private-route';
import { ProfilePage } from './features/profile/profile.page';
import { HomePage } from './features/home/home.page';

const App: React.FC = () => {
    return (
        <Provider store={store}>
            <div className="app">
                <Router>
                    <Layout>
                        <Route path="/" exact component={HomePage} />
                        <PrivateRoute path="/private" component={ProfilePage} />
                    </Layout>
                </Router>
            </div>
        </Provider>
    );
};

export default hot(App);
