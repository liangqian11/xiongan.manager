'use strict';

var _ = require('lodash');

exports.time = function () {
  return parseInt(_.now().toString().substr(0, 10));
};

exports.time13 = function () {
  return parseInt(_.now());
};

exports.format = function (format, time) {
  if (_.isNil(time)) {
    time = this.time13();
  }

  if (time.toString().length === 10) {
    time *= 1000;
  }

  var d = new Date(time);
  var date = {
    'M+': d.getMonth() + 1,
    'd+': d.getDate(),
    'h+': d.getHours(),
    'm+': d.getMinutes(),
    's+': d.getSeconds(),
    'q+': Math.floor((d.getMonth() + 3) / 3),
    'S+': d.getMilliseconds()
  };

  if (/(y+)/i.test(format)) {
    format = format.replace(RegExp.$1, (d.getFullYear() + '').substr(4 - RegExp.$1.length));
  }
  for (var k in date) {
    if (new RegExp('(' + k + ')').test(format)) {
      format = format.replace(RegExp.$1, RegExp.$1.length === 1 ? date[k] : ('00' + date[k]).substr(('' + date[k]).length));
    }
  }

  return format;
};