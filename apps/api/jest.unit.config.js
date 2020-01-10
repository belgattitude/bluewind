'use strict';

module.exports = {
    verbose: false,
    moduleFileExtensions: [
        "js",
        "json",
        "ts"
    ],
    rootDir: ".",
    testRegex: ".(test).ts$",
    transform: {
        "^.+\\.(ts|js|tsx)$": "ts-jest"
    },
    coverageDirectory: "./coverage",
    setupFilesAfterEnv: ["./test/jest.unit.setup.ts"],
    testEnvironment: "node",
    globals: {
        "ts-jest": {
            "tsConfig": "./tsconfig.jest.json"
        }
    }
};
