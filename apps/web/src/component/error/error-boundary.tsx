import React, { Component } from 'react';
import { ErrorBoundaryFallbackDev } from './error-boundary-fallback-dev';

export type ErrorBoundaryDataProps = {
    readonly error: Error | null | undefined;
    readonly info: object | null;
};

type Props = {
    handleError?: (error: Error | null, info: object) => void;
};

type State = Readonly<ErrorBoundaryDataProps>;

class ErrorBoundary extends Component<Props, State> {
    readonly state: State = {
        error: null,
        info: null,
    };

    componentDidCatch(error: Error | null, info: object) {
        this.setState({ error, info });
        if (this.props.handleError) {
            this.props.handleError(error, info);
        }
    }

    render() {
        const { error } = this.state;
        if (error) {
            return <ErrorBoundaryFallbackDev {...this.state} />;
        }
        return this.props.children;
    }
}

export default ErrorBoundary;
