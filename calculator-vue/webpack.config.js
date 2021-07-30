const path = require('path');

module.exports = {
    mode: 'development',
    resolve: {
        extensions: ['.js', '.vue'],
        alias: {
            '@': path.resolve('src'),
        },
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.css/,
                use: ['vue-style-loader', 'css-loader']
            }
        ]
    }
}