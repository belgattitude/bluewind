import { hot } from 'react-hot-loader/root';
import React from 'react';
import ErrorBoundary from 'react-error-boundary';
import { ErrorBoundaryFallbackDev } from './component/error/error-boundary-fallback-dev';
import { ErrorHandler } from './core/utils/error-handler';
import { useSelector } from 'react-redux';
import { RootState } from './store';

const FallbackComponent = ErrorBoundaryFallbackDev;
const loadAuthenticatedApp = () => import('./authenticated-app');
const AuthenticatedApp = React.lazy(loadAuthenticatedApp);
const UnauthenticatedApp = React.lazy(() => import('./unauthenticated-app'));

const App: React.FC = () => {
    const { logged } = useSelector((state: RootState) => state.auth);

    // pre-load the authenticated side in the background while the user's
    // filling out the username form.
    React.useEffect(() => {
        loadAuthenticatedApp();
    }, []);

    return (
        <ErrorBoundary onError={ErrorHandler} FallbackComponent={FallbackComponent}>
            <React.Suspense fallback={<div>Loading...</div>}>
                {logged ? <AuthenticatedApp /> : <UnauthenticatedApp />}
            </React.Suspense>
        </ErrorBoundary>
    );
};

export default hot(App);
