'use strict';

const esModules = ['lodash'];

module.exports = {
    verbose: true,
    testURL: 'http://localhost/',
    collectCoverageFrom: [
        'src/**/*.{js,jsx,ts,tsx}',
        '!src/**/*.d.ts'
    ],
    moduleFileExtensions: [
        "web.js",
        "js",
        "web.ts",
        "ts",
        "web.tsx",
        "tsx",
        "json",
        "web.jsx",
        "jsx",
        "node"
    ],
    setupFiles: ['./jest.stubs.ts'],
    setupFilesAfterEnv: ['./jest.tests.ts'],
    //roots: ['<rootDir>/../../', '<rootDir>/../../'],
    testMatch: [
        "<rootDir>/src/**/__tests__/**/*.{js,jsx,ts,tsx}",
        "<rootDir>/src/**/*.{spec,test}.{js,jsx,ts,tsx}"
    ],
    testEnvironment: "jsdom",
    transform: {
        '^.+\\.(js|jsx|ts|tsx)$': 'ts-jest',
        '^.+\\.css$': '<rootDir>/config/jest/cssTransform.js',
        '^(?!.*\\.(js|jsx|ts|tsx|css|json)$)': '<rootDir>/config/jest/fileTransform.js',
    },
    transformIgnorePatterns: [
        '[/\\\\]node_modules[/\\\\].+\\.(js|jsx|ts|tsx)$',
        '^.+\\.module\\.(css|sass|scss)$',
        `/node_modules/(?!${esModules.join('|')}).+\\.js$`,
    ],
    modulePaths: [],
    moduleNameMapper: {
        '^react-native$': 'react-native-web',
        // Hack, because 'ky' does not point to commonjs module (esm by default)
        '^ky$': require.resolve('ky').replace('index.js', 'umd.js'),
        '^.+\\.module\\.(css|sass|scss)$': 'identity-obj-proxy',
        '^lodash-es$': 'lodash',
        '\\.(jpg|ico|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
            '<rootDir>/config/jest/fileTransform.js',
    },
    globals: {
        //window: {},
        'ts-jest': {
            diagnostics: true,
            babelConfig: { extends: './babel.config.js' },
            tsConfig: './tsconfig.jest.json',
        },
    },
};
