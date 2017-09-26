/**
 * http://vuejs-templates.github.io/webpack
 * build全局配置
 */
var path = require('path')
var env = require('../../front/src/config/env')

module.exports = {
  build: {
    env: require('./prod.env'),
    index: path.resolve(__dirname, '../../front/dist/index.html'),
    assetsRoot: path.resolve(__dirname, '../../front/dist'),
    assetsSubDirectory: '',
    assetsPublicPath: '/',
    productionSourceMap: true,
    // gzip默认关闭，在设置为true之前，请确保
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css']
  },
  dev: {
    env: require('./dev.env'),
    port: env.port,
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {},
    cssSourceMap: false
  }
}
