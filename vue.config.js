module.exports = {
    devServer: {
        open: true, //浏览器自动打开页面
        host: "localhost", //本地服务器访问的路径
        port: 8080, //本地服务器访问的端口
        proxy: {
            '/feiyan': {
                //你要跨域的域名(包含host、端口号,切记：一定要带上http头);
                //同一个域名只能设置一次跨域，否则重复报错！
                target: 'https://iflow-api.uc.cn',
                changeOrigin: true, //是否跨域，设置为true;(必须)
            },
            '/': {
                //你要跨域的域名(包含host、端口号,切记：一定要带上http头);
                //同一个域名只能设置一次跨域，否则重复报错！
                target: 'http://biger.applinzi.com',
                changeOrigin: true, //是否跨域，设置为true;(必须)
            },
            '/recommend':{
                target:'https://api.hongbeibang.com',
                changeOrigin: true,
            }
        }
    },

    publicPath: './'
}
