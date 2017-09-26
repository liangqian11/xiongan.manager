/**
 * dev开发时的执行文件：node build/dev-server.js
 * 服务器是使用的express
 */
var path = require('path')
var express = require('express')
var webpack = require('webpack')
var config = require('./config')
var opn = require('opn')
var proxyMiddleware = require('http-proxy-middleware')
var webpackConfig = process.env.NODE_ENV === 'testing'
  ? require('./webpack.prod.conf')
  : require('./webpack.dev.conf')

// 定义端口号
var port = process.env.PORT || config.dev.port

// 定义代理：https://github.com/chimurai/http-proxy-middleware
var proxyTable = config.dev.proxyTable

// 初始化对象
var app = express()
var compiler = webpack(webpackConfig)

// 定义dev中间件的参数
var devMiddleware = require('webpack-dev-middleware')(compiler, {
  publicPath: webpackConfig.output.publicPath,
  stats: {
    colors: true,
    chunks: false
  }
})

// 定义hot中间件参数
var hotMiddleware = require('webpack-hot-middleware')(compiler)

// 当html-webpack-plugin模板改变时，强制刷新浏览器
compiler.plugin('compilation', function (compilation) {
  compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
    hotMiddleware.publish({ action: 'reload' })
    cb()
  })
})

// proxy api requests
Object.keys(proxyTable).forEach(function (context) {
  var options = proxyTable[context]
  if (typeof options === 'string') {
    options = { target: options }
  }
  app.use(proxyMiddleware(context, options))
})

// 1.handle fallback for HTML5 history API
// 2.serve webpack bundle output
// 3.enable hot-reload and state-preserving
//   compilation error display
app.use(require('connect-history-api-fallback')())
app.use(devMiddleware)
app.use(hotMiddleware)

// serve pure static assets
// var staticPath = path.posix.join(config.dev.assetsPublicPath, config.dev.assetsSubDirectory)
// app.use(staticPath, express.static('./static'))

/**
 * 监听端口开启服务器，并打开浏览器到指定页面 
 */
module.exports = app.listen(port, function (err) {
  if (err) {
    console.log(err)
    return
  }
  var uri = 'http://localhost:' + port
  console.log('Listening at ' + uri + '\n')
  opn(uri)
})
