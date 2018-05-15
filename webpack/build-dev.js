const webpack = require('webpack');
const devWebpackConfig = require('./webpack.dev.config');

webpack(devWebpackConfig, function(error, stats) {
    'use strict';

    if (error) throw error;

    process.stdout.write(stats.toString({
        colors: true,
        modules: false,
        children: false,
        chunks: false,
        chunkModules: false
    }) + '\n\n');
});