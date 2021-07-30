const path = require('path');

module.exports = {
    mode: 'development',
    resolve: {
        extensions: ['.js', '.vue', '.ts', '.tsx'],
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
            },
            {
                test: /\.s[ac]ss$/,
                use: [
                    'vue-style-loader',
                    'css-loader',
                    {
                        loader: 'sass-loader',
                        options: {
                            sassOptions: {
                                additionalData: '@import "@/css/_variables.scss',
                            },
                        },
                    },
                ],
            },
        ],
    },
};