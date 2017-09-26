/**
 * 此文件定义dev环境下的config
 */
var config = require('./config')
var webpack = require('webpack')
var merge = require('webpack-merge')
var utils = require('./utils')
var baseWebpackConfig = require('./webpack.base.conf')
var HtmlWebpackPlugin = require('html-webpack-plugin')

/**
 * 添加浏览器自刷新
 */
Object.keys(baseWebpackConfig.entry).forEach(function (name) {
  baseWebpackConfig.entry[name] = ['./build/dev-client'].concat(baseWebpackConfig.entry[name])
})

/**
 * 将以下配置合并到baseConfig
 */
module.exports = merge(baseWebpackConfig, {

  // 将dev环境下的css设置为独立编译
  module: {
    loaders: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap })
  },

  // 设置sourcemap
  devtool: '#eval-source-map',

  // 插件设置
  plugins: [
    new webpack.DefinePlugin({
      'process.env': config.dev.env
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    // https://github.com/glenjamin/webpack-hot-middleware#installation--usage
    new webpack.optimize.OccurenceOrderPlugin(),
    // https://github.com/ampedandwired/html-webpack-plugin
    // new HtmlWebpackPlugin({
    //   filename: 'index.html',
    //   template: 'index.html',
    //   inject: true
    // })
  ]
})

/**
 * 多文件导出
 */
var pages = utils.getEntry('./front/src/router/**/*.vue', 'html');
for (var pathname in pages) {
  // 配置生成的html文件，定义路径等
  var conf = {
    filename: pathname + '.html',
    template: './index.html', // 模板路径
    chunks: [pathname, 'vendor', 'manifest', 'main'], // 每个html引用的js模块
    inject: true,  // js插入位置
    minify: {
      removeComments: true,
      collapseWhitespace: true,
    },
    chunksSortMode: 'dependency'
  }
  // 需要生成几个html文件，就配置几个HtmlWebpackPlugin对象
  module.exports.plugins.push(new HtmlWebpackPlugin(conf));
}