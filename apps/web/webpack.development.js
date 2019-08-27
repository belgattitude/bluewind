const path = require('path');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');

const PUBLIC_URL = '/';

const buildPath = path.resolve(__dirname, 'build');

module.exports = merge(common, {
    devtool: 'cheap-module-source-map',
    mode: 'development',
    output: {
        path: buildPath,
        filename: '[name].js',
    },
    resolve: {
        alias: {
            'react-dom': '@hot-loader/react-dom'
        }
    },
    module: {
        rules: [
            {
                test: /\.(s?css)$/,
                use: ['css-hot-loader', 'style-loader', 'css-loader', 'sass-loader'],
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: 'images/[name]-[hash].[ext]',
                        },
                    },
                ],
            },
            {
                test: /\.woff$|\.woff2?$/,
                loader: 'file-loader',
                //use: 'url-loader?limit=10000',

                options: {
                    limit: 50000,
                    mimetype: 'application/font-woff',
                    name: 'fonts/[name].[ext]',
                },
            },
            {
                test: /\.eot|\.ttf$/,
                loader: 'file-loader',
                options: {
                    limit: 50000,
                    mimetype: 'application/font',
                    name: 'fonts/[name].[ext]',
                },
            },

        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            alwaysWriteToDisk: true,
            hash: false,
            template: './public/index.html',
            templateParameters: {
                publicUrl: PUBLIC_URL,
            },
            removeAttributeQuotes: false,
            removeComments: false,
            minify: {
                collapseWhitespace: false,
                collapseInlineTagWhitespace: false,
            },
        }),

        new HtmlWebpackHarddiskPlugin(),
    ],
    optimization: {
        namedModules: true,
    },
    devServer: {
        contentBase: buildPath,
        port: 3001,
        // to allow devserver to be accessed from multiple
        // machines. Be aware it's a security risk too
        disableHostCheck: true,
        host: '0.0.0.0',
        historyApiFallback: true,
        hot: true,
        inline: true,
    },
});
