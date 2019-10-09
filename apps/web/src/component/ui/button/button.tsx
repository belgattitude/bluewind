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
} from 'styled-system';
import { buttonSize } from '../theme';

type ButtonProps = BorderRadiusProps & ButtonStyleProps & SpaceProps & FontSizeProps & { size: string };

export const Button = styled.button<ButtonProps>`
    border: 0;
    outline: 0; 
    &:hover {
      filter: contrast(150%);
      cursor: pointer;
    }
    ${borderRadius}
    ${buttonStyle}
    ${buttonSize}
    ${space}
    ${fontSize}
`;

Button.defaultProps = {
    variant: 'primary',
    size: 'medium',
};
