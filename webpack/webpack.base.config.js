const webpack = require('webpack');
const Path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');

const entryFile = Path.resolve(__dirname, '../src/index.js');
const outputPath = Path.resolve(__dirname, '../dist');
const postcssConfig = Path.resolve(__dirname, 'postcss.config.js');


module.exports = {
    entry: entryFile,
    output: {
        path: outputPath,
        filename: './js/index.js'
    },

    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                options: {
                    presets: ['es2015']
                }
            },
            {
                test: /\.sass$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        {
                            loader: 'css-loader'
                        },
                        {
                            loader: 'postcss-loader',
                            options: {
                                config: {
                                    path: postcssConfig
                                }
                            }
                        },
                        {
                            loader: 'sass-loader'
                        }
                    ]
                })
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        {
                            loader: 'css-loader'
                        },
                        {
                            loader: 'postcss-loader',
                            options: {
                                config: {
                                    path: postcssConfig
                                }
                            }
                        }
                    ]
                })
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'file-loader',
                options: {
                    name: 'fonts/[name].[ext]',
                    publicPath: '../'
                }
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loaders: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: 'images/[name].[ext]',
                            publicPath: '../'
                        }
                    }
                ]
            }
        ]
    },

    plugins: [
        new ExtractTextPlugin({
            filename: './css/[name].css'
        })
    ],
};