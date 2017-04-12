var path = require('path');
var webpack = require('webpack');
var debug = process.env.NODE_ENV !== "production";



module.exports = {
    context: path.join(__dirname, "src"),
    entry: './app/app.js',
    devtool: debug ? "inline-sourcemap" : null,
    output: {
        filename: 'bundle.js',
        path: path.join(__dirname, 'src')
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel-loader',
                // query: {
                //     presets: ['react', 'es2015', 'stage-0'],
                //     plugins: ['transform-decorators-legacy', 'transform-class-properties'],
                // }
            },
            {   test: /\.scss$/,
                loaders: 'style-loader!css-loader!sass-loader'
            },
            {   test: /\.css/,
                loaders: 'style-loader!css-loader'
            }
        ]
    },
    plugins: debug ? [] : [
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin({ mangle: false, sourcemap: false }),
    ]
};