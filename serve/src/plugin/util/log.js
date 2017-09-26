//---------------------------------------------------------------------------- Package
const colors = require('colors')
//---------------------------------------------------------------------------- Config
const { DEBUG, LOG } = require('../../config')
//---------------------------------------------------------------------------- info
/**
 * 输出信息
 * @param String msg 信息
 */
exports.info = function (msg) {
  if (DEBUG) {
    console.log(msg)
  }
}
//---------------------------------------------------------------------------- warn
/**
 * 输出警告
 * @param String msg 信息
 */
exports.warn = function (msg) {
  if (DEBUG) {
    console.warn(msg.yellow)
  }
}
//---------------------------------------------------------------------------- error
/**
 * 输出错误
 * @param String msg 信息
 */
exports.error = function (msg) {
  if (DEBUG === true) {
    console.error(msg.red)
  }
}
//---------------------------------------------------------------------------- stop
/**
 * 抛出问题并停止运行
 * @param String msg 信息
 */
exports.stop = function (msg) {
  if (DEBUG) {
    throw new Error(msg)
  }
}
