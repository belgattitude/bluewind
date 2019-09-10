import styled from '@emotion/styled';
import React from 'react';
import { FallbackProps } from 'react-error-boundary';

const Container = styled.div`
    position: fixed;
    top: 0;
    width: 100%;
    display: flex;
    background-color: #ffffcc;
`;

const Message = styled.div`
    padding: 1.2em;
    width: 100%;
    border: 1px #78909c solid;
    font-size: 1em;
    color: black;
`;

type Props = FallbackProps;

export const ErrorBoundaryFallbackDev: React.FC<Props> = ({ componentStack, error }) => {
    return (
        <Container data-testid="error-boundary-fallback-component">
            <Message>
                <p>
                    <strong>Oops! An error occured!</strong>
                </p>
                <p>Here’s what we know…</p>
                <p>
                    <strong>Error:</strong>
                    {error && error.message}
                </p>
                <p>
                    <strong>Stacktrace:</strong>
                </p>
                <pre>{componentStack}</pre>
            </Message>
        </Container>
    );
};
