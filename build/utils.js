var path = require('path')
var fs = require('fs')
var config = require('./config')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var glob = require('glob')

/**
 * 使用glob提取该目录下的文件
 */
exports.getEntry = function(globPath, type) {
  var splice = type === 'html' ? 4 : 3
  var entries = {}, basename, tmp, pathname
  glob.sync(globPath).forEach(function (entry) {
    basename = path.basename(entry, path.extname(entry))
    tmp = entry.split('/').splice(splice) // 此处是删除./front/src/router，否则连同.和front/src/router也一并输出了
    tmp.splice(-1, 1, basename)
    pathname = tmp.join('\/')
    entries[pathname] = entry
  })
  return entries
}

/**
 * 循环遍历创建目录，同步版本
 */
exports.mkdirsSync = function(dirpath, mode) {
  if (!fs.existsSync(dirpath)) {
    var pathtmp
    dirpath.split(path.sep).forEach(function(dirname) {
      if (pathtmp) {
        pathtmp = path.join(pathtmp, dirname)
      }
      else {
        pathtmp = dirname
      }
      if (!fs.existsSync(pathtmp)) {
        if (!fs.mkdirSync(pathtmp, mode)) {
          return false
        }
      }
    })
  }
  return true
}

/**
 * 取资源目录
 */
exports.assetsPath = function (_path) {
  var assetsSubDirectory = process.env.NODE_ENV === 'production'
    ? config.build.assetsSubDirectory
    : config.dev.assetsSubDirectory
  return path.posix.join(assetsSubDirectory, _path)
}

/**
 * 设置css的loader
 */
exports.cssLoaders = function (options) {
  options = options || {}
  // generate loader string to be used with extract text plugin
  function generateLoaders (loaders) {
    var sourceLoader = loaders.map(function (loader) {
      var extraParamChar
      if (/\?/.test(loader)) {
        loader = loader.replace(/\?/, '-loader?')
        extraParamChar = '&'
      } else {
        loader = loader + '-loader'
        extraParamChar = '?'
      }
      return loader + (options.sourceMap ? extraParamChar + 'sourceMap' : '')
    }).join('!')

    if (options.extract) {
      return ExtractTextPlugin.extract('vue-style-loader', sourceLoader)
    } else {
      return ['vue-style-loader', sourceLoader].join('!')
    }
  }

  // http://vuejs.github.io/vue-loader/configurations/extract-css.html
  return {
    css: generateLoaders(['css']),
    postcss: generateLoaders(['css']),
    less: generateLoaders(['css', 'less']),
    sass: generateLoaders(['css', 'sass?indentedSyntax']),
    scss: generateLoaders(['css', 'sass']),
    stylus: generateLoaders(['css', 'stylus']),
    styl: generateLoaders(['css', 'stylus'])
  }
}

/**
 * 生成独立的css文件的loader（将css从vue中提取出来）
 */
exports.styleLoaders = function (options) {
  var output = []
  var loaders = exports.cssLoaders(options)
  for (var extension in loaders) {
    var loader = loaders[extension]
    output.push({
      test: new RegExp('\\.' + extension + '$'),
      loader: loader
    })
  }
  return output
}
