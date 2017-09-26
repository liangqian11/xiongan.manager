//---------------------------------------------------------------------------- Package
const fs = require('fs');
const os = require('os');
const path = require('path');
//---------------------------------------------------------------------------- mkdirSync
/**
 * 循环遍历创建目录，同步版本
 */
exports.mkdirSync = function (dirpath, mode) {
  if (!fs.existsSync(dirpath)) {

    // 声明临时目录字符串
    let pathtmp = os.platform() == 'linux' ? '/' : null;

    // 分割并遍历fullpath
    let arr = dirpath.split(path.sep);

    // 遍历创建目录
    for (let dirname of arr) {
      if (dirname != '') {

        // 如果pathtmp已被赋值，则添加下一个子目录
        // 否则直接等于dirname
        if (pathtmp) {
          pathtmp = path.join(pathtmp, dirname);
        } else {
          pathtmp = dirname;
        }

        // 如果该子目录不存在，则同步创建
        if (!fs.existsSync(pathtmp)) {
          fs.mkdirSync(pathtmp, mode);
        }
      }
    }
  }

  // 返回true
  return true;
};