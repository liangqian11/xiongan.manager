'use strict';

exports.nonceStr = function (length) {
  var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var maxPos = chars.length;
  var nonceStr = '';
  for (var i = 0; i < (length || 32); i++) {
    nonceStr += chars.charAt(Math.floor(Math.random() * maxPos));
  }
  return nonceStr;
};

exports.genchar = function () {
  var length = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 4;

  return gencode('char', length);
};

exports.gennumber = function () {
  var length = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 4;

  return gencode('number', length);
};

exports.genmixed = function () {
  var length = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 8;

  return gencode('mixed', length);
};

function gencode(type, length) {
  var source = {
    chars: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    number: '0123456789',
    mixed: 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
  };
  source = source[type];
  var maxPos = source.length;

  var result = '';
  for (var i = 0; i < length; i++) {
    result += source.charAt(Math.floor(Math.random() * maxPos));
  }
  return result;
}