'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var request = require('request');
var Redis = require('ioredis');

var _require = require('../../config'),
    REDIS = _require.REDIS,
    WECHAT = _require.WECHAT;

var log = require('../util/log');

var redis = new Redis(REDIS.MAIN.PORT, REDIS.MAIN.HOST);

exports.getToken = function () {
  return new _promise2.default(function () {
    var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(resolve, reject) {
      var redis_token, token;
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              _context.next = 3;
              return redis.get('wechat_access_token');

            case 3:
              redis_token = _context.sent;

              redis_token = redis_token ? JSON.parse(redis_token) : { time: 0 };
              log.info('获得redis wechat_access_token: ' + (0, _stringify2.default)(redis_token));

              if (!(redis_token.time === 0 || new Date().getTime() - redis_token.time > 7180000)) {
                _context.next = 14;
                break;
              }

              log.info('redis wechat_access_token不存在或已超时，使用新获取的wechat_access_token');
              _context.next = 10;
              return _requestToken();

            case 10:
              token = _context.sent;

              _saveToken(token);
              resolve(token);
              return _context.abrupt('return');

            case 14:
              log.info('使用已存在的redis wechat_access_token');
              resolve(redis_token.token);
              _context.next = 21;
              break;

            case 18:
              _context.prev = 18;
              _context.t0 = _context['catch'](0);

              log.error(_context.t0);

            case 21:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, this, [[0, 18]]);
    }));

    return function (_x, _x2) {
      return _ref.apply(this, arguments);
    };
  }());
};

var _requestToken = function _requestToken() {
  return new _promise2.default(function (resolve, reject) {
    var url = "https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=" + WECHAT.APPID + "&secret=" + WECHAT.APPSECRET;
    request(url, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        log.info('request获得wechat_access_token: ' + body);
        var token = JSON.parse(body);
        if (token.errcode) {
          reject('获取wechat_access_token时，返回码错误: ' + body);
        } else {
          resolve(token.access_token);
        }
      }
      reject('获取wechat_access_token时，网络出错');
    });
  });
};

var _saveToken = function _saveToken(token) {
  var value = '{"token": "' + token + '", "time": ' + new Date().getTime() + '}';
  redis.set('wechat_access_token', value);
  log.info('保存redis wechat_access_token: ' + value);
};