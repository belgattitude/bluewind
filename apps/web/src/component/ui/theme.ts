import { variant } from 'styled-system';

export const buttonSize = variant({
    prop: 'size',
    key: 'buttonSizes',
});

export const baseTheme = {
    fontSizes: [12, 14, 16, 24, 32, 48, 64, 96, 128],
    space: [
        // margin and padding
        0,
        4,
        8,
        16,
        32,
        64,
        128,
        256,
    ],
    colors: {
        black: '#000e1a',
        white: '#fff',
        blue: '#007ce0',
        navy: '#004175',
        red: '#FF0000',
        tomato: 'tomato',
        purple: 'purple',
    },
    radii: [0, 2, 4, 8],
};

export const styledSystemTheme = {
    ...baseTheme,
    buttons: {
        primary: {
            color: 'white',
            backgroundColor: baseTheme.colors.blue,
        },
        secondary: {
            color: 'white',
            backgroundColor: baseTheme.colors.purple,
        },
        danger: {
            color: 'white',
            backgroundColor: baseTheme.colors.tomato,
        },
    },
    buttonSizes: {
        medium: {
            fontSize: baseTheme.fontSizes[2],
            padding: `8px 16px`,
            borderRadius: baseTheme.radii[2],
        },
        large: {
            fontSize: baseTheme.fontSizes[3],
            padding: `12px 24px`,
            borderRadius: baseTheme.radii[3],
        },
    },
};
