/**
 * https://github.com/shelljs/shelljs
 * 构建时的执行文件：node build/build.js
 */
require('shelljs/global')
env.NODE_ENV = 'production'

var path = require('path')
var config = require('./config')
var ora = require('ora')
var webpack = require('webpack')
var webpackConfig = require('./webpack.prod.conf')

// 输出提示
console.log('  提示:\n' + '  请使用http服务器浏览，不要使用file协议打开。\n')

// 启动ora对象
var spinner = ora('正在构建发布版本，请稍候...')
spinner.start()

// 删除原dist目录，创建新的dist目录
var assetsPath = path.join(config.build.assetsRoot, config.build.assetsSubDirectory)
rm('-rf', assetsPath)
mkdir('-p', assetsPath)
//cp('-R', 'src/static/*', assetsPath)

// 执行webpack，并输出编译结果
webpack(webpackConfig, function (err, stats) {
  spinner.stop()
  if (err) throw err
  process.stdout.write(stats.toString({
    colors: true,
    modules: false,
    children: false,
    chunks: false,
    chunkModules: false
  }) + '\n')
})
