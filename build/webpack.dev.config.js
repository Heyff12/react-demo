const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin'); // 通过 npm 安装
const webpack = require('webpack'); // 用于访问内置插件
const utils = require("./utils");
const proxy = require("./proxy.config")
const resolve = require("./webpack.resolve.config")
const theme = require("../src/styles/themeConfig")
const tsImportPluginFactory = require("ts-import-plugin")

const PORT = 2222
const _HOST = "0.0.0.0"
const HOST = `http://${_HOST}`
const URL = `${HOST}:${PORT}`

let proxyOptions = proxy


module.exports = {
    mode: 'development',
    entry: '../src/main.tsx',
    output: {
        filename: "[name].js",
        path: path.join(__dirname, "../dist"),
        publicPath: "/",
    },
    context: path.resolve(__dirname, "../src"),
    devtool: "cheap-module-source-map",
    resolve: resolve,
    devServer: {
        stats: {
            colors: true,
            modules: false,
            children: false,
            chunks: false,
            chunkModules: false,
        },
        hot: true,
        // enable HMR on the server
        compress: true,
        contentBase: path.resolve(__dirname, "../src"),
        // match the output path
        port: PORT,
        host: _HOST,
        publicPath: URL,
        historyApiFallback: true,
        proxy: [() => proxyOptions],
        open: true,
        overlay: {
            warnings: true,
            errors: true
        },
    },
    module: {
        rules: [{
                enforce: "pre",
                test: /\.js$/,
                loader: "source-map-loader"
            },
            {
                test: /\.tsx?$/,
                use: [{
                        loader: "babel-loader",
                        options: {
                            babelrc: true,
                            plugins: ["react-hot-loader/babel"],
                        },
                    },
                    {
                        loader: "ts-loader",
                        options: {
                            transpileOnly: true,
                            getCustomTransformers: () => ({
                                before: [
                                    tsImportPluginFactory({
                                        libraryName: "antd",
                                        libraryDirectory: "es",
                                    }),
                                ],
                            }),
                            compilerOptions: {
                                module: "es2015",
                                lib: ["es6", "es7", "dom"],
                            },
                        },
                    },
                ],
                exclude: /node_modules/,
            },
            {
                test: /\.css$/,
                use: [{
                        loader: 'style-loader'
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true
                        }
                    }
                ]
            },
            {
                test: /\.less$/,
                exclude: /base\.less/,
                use: [
                    "style-loader",
                    "css-loader",
                    {
                        loader: "postcss-loader",
                        options: {
                            plugins: function () {
                                return [require("precss"), require("postcss-cssnext")]
                            },
                        },
                    },
                    {
                        loader: "less-loader",
                        options: {
                            modifyVars: theme,
                        },
                    },
                ],
            },
            {
                test: /\.css$|\.scss/,
                use: [
                    "style-loader",
                    {
                        loader: "css-loader",
                        options: {
                            localIdentName: "[path][name]__[local]--[hash:base64:5]",
                        },
                    },
                    {
                        loader: "postcss-loader",
                        options: {
                            plugins: function () {
                                return [require("precss"), require("postcss-cssnext")]
                            },
                        },
                    },
                ],
            }, {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: "url-loader",
                options: {
                    limit: 5 * 1024,
                    name: utils.assetsPath("img/[name].[hash:7].[ext]")
                }
            },
            {
                test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
                loader: "url-loader",
                options: {
                    limit: 5 * 1024,
                    name: utils.assetsPath("media/[name].[hash:7].[ext]")
                }
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: "url-loader",
                options: {
                    limit: 5 * 1024,
                    name: utils.assetsPath("fonts/[name].[hash:7].[ext]")
                }
            }
        ]
    },
    plugins: [
        new ForkTsCheckerNotifierWebpackPlugin({
            title: "React-demo typescript error",
        }),
        new ForkTsCheckerWebpackPlugin({
            tsconfig: path.resolve(__dirname, "../tsconfig.json"),
            tslint: path.resolve(__dirname, "../tslint.json"),
        }),
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
            template: '../index.html'
        })
    ]
};