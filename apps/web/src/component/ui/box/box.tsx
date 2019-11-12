import styled from '@emotion/styled';
import { color, space, fontSize, SpaceProps, FontSizeProps } from 'styled-system';
import { HackedColorProps } from '../../../typings/styled-system';

type BoxProps = HackedColorProps & SpaceProps & FontSizeProps;

export const Box = styled.div<BoxProps>`
    ${color}
    ${space}
    ${fontSize}            
`;
