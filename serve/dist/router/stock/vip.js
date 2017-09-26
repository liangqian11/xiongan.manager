'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _require = require('../../config'),
    MYSQL = _require.MYSQL;

var mysql = require('../../plugin/util/mysql');
var sheet = require('../../plugin/util/sheet');

exports.get = {
  '/vip/list': function () {
    var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(ctx, next) {
      var arg, sql, data;
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              arg = [];
              sql = ['select * from vip  order by id desc '];
              _context.next = 4;
              return mysql.query(MYSQL.STOCK, sql, arg);

            case 4:
              data = _context.sent;

              sheet[0].data = data[0];
              ctx.body = sheet[0];

            case 7:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, undefined);
    }));

    return function vipList(_x, _x2) {
      return _ref.apply(this, arguments);
    };
  }()
};

exports.post = {
  '/vip/add': function () {
    var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(ctx, next) {
      var _ctx$request$body, price, time, enabled, sql, arg, result;

      return _regenerator2.default.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _ctx$request$body = ctx.request.body, price = _ctx$request$body.price, time = _ctx$request$body.time, enabled = _ctx$request$body.enabled;
              sql = ['insert into vip (price, time, enabled) values(?,?,?)'];
              arg = [price, time, 1];
              _context2.next = 5;
              return mysql.query(MYSQL.STOCK, sql, arg);

            case 5:
              result = _context2.sent;

              ctx.body = sheet[0];

            case 7:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, undefined);
    }));

    return function vipAdd(_x3, _x4) {
      return _ref2.apply(this, arguments);
    };
  }()
};

exports.put = {
  '/vip/uprow': function () {
    var _ref3 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3(ctx, next) {
      var _ctx$request$body2, id, price, time, enabled, sql, arg, result;

      return _regenerator2.default.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _ctx$request$body2 = ctx.request.body, id = _ctx$request$body2.id, price = _ctx$request$body2.price, time = _ctx$request$body2.time, enabled = _ctx$request$body2.enabled;
              sql = ['update vip set price=?, time=?, enabled=? where id=?'];
              arg = [price, time, enabled, id];
              _context3.next = 5;
              return mysql.query(MYSQL.STOCK, sql, arg);

            case 5:
              result = _context3.sent;

              ctx.body = sheet[0];

            case 7:
            case 'end':
              return _context3.stop();
          }
        }
      }, _callee3, undefined);
    }));

    return function vipUprow(_x5, _x6) {
      return _ref3.apply(this, arguments);
    };
  }()
};

exports.delete = {
  '/vip/remove/:id': function () {
    var _ref4 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee4(ctx, next) {
      var sql, arg, result;
      return _regenerator2.default.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              sql = ['delete from vip where id=?'];
              arg = [ctx.params.id];
              _context4.next = 4;
              return mysql.query(MYSQL.STOCK, sql, arg);

            case 4:
              result = _context4.sent;

              ctx.body = sheet[0];

            case 6:
            case 'end':
              return _context4.stop();
          }
        }
      }, _callee4, undefined);
    }));

    return function vipRemoveId(_x7, _x8) {
      return _ref4.apply(this, arguments);
    };
  }()
};