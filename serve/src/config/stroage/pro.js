const mysql = require('mysql')

/**
 * mysql 数据库设置
 */
const MYSQL_DATABASE = {
  // 用户库
  XIONGAN: {
    host: 'mysql.rdsm2glams7fhd5.rds.bj.baidubce.com',
    user: 'zdboy',
    password: 'Ac591234',
    database: 'he_xiongan'
  }
}

/**
 * mysql 连接池对象
 */
const MYSQL = {
  XIONGAN: mysql.createPool(MYSQL_DATABASE.XIONGAN)
}

/**
 * redis连接配置项
 */
const REDIS = {
  MAIN: {
    HOST: 'redis.sjnvwllcdjkp.scs.bj.baidubce.com',
    PORT: 6379
  }
}

/**
 * 导出
 */
module.exports = { MYSQL, REDIS }
