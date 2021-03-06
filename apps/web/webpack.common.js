const path = require('path');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

module.exports = {
    entry: {
        index: ['./src/index.tsx'],
    },
    resolve: {
        extensions: ['.js', '.jsx', '.json', '.ts', '.tsx', '.css', '.scss', '.md', '.mdx'],
        modules: [path.join(__dirname, 'src'), 'node_modules'],
        alias: {
            '@assets': path.resolve(__dirname, 'src/assets/'),
        },
    },
    module: {
        rules: [
            {
                // Ignore old fonts
                test: /\.(eot|ttf)(\?.*$|$)/,
                use: ['raw-loader', 'null-loader']
            },
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
