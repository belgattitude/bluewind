const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const DuplicatePackageCheckerPlugin = require('duplicate-package-checker-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const CompressionPlugin = require('compression-webpack-plugin');
const zopfli = require('@gfx/zopfli');
const BrotliPlugin = require('brotli-webpack-plugin');
const DotenvPlugin = require('dotenv-webpack');

const PUBLIC_URL = './';

const StatsWriterPlugin = require('webpack-stats-plugin').StatsWriterPlugin;

const extractSass = new MiniCssExtractPlugin({
    filename: 'static/css/style.[contenthash:8].css',
});

const distFolder = path.resolve(__dirname, './dist');

module.exports = merge(common, {
    devtool: false,
    mode: 'production',
    entry: ['./src/index.tsx'],
    output: {
        path: path.resolve(distFolder, 'public'),
        filename: 'static/js/[name].[chunkhash:8].bundle.js',
        chunkFilename: 'static/js/[name].[chunkhash:8].bundle.js',
        publicPath: '/',
    },
    resolve: {
        alias: {
            /**
             * Aliases to avoid duplicates in build.
             */
        },
    },
    module: {
        rules: [
            {
                test: /\.woff$|\.woff2?$/,
                loader: 'file-loader',
                options: {
                    limit: 50000,
                    mimetype: 'application/font-woff',
                    name: 'static/fonts/[name].[ext]',
                },
            },

            // Process any JS outside of the app with Babel.
            // Unlike the application JS, we only compile the standard ES features.

            {
                test: /\.(js|mjs)$/,
                exclude: /@babel(?:\/|\\{1,2})runtime/,
                include: /node_modules/,
                loader: 'babel-loader',
                options: {
                    babelrc: false,
                    configFile: false,
                    compact: false,
                    presets: [[require.resolve('babel-preset-react-app/dependencies'), { helpers: true }]],
                    cacheDirectory: true,
                    // cacheCompression: true,

                    // If an error happens in a package, it's possible to be
                    // because it was compiled. Thus, we don't want the browser
                    // debugger to show the original code. Instead, the code
                    // being evaluated would be much more helpful.
                    sourceMaps: false,
                },
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name]-[hash].[ext]',
                            outputPath: 'static/images',
                        },
                    },
                ],
            },
            {
                test: /\.(css)$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader'],
            },
            {
                test: /\.(scss)$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            sourceMap: false,
                        },
                    },
                    {
                        loader: 'css-loader', // translates CSS into CommonJS
                        options: {
                            //sourceMap: false,
                            //modules: false, // use CSS-Modules to scope styles
                            //importLoader: 2,
                        },
                    },

                    {
                        loader: 'postcss-loader',
                        options: {
                            sourceMap: false,
                            config: {
                                path: path.resolve(__dirname, 'postcss.config.js'),
                            },
                        },
                    },
                    {
                        loader: 'sass-loader', // compiles Sass to CSS
                        options: {
                            outputStyle: 'expanded',
                            sourceMap: false,
                            sourceMapContents: false,
                        },
                    },
                ],
            },
        ],
    },

    optimization: {
        //namedModules: true, // NamedModulesPlugin(), will increase size
        //runtimeChunk: 'single',

        splitChunks: {
            chunks: 'async',
            minSize: 30000,
            minChunks: 1,
            maxAsyncRequests: 5,
            maxInitialRequests: 3,
            automaticNameDelimiter: '~',
            name: true,

            cacheGroups: {
                react: {
                    test: /[\\/]node_modules\/(react|react-dom)\//,
                    name: 'react',
                    priority: -5,
                    enforce: true,
                    chunks: 'all',
                },

                vendors: {
                    // only js files need to be included
                    // from vendors
                    //test: /[\\/]node_modules[\\/](.*).js$/,
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors',
                    priority: -40,
                    enforce: true,
                    chunks: 'all',
                },
            },
        },

        noEmitOnErrors: true, // NoEmitOnErrorsPlugin
        //concatenateModules: true, //ModuleConcatenationPlugin (scope-hoisting)
        minimizer: [
            new TerserPlugin({
                terserOptions: {
                    parse: {
                        // we want terser to parse ecma 8 code. However, we don't want it
                        // to apply any minfication steps that turns valid ecma 5 code
                        // into invalid ecma 5 code. This is why the 'compress' and 'output'
                        // sections only apply transformations that are ecma 5 safe
                        // https://github.com/facebook/create-react-app/pull/4234
                        ecma: 8,
                    },
                    compress: {
                        ecma: 5,

                        dead_code: true,
                        drop_debugger: true,

                        // Allow console messages
                        drop_console: false,

                        warnings: false,
                        // Disabled because of an issue with Uglify breaking seemingly valid code:
                        // https://github.com/facebook/create-react-app/issues/2376
                        // Pending further investigation:
                        // https://github.com/mishoo/UglifyJS2/issues/2011
                        comparisons: false,
                        // Disabled because of an issue with Terser breaking valid code:
                        // https://github.com/facebook/create-react-app/issues/5250
                        // Pending futher investigation:
                        // https://github.com/terser-js/terser/issues/120
                        inline: 2,
                    },
                    mangle: {
                        safari10: true,
                    },
                    output: {
                        ecma: 5,
                        comments: false,
                        // Turned on because emoji and regex is not minified properly using default
                        // https://github.com/facebook/create-react-app/issues/2488
                        ascii_only: true,
                    },
                },
                // Use multi-process parallel running to improve the build speed
                // Default number of concurrent runs: os.cpus().length - 1
                parallel: true,
                // Enable file caching
                cache: true,
                sourceMap: true,
            }),
            new OptimizeCssAssetsPlugin({
                cssProcessor: require('cssnano'),
                cssProcessorOptions: {
                    //map: { inline: false, },
                    //safe: true,
                    discardUnused: {
                        fontFace: false, // to not remove additional @font-face
                    },
                    discardComments: {
                        removeAll: true,
                    },
                },
                canPrint: true,
            }),
        ],
    },

    plugins: [
        new CleanWebpackPlugin({}),
        /*
        new DotenvPlugin({
            path: dotEnvFile, // load this now instead of the ones in '.env'
            safe: true, // load '.env.example' to verify the '.env' variables are all set. Can also be a string to a different file.
            systemvars: true, // load all the predefined 'process.env' variables which will trump anything local per dotenv specs.
            silent: false, // hide any errors
        }),
*/
        new webpack.EnvironmentPlugin({
            'process.env.NODE_ENV': JSON.stringify('production'),
            NODE_ENV: JSON.stringify('production'),
        }),

        new webpack.LoaderOptionsPlugin({
            minimize: true,
            debug: false,
        }),

        extractSass,

        new DuplicatePackageCheckerPlugin({
            verbose: true,
            emitError: true,
            // Warn also if major versions differ (default: true)
            strict: false,
            exclude(instance) {
                // @material-ui/core and history
                // use different major versions for 'warning' package
                // That can be ignored.
                //return instance.name === 'warning';
                return ['warning', 'regenerator-runtime'].includes(instance.name);
            },
        }),

        new HtmlWebpackPlugin({
            alwaysWriteToDisk: true,
            hash: false,
            template: './public/index.html',
            templateParameters: {
                publicUrl: PUBLIC_URL,
            },
            removeAttributeQuotes: true,
            removeComments: true,
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeRedundantAttributes: true,
                useShortDoctype: true,
                removeEmptyAttributes: true,
                removeStyleLinkTypeAttributes: true,
                keepClosingSlash: true,
                minifyJS: true,
                minifyCSS: true,
                minifyURLs: true,
            },
        }),

        new ManifestPlugin({
            fileName: 'assets-manifest.json',
            basePath: '',
            hash: true,
        }),

        new HtmlWebpackHarddiskPlugin(),

        new CompressionPlugin({
            test: /\.(js|css|svg)$/,
            compressionOptions: {
                numiterations: 15,
            },
            algorithm(input, compressionOptions, callback) {
                return zopfli.gzip(input, compressionOptions, callback);
            },
        }),

        new BrotliPlugin({
            asset: '[path].br[query]',
            test: /\.(js|css|svg)$/,
        }),

        new StatsWriterPlugin({
            // no support for absolute paths
            filename: '../.webpack-stats.json',
        }),
    ],
});
