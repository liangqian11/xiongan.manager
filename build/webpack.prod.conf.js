/**
 * 此文件定义prod环境下的config
 */
var path = require('path')
var config = require('./config')
var utils = require('./utils')
var webpack = require('webpack')
var merge = require('webpack-merge')
var baseWebpackConfig = require('./webpack.base.conf')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var env = process.env.NODE_ENV === 'testing'
  ? require('./config/test.env')
  : config.build.env

/**
 * 全并到baseConfig
 */
module.exports = merge(baseWebpackConfig, {

  // css loader
  module: {
    loaders: utils.styleLoaders({ sourceMap: config.build.productionSourceMap, extract: true })
  },

  // sourcemap
  devtool: config.build.productionSourceMap ? '#source-map' : false,

  // output
  output: {
    path: config.build.assetsRoot,
    filename: utils.assetsPath('static/js/[name].[chunkhash].js'),
    chunkFilename: utils.assetsPath('static/js/[id].[chunkhash].js')
  },

  // vue
  vue: {
    loaders: utils.cssLoaders({
      sourceMap: config.build.productionSourceMap,
      extract: true
    })
  },

  // 插件
  plugins: [
    // http://vuejs.github.io/vue-loader/workflow/production.html
    new webpack.DefinePlugin({
      'process.env': env
    }),

    // 压缩js
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    new webpack.optimize.OccurenceOrderPlugin(),

    // 输出独立的css文件
    new ExtractTextPlugin(utils.assetsPath('static/css/[name].[contenthash].css')),

    // 根据index.html生成模板并自动注入assets
    // new HtmlWebpackPlugin({
    //   filename: process.env.NODE_ENV === 'testing'
    //     ? 'index.html'
    //     : config.build.index,
    //   template: 'index.html',
    //   inject: true,
    //   minify: {
    //     removeComments: true,
    //     collapseWhitespace: true,
    //     removeAttributeQuotes: true
    //   },
    //   chunksSortMode: 'dependency'
    // }),
  ]
})

/**
 * 如果启用了gzip特性，则使用下面设置
 */
if (config.build.productionGzip) {
  var CompressionWebpackPlugin = require('compression-webpack-plugin')
  webpackConfig.plugins.push(
    new CompressionWebpackPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: new RegExp(
        '\\.(' +
        config.build.productionGzipExtensions.join('|') +
        ')$'
      ),
      threshold: 10240,
      minRatio: 0.8
    })
  )
}

/**
 * 多文件导出
 */
var pages = utils.getEntry('./front/src/router/**/*.vue', 'html');
for (var pathname in pages) {
  console.log(pathname)
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