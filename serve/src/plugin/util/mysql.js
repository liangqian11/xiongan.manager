//---------------------------------------------------------------------------- Package
const _ = require('lodash')
//---------------------------------------------------------------------------- query
/**
 * 执行一次或多次查询操作
 * @param config object 连接mysql数据库时的配置项
 * @param querys any 查询字符串，可使用?参数，必须是字符串或数组
 * @param values any 查询参数的值，每值可以是任意类型，但必须与查询参数数量一致
 */
exports.query = async function (pool, sqls, args) {
  _assertArgs(sqls, args)
  let data = []
  for (let i = 0, l = sqls.length; i < l; i++) {
    // 注意这里的args=null的问题
    data.push(await _exec(pool, sqls[i], _getArg(i, args)))
  }
  return data
}
//---------------------------------------------------------------------------- _exec
/**
 * 执行单条sql语句，不管是query还是push，都可以执行
 */
const _exec = function (pool, sql, arg) {
  return new Promise(function (resolve, reject) {
    // 使用连接池进行操作
    pool.getConnection(function (err, conn) {
      if (err) throw err
      conn.query(sql, arg, function (err, result) {
        if (err) throw err
        conn.release()
        resolve(result)
      })
    })
  })
}
//---------------------------------------------------------------------------- _assertArgs
/**
 * 断言sql参数是否正确
 * @param sqls array 需要判断的sql语句数组
 * @param args array 需要判断的参数数组
 */
const _assertArgs = function (sqls, args) {
  if (!_.isArray(sqls)) {
    throw new Error('sqls必须为数组！')
  }
  if (!_.isArray(args) && args !== null) {
    throw new Error('args必须为数组或null！')
  }
}
//---------------------------------------------------------------------------- _getArg
/**
 * 根据index，返回一个可用的arg
 * @param index number 被遍历的索引
 * @param args array 被遍历的参数数组
 */
const _getArg = function (index, args) {
  if (args === null) {
    return null
  }
  if (_.isArray(args[index])) {
    return args[index]
  } else {
    return args
  }
}
