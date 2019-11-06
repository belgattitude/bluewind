import { hot } from 'react-hot-loader/root';
import React, { useCallback, useLayoutEffect, useState } from 'react';
import ErrorBoundary from 'react-error-boundary';
import { ErrorBoundaryFallbackDev } from './component/error/error-boundary-fallback-dev';
import { ErrorHandler } from './core/utils/error-handler';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './store';
import { runLoginThunk } from './features/auth/auth.redux';
import { getTokenStore } from './core/token-store';

const FallbackComponent = ErrorBoundaryFallbackDev;
const loadAuthenticatedApp = () => import('./authenticated-app');
const AuthenticatedApp = React.lazy(loadAuthenticatedApp);
const UnauthenticatedApp = React.lazy(() => import('./unauthenticated-app'));

const App: React.FC = () => {
    const { userId } = useSelector((state: RootState) => state.auth);
    // pre-load the authenticated side in the background while the user's
    // filling out the username form.
    React.useEffect(() => {
        loadAuthenticatedApp();
    }, []);

    return (
        <ErrorBoundary onError={ErrorHandler} FallbackComponent={FallbackComponent}>
            <React.Suspense fallback={<div>Loading...</div>}>
                {userId !== null ? <AuthenticatedApp /> : <UnauthenticatedApp />}
            </React.Suspense>
        </ErrorBoundary>
    );
};

export default hot(App);
