import { hot } from 'react-hot-loader/root';
import React from 'react';
import ErrorBoundary from 'react-error-boundary';
import { ErrorBoundaryFallbackDev } from './component/error/error-boundary-fallback-dev';
import { ErrorHandler } from './utils/error-handler';
import { useUser } from './context/user-context';

const FallbackComponent = ErrorBoundaryFallbackDev;
const loadAuthenticatedApp = () => import('./authenticated-app');
const AuthenticatedApp = React.lazy(loadAuthenticatedApp);
const UnauthenticatedApp = React.lazy(() => import('./unauthenticated-app'));

const App: React.FC = () => {
    const user = useUser();

    // pre-load the authenticated side in the background while the user's
    // filling out the login form.
    React.useEffect(() => {
        loadAuthenticatedApp();
    }, []);

    return (
        <ErrorBoundary onError={ErrorHandler} FallbackComponent={FallbackComponent}>
            <React.Suspense fallback={<div>Loading...</div>}>
                {user ? <AuthenticatedApp /> : <UnauthenticatedApp />}
            </React.Suspense>
        </ErrorBoundary>
    );
};

export default hot(App);
