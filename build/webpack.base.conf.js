require('shelljs/global')
var _ = require('lodash')
var fs = require('fs')
var path = require('path')
var glob = require('glob')
var config = require('./config')
var utils = require('./utils')
var webpack = require('webpack')
var projectRoot = path.resolve(__dirname, '../')

/**
 * 获取router目录位置，如果存在的话，删除之
 */
var routerDir = path.resolve(__dirname, './router/')
if (fs.existsSync(routerDir)) {
  rm('-rf', routerDir)
}

/**
 * 查找所有src下的vue文件，并遍历添加bridge下的js
 */
var vues = utils.getEntry('./front/src/router/**/*.vue', 'router')
for (let vue in vues) {
  // 取entry（文件全路径）
  let entry = vues[vue]
  let basename = path.basename(entry, path.extname(entry))

  // 处理pathname，最终结果为bridge下的js路径
  let pathname = entry.split('/').splice(2)
  pathname.splice(-1, 1, basename + '.js')
  pathname = pathname.splice(1)
  pathname = './build' + path.sep + pathname.join(path.sep)

  // 确认vue文件地址，最终结果类似'../../../../src/xxx/xxx'
  let vuefile = entry.split('/').splice(3)
  vuefile = _.repeat('../', vuefile.length) + 'front/src/' + vuefile.join('/')
 
  // 声明代码内容
  let code = `
  import Vue from 'vue'
  import app from '${vuefile}'
  /* eslint-disable */
  new Vue({
    el: '#app',
    render: h => h(app)
  })`

  // 如果目录不存在，则创建目录
  // 并将代码写入bridge下的js文件
  let dirname = path.dirname(pathname)
  if (!fs.existsSync(dirname)) {
    utils.mkdirsSync(dirname)
  }
  fs.writeFileSync(pathname, code)
}

/**
 * bridge js文件入口
 * 添加main文件入口
 */
var entries = utils.getEntry('./build/router/**/*.js')
entries.main = './front/src/main.js'

/**
 * 进行webpack值的传入
 * @type {Object}
 */
module.exports = {
  entry: entries,
  output: {
    path: config.build.assetsRoot,
    publicPath: process.env.NODE_ENV === 'production' ? config.build.assetsPublicPath : config.dev.assetsPublicPath,
    filename: '[name].js'
  },
  resolve: {
    extensions: ['', '.js', '.less', '.vue'],
    fallback: [path.join(__dirname, '/node_modules')],
    alias: {}
  },
  resolveLoader: { fallback: [path.join(__dirname, '/node_modules')] },
  module: {
    preLoaders: [
      { test: /\.vue$/, loader: 'eslint', include: projectRoot, exclude: /node_modules/ },
      { test: /\.js$/, loader: 'eslint', include: projectRoot, exclude: /node_modules/ }
    ],
    loaders: [
      { test: /\.vue$/, loader: 'vue' },
      { test: /\.js$/, loader: 'babel', include: projectRoot, exclude: /node_modules/ },
      { test: /\.json$/, loader: 'json' },
      { test: /\.pug$/, loader: 'pug' },
      { test: /\.jade$/, loader: 'jade' },
      { test: /\.(png|jpe?g|gif|svg)(\?.*)?$/, loader: 'url', query: { limit: 10000, name: utils.assetsPath('static/img/[name].[hash:7].[ext]') } },
      { test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/, loader: 'url', query: { limit: 10000, name: utils.assetsPath('static/fonts/[name].[hash:7].[ext]') } }
    ]
  },
  eslint: { formatter: require('eslint-friendly-formatter') },
  vue: {
    loaders: utils.cssLoaders(),
    postcss: [
      require('autoprefixer')({
        browsers: ['last 2 versions']
      })
    ]
  },
  plugins: [
    // 分割vendor为单独的js文件
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: function (module, count) {
        return (
          module.resource &&
          /\.js$/.test(module.resource) &&
          module.resource.indexOf(
            path.join(__dirname, '../../node_modules')
          ) === 0
        )
      }
    }),
    // 提取webpack自己的文件为manifest
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest',
      chunks: ['vendor']
    })
  ]
}
