module.exports = {
    "presets": [
        ["@emotion/babel-preset-css-prop"],
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
                //"emotion"
            ]
        },
        "development": {
            "presets": [
                ["@emotion/babel-preset-css-prop"],
                [
                    "@babel/preset-env",
                    {
                        "useBuiltIns": false
                    }
                ]
            ],
            "plugins": [
                /*
                [
                    "emotion",
                    {
                        "sourceMap": true
                    }
                ],

                 */
                "react-hot-loader/babel"
            ]
        },
        "test": {
            "presets": [
                [
                    "@babel/preset-env",
                    {
                        "debug": true,
                        "useBuiltIns": false,
                        //"modules": "commonjs",
                        "targets": {
                            "browsers": [
                                "last 1 chrome version"
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
        /*
        [
            "emotion",
            {
                // sourceMap is on by default but source maps are dead code eliminated in production
                "sourceMap": true,
                "autoLabel": process.env.NODE_ENV !== 'production',
                "labelFormat": "[local]",
                "cssPropOptimization": true
            }
        ],
        */
        /*
        ["@babel/plugin-transform-runtime",
            {
                "absoluteRuntime": false,
                "corejs": 3,
                "helpers": true,
                "regenerator": true,
                "useESModules": false
            }],*/
        "@babel/plugin-syntax-dynamic-import",
        "@babel/plugin-syntax-import-meta",
        "@babel/plugin-proposal-class-properties",
        "@babel/plugin-proposal-json-strings",
        "@babel/plugin-proposal-object-rest-spread"
    ]
}
