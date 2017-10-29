const webpack = require('webpack');
const BundleTracker = require('webpack-bundle-tracker')
const NODE_ENV = process.env.NODE_ENV || 'development';

module.exports = {
    entry: {
        app: './index.jsx',
        // app: './App.js',
    },
    context: `${__dirname}/static_src`,
    output: {
        path: `${__dirname}/static/build`,
        filename: '[name]-[hash].js',
        publicPath: '/static/build/',
    },

    watch: NODE_ENV === 'development',

    devtool: NODE_ENV === 'development' ? 'cheap-module-source-map' : false,

    resolve: {
        modules: [`${__dirname}/static_src`, 'node_modules'],
        extensions: ['.js', '.jsx'],
    },

    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                loader: 'babel-loader?presets[]=react&presets[]=es2015&presets[]=stage-1',
            },
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader',
            },
            {
                test: /\.scss$/,
                loader: 'style-loader!css-loader!sass-loader?outputStyle=expanded',
            },
            {
                test: /\.(png|jpg|gif|svg|ttf|eot|woff|woff2)$/,
                loader: 'url-loader?limit=4096&name=[path][name].[ext]',
            },
        ],
    },

    plugins: [
        new webpack.NoEmitOnErrorsPlugin(),
        new BundleTracker({filename: './webpack-stats.json'}),
    ],

};


if (NODE_ENV !== 'development') {
    module.exports.plugins.push(
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
                drop_console: true,
            },
        })
    );
}
