module.exports = {
    chainWebpack: config => {
        config.plugin('html').tap(args => {
            args[0].title = process.env.VUE_APP_TITLE;
            return args;
        })
    },
    devServer: {
        proxy: process.env.VUE_APP_HTTP + process.env.VUE_APP_DOMAIN + ':' + process.env.VUE_APP_BACKENDPORT,
        port: process.env.VUE_APP_PORT
    }
}