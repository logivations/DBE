const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

console.log('qwe', path.join(__dirname, '/dist', '/views'));
module.exports = {
    entry: './src/index.tsx',
    output: {
        path: path.join(__dirname, "dist"), // the bundle output path
        filename: "bundles/bundle.[hash].js", // the name of the bundle
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: './views/index.html',
            template: "src/index.html", // to import index.html file inside index.js
            publicPath: path.join(__dirname, "..")
        }),
    ],
    devServer: {
        port: 3030, // you can change the port
    },
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
            // {
            //     test: /\.(le|c)ss$/,
            //     use: [
            //         isDevMode ? 'style-loader': MiniCssExtractPlugin.loader,
            //         'css-loader',
            //         {
            //             loader: 'postcss-loader', //shows warnings
            //             options: {
            //                 postcssOptions: {
            //                     plugins: [
            //                         ["autoprefixer"],
            //                     ],
            //                 },
            //             }
            //         },
            //         'less-loader'
            //     ]
            // }
        ],
    },
};