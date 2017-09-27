'use strict';

var mysql = require('mysql');

var MYSQL_DATABASE = {
  XIONGAN: {
    host: 'mysql.rdsm2glams7fhd5.rds.bj.baidubce.com',
    user: 'zdboy',
    password: 'Ac591234',
    database: 'he_xiongan'
  }
};

var MYSQL = {
  XIONGAN: mysql.createPool(MYSQL_DATABASE.XIONGAN)
};

var REDIS = {
  MAIN: {
    HOST: 'redis.sjnvwllcdjkp.scs.bj.baidubce.com',
    PORT: 6379
  }
};

module.exports = { MYSQL: MYSQL, REDIS: REDIS };