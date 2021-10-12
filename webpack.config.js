const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    mode: process.env.NODE_ENV,
    context: path.resolve(__dirname, "src"),
    entry: {
        index: path.resolve(__dirname, './src/index.js'),
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js',
        assetModuleFilename: "[path][name][ext]",
        clean: true,
    },
    target: ["web", "es5"],
    optimization: {
        splitChunks: {
            cacheGroups: {
                vendor: {
                    test: /node_modules/,
                    name: "vendor",
                    chunks: "initial",
                    enforce: true,
                },
            },
        },
    },
    module: {
        rules: [{
                test: /\.(sass|scss|css)$/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    { loader: 'css-loader', options: { importLoaders: 1 } },
                    { loader: 'postcss-loader' },
                    'sass-loader'
                ],
            },
            {
                test: /\.(gif|png|jpe?g|svg)$/i,
                type: "asset/resource",
            },
            {
                test: /\.pug$/,
                use: [{
                        loader: "html-loader",
                        options: {
                            minimize: false,
                            // 不壓縮 HTML
                        },
                    },
                    {
                        loader: "pug-html-loader",
                        options: {
                            pretty: true,
                            // 美化 HTML 的編排 (不壓縮HTML的一種)
                        },
                    },
                ],
            },
        ],
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'css/[name].css',
        }),
        new HtmlWebpackPlugin({
            title: 'pugTemplate',
            filename: "index.html",
            template: "template/template.html",
            inject: 'body',
        }),
        new HtmlWebpackPlugin({
            filename: "testpug.html",
            template: "pug/index.pug",
            chunjs: ["vendor", "index"],
            inject: 'body',
        }),
    ],
    devServer: {
        compress: true,
        port: 3001,
    },
}