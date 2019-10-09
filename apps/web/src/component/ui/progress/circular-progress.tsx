import styled from '@emotion/styled';
import { color, space, fontSize, ColorProps, SpaceProps } from 'styled-system';
import { keyframes } from '@emotion/core';
import React from 'react';

type CircularProgressProps = ColorProps &
    SpaceProps & {
        className?: string;
        children?: never;
        size: string;
    };

const indefiniteRotate = keyframes`
    100% {
          transform: rotate(360deg);
    }
`;

const UnstyledCircularProgress: React.FC<CircularProgressProps> = props => {
    const { className } = props;
    return (
        <div className={className}>
            <div></div>
        </div>
    );
};

export const CircularProgress = styled(UnstyledCircularProgress)`
    ${color}
    ${space}         
    display: inline-block;
    border: 1px solid blue;
    border-radius: 100%;
    width: ${props => props.size};
    height: ${props => props.size};
    animation: ${indefiniteRotate} 1s ease infinite;
    div {
        clip: rect(0em, 0.5em, 1em, 0em);
        width: ${props => props.size};
        height: ${props => props.size};
        position: absolute;
        border-radius: 100%;
        border: 0.08em solid ${color};
    }
`;
