'use strict';

var colors = require('colors');

var _require = require('../../config'),
    DEBUG = _require.DEBUG,
    LOG = _require.LOG;

exports.info = function (msg) {
  if (DEBUG) {
    console.log(msg);
  }
};

exports.warn = function (msg) {
  if (DEBUG) {
    console.warn(msg.yellow);
  }
};

exports.error = function (msg) {
  if (DEBUG === true) {
    console.error(msg.red);
  }
};

exports.stop = function (msg) {
  if (DEBUG) {
    throw new Error(msg);
  }
};