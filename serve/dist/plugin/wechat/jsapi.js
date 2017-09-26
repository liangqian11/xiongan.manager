'use strict';

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var request = require('request');
var jsSHA = require('jssha');
var Redis = require('ioredis');

var _require = require('../../config'),
    REDIS = _require.REDIS,
    WECHAT = _require.WECHAT;

var log = require('../util/log');
var serial = require('../util/serial');
var time = require('../util/time');

var wetoken = require('./token');

var redis = new Redis(REDIS.MAIN.PORT, REDIS.MAIN.HOST);

exports.getConfig = function () {
  var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(url) {
    var result, string, shaObj;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _getTicket();

          case 2:
            _context.t0 = _context.sent;
            _context.t1 = serial.nonceStr();
            _context.t2 = time.time();
            _context.t3 = url;
            result = {
              jsapi_ticket: _context.t0,
              nonceStr: _context.t1,
              timestamp: _context.t2,
              url: _context.t3
            };
            string = _raw(result);
            shaObj = new jsSHA('SHA-1', 'TEXT');

            shaObj.update(string);
            result.signature = shaObj.getHash("HEX");
            result.appId = WECHAT.APPID;

            delete result.jsapi_ticket;

            return _context.abrupt('return', result);

          case 14:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function (_x) {
    return _ref.apply(this, arguments);
  };
}();

var _getTicket = function () {
  var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3() {
    return _regenerator2.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            return _context3.abrupt('return', new _promise2.default(function () {
              var _ref3 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(resolve, reject) {
                var redis_ticket, token, ticket;
                return _regenerator2.default.wrap(function _callee2$(_context2) {
                  while (1) {
                    switch (_context2.prev = _context2.next) {
                      case 0:
                        _context2.prev = 0;
                        _context2.next = 3;
                        return redis.get('wechat_jsapi_ticket');

                      case 3:
                        redis_ticket = _context2.sent;

                        redis_ticket = redis_ticket ? JSON.parse(redis_ticket) : { time: 0 };
                        log.info('获取redis wechat_jsapi_ticket: ' + (0, _stringify2.default)(redis_ticket));

                        if (!(redis_ticket.time === 0 || new Date().getTime() - redis_ticket.time > 7180000)) {
                          _context2.next = 17;
                          break;
                        }

                        log.info('redis wechat_jsapi_ticket不存在或已超时，使用新获取的wechat_jsapi_ticket');
                        _context2.next = 10;
                        return wetoken.getToken();

                      case 10:
                        token = _context2.sent;
                        _context2.next = 13;
                        return _requestTicket(token);

                      case 13:
                        ticket = _context2.sent;

                        _saveTicket(ticket);
                        resolve(ticket);
                        return _context2.abrupt('return');

                      case 17:
                        log.info('使用已存在的redis wechat_jsapi_ticket');
                        resolve(redis_ticket.ticket);
                        _context2.next = 24;
                        break;

                      case 21:
                        _context2.prev = 21;
                        _context2.t0 = _context2['catch'](0);

                        log.error(_context2.t0);

                      case 24:
                      case 'end':
                        return _context2.stop();
                    }
                  }
                }, _callee2, this, [[0, 21]]);
              }));

              return function (_x2, _x3) {
                return _ref3.apply(this, arguments);
              };
            }()));

          case 1:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, this);
  }));

  return function _getTicket() {
    return _ref2.apply(this, arguments);
  };
}();

var _requestTicket = function _requestTicket(token) {
  return new _promise2.default(function (resolve, reject) {
    var url = "https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token=" + token + "&type=jsapi";
    request(url, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        log.info('request获得wechat_jsapi_ticket信息: ' + body);
        var ticket = JSON.parse(body);
        if (ticket.errcode) {
          reject('获取wechat_jsapi_ticket时，返回码错误: ' + body);
        } else {
          resolve(ticket.ticket);
        }
      }
      reject('获取wechat_jsapi_ticket时，网络出错');
    });
  });
};

var _saveTicket = function _saveTicket(ticket) {
  var value = '{"ticket": "' + ticket + '", "time": ' + new Date().getTime() + '}';
  redis.set('wechat_jsapi_ticket', value);
  log.info('保存redis wechat_jsapi_ticket: ' + value);
};

var _raw = function _raw(args) {
  var keys = (0, _keys2.default)(args);
  keys = keys.sort();
  var newArgs = {};
  keys.forEach(function (key) {
    newArgs[key.toLowerCase()] = args[key];
  });
  var string = '';
  for (var k in newArgs) {
    string += '&' + k + '=' + newArgs[k];
  }
  string = string.substr(1);
  return string;
};