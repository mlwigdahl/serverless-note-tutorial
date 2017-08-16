var glob = require('glob');
var path = require('path');
var nodeExternals = require('webpack-node-externals');

process.env.NODE_ENV = 'production';

module.exports = {
    entry: globEntries('!(webpack.config).js'),
    target: 'node',
    externals: [nodeExternals()],
    module: {
        rules: [{
            test: /\.js$/,
            loader: 'babel-loader',
            include: __dirname,
            exclude: /node_modules/,
        }]
    },
    output: {
        libraryTarget: 'commonjs',
        path: path.join(__dirname, '.webpack'),
        filename: '[name].js'
    },
};

function globEntries(globPath) {
    const files = glob.sync(globPath);
    let entries = {};

    entries = files.reduce((acc, entry) => {
        acc[path.basename(entry, path.extname(entry))] = './' + entry;
        return acc;
    }, {});

    return entries;
}