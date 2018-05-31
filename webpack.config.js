'use strict';

var path = require('path')
var webpack = require('webpack');

var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var entrys = require('./webpack.entry').getEntrys();

module.exports = {
    entry: entrys,
    module: {
        loaders: [{
                test: /\.vue$/,
                loader: 'vue'
            },
            {
                test: /\.js$/,
                loaders: [
                    'babel?presets[]=es2015',
                ],
                exclude: /node_modules/
            }, {
                test: /\.scss$/,
                loader: 'style!css!sass!autoprefixer',
                exclude: /node_modules/,
                //loader:ExtractTextPlugin.extract('css!sass!autoprefixer')//不支持多参数
            },
            {
                test: /\.html$/,
                loader: 'html-withimg-loader',
                exclude: /node_modules/,
            }, {
                test: /\.css$/,
                loader: 'style!css!autoprefixer',
            }, {
                loader: 'url-loader?limit=100000',
                test: /\.(eot)$/
            },
            // 图片
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                loader: 'url-loader?limit=1024&name=images/[name].[hash:8].[ext]'
            },
            { test: /\.(eot|ttf|TTF|woff|woff2|svg)$/, loader: 'file?name=fonts/[name].[ext]' }
        ]
    },
    output: {
        path: path.resolve(__dirname, 'build'),
        //publicPath:'/'||__dirname,
        publicPath: '/',
        filename: '[name].js'
    },
    resolve: {
        // require时省略的扩展名，如：require('module') 不需要module.js
        extensions: ['', '.js', '.vue'],

        // video.js 插件videojs-contrib-hls所需 http://docs.videojs.com/tutorial-webpack.html
        alias: {
            webworkify: 'webworkify-webpack-dropin',
        }
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
        new webpack.optimize.OccurenceOrderPlugin(),
        //new webpack.optimize.CommonsChunkPlugin('vendors','vendors.js'),
        //new ExtractTextPlugin('[name].css',{
        //	allChunks:true
        //}),

        // 提取公共模块
        new webpack.optimize.CommonsChunkPlugin({
            names: 'common',
            minChunks: 2,
        }),

        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('development'),
        })
    ]
}