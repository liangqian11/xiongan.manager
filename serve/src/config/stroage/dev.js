const mysql = require('mysql')

/**
 * mysql 数据库设置
 */
const MYSQL_DATABASE = {
  // 雄安库
  XIONGAN: {
    host: '192.168.0.96',
    user: 'root',
    password: '123456',
    database: 'xiongan'
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
    HOST: 'localhost',
    PORT: 6379
  }
}

/**
 * 导出
 */
module.exports = { MYSQL, REDIS }
