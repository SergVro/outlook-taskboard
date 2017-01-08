const path = require('path');


module.exports = {
    entry: {
        app: './app/main',
        vendor: './app/vendor.ts'
    },

    output: {
        path: './dist',
        filename: '[name].js'
    },
    resolve: {
        extensions: ['', '.ts', '.js']
    },
    module: {
        loaders: [
            {
                test: /\.ts$/,
                loaders: ['awesome-typescript-loader', 'angular2-template-loader?keepUrl=true'],
                exclude: [/\.(spec|e2e)\.ts$/, /node_modules/]
            },
            /* Embed files. */
            {
                test: /\.(html|css)$/,
                loader: 'html',
            },
        ]
    },


};
