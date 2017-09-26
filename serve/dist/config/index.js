'use strict';

var _ = require('lodash');
var ENV = require('./env');
var WECHAT = require('./wechat/wechat');
var WEPAY = require('./wechat/wepay');

var STROAGE = null;
if (ENV.ENV.toLowerCase() === 'pro') {
  STROAGE = require('./stroage/pro');
} else {
  STROAGE = require('./stroage/dev');
}

module.exports = _.merge(ENV, STROAGE, WECHAT, WEPAY);