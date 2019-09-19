'use strict';

module.exports = {
    verbose: false,
    moduleFileExtensions: [
        "js",
        "json",
        "ts"
    ],
    rootDir: ".",
    testRegex: ".ispec.ts$",
    transform: {
        "^.+\\.(ts|js|tsx)$": "ts-jest"
    },
    coverageDirectory: "../coverage",
    setupFilesAfterEnv: ["./test/jest.integration.setup.ts"],
    testEnvironment: "node",
    globals: {
        "ts-jest": {
            "tsConfig": "./tsconfig.jest.json"
        }
    }
};
