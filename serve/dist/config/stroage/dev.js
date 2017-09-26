'use strict';

var mysql = require('mysql');

var MYSQL_DATABASE = {
  XIONGAN: {
    host: '192.168.0.96',
    user: 'root',
    password: '123456',
    database: 'he_xiongan'
  }
};

var MYSQL = {
  XIONGAN: mysql.createPool(MYSQL_DATABASE.XIONGAN)
};

var REDIS = {
  MAIN: {
    HOST: 'localhost',
    PORT: 6379
  }
};

module.exports = { MYSQL: MYSQL, REDIS: REDIS };