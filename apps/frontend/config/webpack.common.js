const path = require('path');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

module.exports = {
    entry: {
        index: ['./src/index.tsx'],
    },
    resolve: {
        extensions: ['.js', '.jsx', '.json', '.ts', '.tsx', '.css', '.scss', '.md', '.mdx'],
        modules: [path.join(__dirname, 'src'), 'node_modules'],
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            cacheDirectory: false,
                        },
                    },
                    {
                        loader: 'ts-loader',
                        options: {
                            transpileOnly: true,
                        },
                    },
                ],
            },
            {
                test: /\.(jsx|js|mjs)$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            cacheDirectory: true,
                        },
                    },
                ],
            },
        ],
    },

    plugins: [new ForkTsCheckerWebpackPlugin()],
};
