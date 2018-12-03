const path = require('path');
const webpack = require('webpack'); // 用于访问内置插件
const baseConfig = require("./webpack.base");
const merge = require("webpack-merge");

const CleanWebpackPlugin = require("clean-webpack-plugin")
const ExtractTextPlugin = require("extract-text-webpack-plugin")
const ZipPlugin = require("zip-webpack-plugin")
const HtmlWebpackPlugin = require("html-webpack-plugin")

// const GitRevisionPlugin = require("git-revision-webpack-plugin")
// const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
//   .BundleAnalyzerPlugin

const extractCss = new ExtractTextPlugin({
    filename: "styles-[name]-[hash:7].css",
    allChunks: true,
})

const prodWebpackConfig = merge(baseConfig, {
    mode: 'production',
    devtool: "#source-map",
    plugins: [
        new CleanWebpackPlugin(["dist"], {
            root: path.resolve(__dirname, "../"),
            verbose: true,
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
                screw_ie8: true,
                sequences: true,
                dead_code: true,
                drop_debugger: true,
                comparisons: true,
                conditionals: true,
                evaluate: true,
                booleans: true,
                loops: true,
                unused: true,
                hoist_funs: true,
                if_return: true,
                join_vars: true,
                cascade: true,
                drop_console: true,
            },
            output: {
                comments: false,
            },
        }),
        extractCss, 
        new HtmlWebpackPlugin({
            template: "../index.html",
            filename: "index.html",
            favicon: path.join(__dirname, "../src/atlas/assets/favicon.ico"),
            inject: true,
            chunks: ["manifest", "vendor", "demo"],
            env: process.env.NODE_ENV,
        }),
        new ZipPlugin({
            filename: "react-demo",
        }),
    ]
})
module.exports = prodWebpackConfig;