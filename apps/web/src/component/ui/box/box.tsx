import styled from '@emotion/styled';
import { color, space, fontSize, ColorProps, SpaceProps, FontSizeProps } from 'styled-system';

type BoxProps = ColorProps & SpaceProps & FontSizeProps;

export const Box = styled.div<BoxProps>`
    ${color}
    ${space}
    ${fontSize}            
`;
