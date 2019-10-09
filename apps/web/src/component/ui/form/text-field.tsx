import styled from '@emotion/styled';
import { color, space, fontSize, ColorProps, SpaceProps, FontSizeProps } from 'styled-system';

type TextFieldProps = ColorProps & SpaceProps & FontSizeProps;

export const TextField = styled.input<TextFieldProps>`
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
