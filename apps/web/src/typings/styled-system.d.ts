import { BackgroundColorProps, OpacityProps } from 'styled-system';
import * as CSS from 'csstype';

declare module '@styled-system/theme-get' {
    export function themeGet(path: string, fallback?: any): any;
}

// Typescript 3.7 fix for ColorProps
interface TextColorProps {
    color?: CSS.ColorProperty;
}
export interface HackedColorProps extends TextColorProps, BackgroundColorProps, OpacityProps {}
