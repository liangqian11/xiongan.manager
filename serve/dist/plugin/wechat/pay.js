'use strict';

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _ = require('lodash');
var request = require('request');
var md5 = require('md5');

var _require = require('../../config'),
    WEPAY = _require.WEPAY;

var log = require('../util/log');
var xml = require('../util/xml');
var time = require('../util/time');
var serial = require('../util/serial');

exports.prepay = function (args) {
  return new _promise2.default(function () {
    var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(resolve, reject) {
      var params, strxml, data, result, paySign;
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              params = _setPrepayParams(args);
              strxml = xml.toXml(params);
              _context.next = 5;
              return _requestPrepay(strxml);

            case 5:
              data = _context.sent;
              result = {
                appId: WEPAY.APPID,
                timeStamp: time.time(),
                nonceStr: serial.nonceStr(),
                package: 'prepay_id=' + data.prepay_id,
                signType: 'MD5'
              };
              paySign = _getSign(result);

              result.paySign = paySign;

              delete result.appId;

              resolve(result);
              _context.next = 17;
              break;

            case 13:
              _context.prev = 13;
              _context.t0 = _context['catch'](0);

              log.error('进入error');
              reject(_context.t0);

            case 17:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, this, [[0, 13]]);
    }));

    return function (_x, _x2) {
      return _ref.apply(this, arguments);
    };
  }());
};

var _setPrepayParams = function _setPrepayParams(args) {
  var params = {
    appid: WEPAY.APPID,
    mch_id: WEPAY.MCH_ID,
    notify_url: WEPAY.NOTIFY_URL,
    trade_type: WEPAY.TRADE_TYPE,
    nonce_str: serial.nonceStr()
  };
  params = _.merge(params, args);
  params.sign = _getSign(params);
  return params;
};

var _requestPrepay = function _requestPrepay(params) {
  return new _promise2.default(function (resolve, reject) {
    var url = 'https://api.mch.weixin.qq.com/pay/unifiedorder';
    request({ url: url, method: 'POST', body: params }, function () {
      var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(error, response, body) {
        var obj, json;
        return _regenerator2.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                if (!(!error && response.statusCode === 200)) {
                  _context2.next = 8;
                  break;
                }

                _context2.next = 3;
                return xml.toObj(body);

              case 3:
                obj = _context2.sent;
                json = obj.xml;

                if (json.return_code === 'SUCCESS' && json.result_code === 'SUCCESS') {
                  resolve(json);
                } else {
                  reject('返回码不正确');
                }
                _context2.next = 9;
                break;

              case 8:
                reject(error);

              case 9:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      return function (_x3, _x4, _x5) {
        return _ref2.apply(this, arguments);
      };
    }());
  });
};

var _getSign = function _getSign(params) {
  params = _.clone(params);
  delete params.sign;
  var str = _getQueryString(params);
  var stringSignTemp = str + '&key=' + WEPAY.KEY;
  var sign = md5(stringSignTemp).toUpperCase();
  return sign;
};

var _getQueryString = function _getQueryString(object) {
  return (0, _keys2.default)(object).filter(function (key) {
    return object[key] !== undefined && object[key] !== '';
  }).sort().map(function (key) {
    return key + '=' + object[key];
  }).join('&');
};