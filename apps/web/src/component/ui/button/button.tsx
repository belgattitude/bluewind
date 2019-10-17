import styled from '@emotion/styled';
import {
    space,
    fontSize,
    SpaceProps,
    FontSizeProps,
    borderRadius,
    buttonStyle,
    BorderRadiusProps,
    ButtonStyleProps,
    variant,
} from 'styled-system';
import { buttonSize } from '../theme';

type ButtonProps = BorderRadiusProps & ButtonStyleProps & SpaceProps & FontSizeProps & { size?: string };

// Experiment, better to use ButtonStyleProps instead
// and define it in the theme
const variants = {
    variants: {
        primary: {
            color: 'white',
            bg: 'primary',
        },
        secondary: {
            color: 'white',
            bg: 'secondary',
        },
        reset: {
            color: '#333',
            backgroundColor: 'white',
            borderBottom: '1px solid grey',
            borderRadius: 0,
        },
    },
};

export const Button = styled.button<ButtonProps>`
    appearance: none;
    font-family: inherit;
    border: 0;
    outline: 0; 
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    &:hover {
      filter: contrast(150%);
      cursor: pointer;
    }    
    ${borderRadius}
    ${buttonStyle}
    ${buttonSize}
    ${space}
    ${fontSize}
    ${variant(variants)}    
`;

Button.defaultProps = {
    variant: 'primary',
    size: 'medium',
};
