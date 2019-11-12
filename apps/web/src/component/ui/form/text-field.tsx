import React from 'react';
import styled from '@emotion/styled';
import { color, space, fontSize, SpaceProps, FontSizeProps } from 'styled-system';
import { HackedColorProps } from '../../../typings/styled-system';

type TextFieldProps = HackedColorProps & SpaceProps & FontSizeProps & React.HTMLProps<HTMLInputElement>;

const UnstyledTextField: React.FC<TextFieldProps> = props => {
    const { children, ...innerProps } = props;
    return <input {...innerProps}>{props.children}</input>;
};

export const TextField = styled(UnstyledTextField)<TextFieldProps>`
    ${color}
    ${space}
    ${fontSize}
    background: #fafafa;
    border: 1px solid #c7c7c7;
    border-radius: 2px;
    height: 30px;
    font-size: 1em;
    outline: none;
    padding-left: 7px;
    margin-bottom: 5px;    
    &.error {
      border: 1px solid rgba(red, 0.9);
    }        
`;
