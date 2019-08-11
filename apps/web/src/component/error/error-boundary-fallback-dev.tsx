import styled from '@emotion/styled';
import React from 'react';
import { ErrorBoundaryDataProps } from './error-boundary';

const Container = styled.div`
    position: fixed;
    top: 0;
    width: 100%;
    display: flex;
    align-items: center;
`;

const Message = styled.div`
    padding: 1.2em;
    border: 1px #78909c solid;
    font-size: 1em;
    color: black;
`;

type Props = {} & ErrorBoundaryDataProps;

export const ErrorBoundaryFallbackDev: React.FC<Props> = props => {
    const { error, info } = props;

    return (
        <Container data-testid="error-boundary-fallback-component">
            <Message>
                An error occured: {error && <span>{error.message}</span>}
                {error && error.stack && <pre>{error.stack}</pre>}
            </Message>
        </Container>
    );
};
