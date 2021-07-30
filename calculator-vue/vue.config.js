process.env.VUE_APP_VERSION = require('./package.json').version;

const webpack = require('webpack');

module.exports = {
    css: {
        loaderOptions: {
            sass: {
                additionalData: `@import "@/css/_variables.scss";`
            }
        }
    },
    chainWebpack: config => {
        config
            .plugin('provide')
            .use(webpack.ProvidePlugin, [{
                $: 'jquery',
                jquery: 'jquery',
                jQuery: 'jquery',
                'window.jQuery': 'jquery'
            }]);
    }
}