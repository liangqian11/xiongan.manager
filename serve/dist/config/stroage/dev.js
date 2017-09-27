'use strict';

var mysql = require('mysql');

var MYSQL_DATABASE = {
  XIONGAN: {
    host: '192.168.1.45',
    user: 'root',
    password: '123456',
    database: 'xiongan'
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