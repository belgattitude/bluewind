import React, { Component, ReactNode } from 'react';
import styled from '@emotion/styled';

type MainProps = {
    children: ReactNode;
    className?: string;
};

const UnstyledMain: React.FC<MainProps> = props => {
    const { children, className, ...p } = props;
    return (
        <div className={className} {...p}>
            {children}
        </div>
    );
};

export const Main = styled(UnstyledMain)`
    padding: 15px;
`;
