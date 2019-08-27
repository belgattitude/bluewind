module.exports = {
    "presets": [
        [
            "@babel/preset-env",
            {
                // to add polyfills
                "useBuiltIns": "usage",
                "corejs": 3,
                "debug": true
            }
        ],
        "@babel/react"
    ],
    "env": {
        "production": {
            "plugins": [
                "emotion"
            ]
        },
        "development": {
            "presets": [
                [
                    "@babel/preset-env",
                    {
                        "useBuiltIns": false
                    }
                ]
            ],
            "plugins": [
                [
                    "emotion",
                    {
                        "sourceMap": true
                    }
                ],
                "react-hot-loader/babel"
            ]
        },
        "test": {
            "presets": [
                [
                    "@babel/preset-env",
                    {
                        "debug": true,
                        //"useBuiltIns": 'entry',
                        "modules": "commonjs",
                        "targets": {
                            "browsers": [
                                "last 5 chrome version"
                            ],
                            "node": 'current'
                        }
                    }
                ]
            ],
            "plugins": [
                "@babel/plugin-transform-modules-commonjs",
                '@babel/plugin-proposal-class-properties'
            ]
        }
    },
    "plugins": [
        ["@babel/plugin-transform-runtime",
            {
                "corejs": false,
                "helpers": true,
                "regenerator": true,
                "useESModules": false
            }],
        "@babel/plugin-syntax-dynamic-import",
        "@babel/plugin-syntax-import-meta",
        "@babel/plugin-proposal-class-properties",
        "@babel/plugin-proposal-json-strings",
        "@babel/plugin-proposal-object-rest-spread"
    ]
}
