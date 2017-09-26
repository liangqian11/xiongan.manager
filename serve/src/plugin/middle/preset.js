//---------------------------------------------------------------------------- Package
const _ = require('lodash')
const request = require('request')
//---------------------------------------------------------------------------- Plugin
const mysql = require('../util/mysql')
const sheet = require('../util/sheet')
//---------------------------------------------------------------------------- 导出插件
/**
 * 设置导出格式与文本编码
 * 验证用户token，如果不存在auth，或没有此用户，则返回验证失败
 * @param {MysqlPool} pool mysql连接池对象
 */
module.exports = function (pool) {
  return async (ctx, next) => {
    // 设置导出格式为json，编码格式为utf-8
    ctx.type = 'application/json; charset=utf-8'
    ctx.session.username = ctx.session.username || ''
    if (ctx.session.username== '') {
      ctx.manager = null
    } else {
      let sql = ['select * from admin where username=?']
      let arg = [ctx.session.username]
      // let arg = ['liuyaqian']
      // let arg = [13]
      let manager = await mysql.query(pool.LIMIT, sql, arg)
      ctx.manager = manager[0][0] || null
    }
    await next()
  }
}
