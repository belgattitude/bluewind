module.exports = {
    verbose: true,
    testURL: 'http://localhost/',
    collectCoverageFrom: ['src/**/*.{js,jsx,ts,tsx}', '!src/**/*.d.ts', '!src/__tests__/*'],
    setupFiles: ['./jest.stubs.ts'],
    setupFilesAfterEnv: ['./jest.tests.ts'],
    testMatch: ['<rootDir>/src/**/__tests__/**/*.{js,jsx,ts,tsx}', '<rootDir>/src/**/*.{spec,test}.{js,jsx,ts,tsx}'],
    transform: {
        '^.+\\.(js|jsx|ts|tsx)$': '<rootDir>/node_modules/ts-jest',
        '^.+\\.css$': '<rootDir>/config/jest/cssTransform.js',
        '^(?!.*\\.(js|jsx|ts|tsx|css|json)$)': '<rootDir>/config/jest/fileTransform.js',
    },
    transformIgnorePatterns: [
        '[/\\\\]node_modules[/\\\\].+\\.(js|jsx|ts|tsx)$',
        '^.+\\.module\\.(css|sass|scss)$',
        '<rootDir>/node_modules/(?!(lodash-es))',
    ],
    modulePaths: [],
    moduleNameMapper: {
        '^react-native$': 'react-native-web',
        '^.+\\.module\\.(css|sass|scss)$': 'identity-obj-proxy',
        '^lodash-es$': 'lodash',
    },
    moduleFileExtensions: ['web.js', 'js', 'web.ts', 'ts', 'web.tsx', 'tsx', 'mjs', 'json', 'web.jsx', 'jsx', 'node'],
    globals: {
        window: {},
        'ts-jest': {
            tsConfig: './tsconfig.jest.json',
            compiler: 'typescript',
            //babelConfig: '.babelrc',
        },
    },
};
