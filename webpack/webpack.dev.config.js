const webpack = require('webpack');
const WebpackMerge = require('webpack-merge');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const baseWebpackConfig = require('./webpack.base.config');

module.exports = WebpackMerge(baseWebpackConfig, {
    plugins: [
        new BrowserSyncPlugin({
            port: 8081,
            server: {
                baseDir: ['./']
            }
        }),

        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify("development")
            }
        })
    ],
    devtool: '#cheap-module-eval-source-map',
    watch: true
});