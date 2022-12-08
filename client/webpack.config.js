const path = require("path");
const webpack = require('webpack');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CompressionPlugin = require("compression-webpack-plugin");
const HtmlWebpackSkipAssetsPlugin = require('html-webpack-skip-assets-plugin').HtmlWebpackSkipAssetsPlugin;
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const mode = process.env.NODE_ENV || 'production';
const isDevMode = mode === 'development';

module.exports = {
    mode: mode,
    entry: './src/index.tsx',
    output: {
        path: path.join(__dirname, "dist"), // the bundle output path
        filename: "bundles/bundle.[hash].js", // the name of the bundle
        chunkFilename: "chunks/chunk-[name].[contenthash].js",
        sourceMapFilename: '[file].map',
        crossOriginLoading: "anonymous",
        assetModuleFilename: 'images/[hash][ext][query]'
    },
    watchOptions: {aggregateTimeout: 800, poll: 1000, ignored: /node_modules/},
    stats: {colors: true},
    devtool: 'inline-source-map',
    target: 'web',
    plugins: [
        new HtmlWebpackPlugin({
            filename: './views/index.html',
            templateContent: (params) => {
                return params.htmlWebpackPlugin.files.js.reduce((acc, script) => {
                    acc += `<script src="${script}"></script> \n\r`;
                    return acc;
                }, '');
            },
            hash: true,
            inject: false
        }),
        new MiniCssExtractPlugin({
            filename: "styles/styles.[name].css",
            chunkFilename: "styles/styles.[name].css"
        }),
        new CopyWebpackPlugin({
            patterns: [{from: 'static', to: 'styles/themes'}]
        }),
        new webpack.DefinePlugin({
            NODE_ENV: JSON.stringify(process.env.NODE_ENV),
            CONTEXT_PATH: JSON.stringify("/" + 'contextPath')
        }),
        new CaseSensitivePathsPlugin(),
        new HtmlWebpackSkipAssetsPlugin(),
        new CompressionPlugin(),
        // new BundleAnalyzerPlugin()
    ],
    resolve: {
        extensions: [".ts", ".tsx", ".js", ".jsx", ".css"],
        alias: {
            'inferno': 'inferno/dist/index.dev.esm.js',
        },
    },
    module: {
        rules: [
            {
                test: /\.(ts|js)x?$/,
                exclude: /node_modules/,
                loader: 'ts-loader',
                options: {
                    transpileOnly: true,
                    experimentalWatchApi: true,
                }
            },
            {
                test: /\.(png|jpg?g|gif|cur)$/,
                type: 'asset/resource'
            },
            {
                test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
                type: 'asset/inline'
            },
            {
                test: /\.(eot|ttf|svg)(\?v=\d+\.\d+\.\d+)?$/,
                type: 'asset/resource'
            },
            {
                test: /\.(le|c)ss$/,
                use: [
                    isDevMode ? 'style-loader': MiniCssExtractPlugin.loader,
                    'css-loader',
                    {
                        loader: 'postcss-loader', //shows warnings
                        options: {
                            postcssOptions: {
                                plugins: [
                                    ["autoprefixer"],
                                ],
                            },
                        }
                    },
                    'less-loader'
                ]
            }
        ],
    },
};