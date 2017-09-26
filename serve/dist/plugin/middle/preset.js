'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _ = require('lodash');
var request = require('request');

var mysql = require('../util/mysql');
var sheet = require('../util/sheet');

module.exports = function (pool) {
  var _this = this;

  return function () {
    var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(ctx, next) {
      var sql, arg, manager;
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              ctx.type = 'application/json; charset=utf-8';
              ctx.session.username = ctx.session.username || '';

              if (!(ctx.session.username == '')) {
                _context.next = 6;
                break;
              }

              ctx.manager = null;
              _context.next = 12;
              break;

            case 6:
              sql = ['select * from admin where username=?'];
              arg = [ctx.session.username];
              _context.next = 10;
              return mysql.query(pool.LIMIT, sql, arg);

            case 10:
              manager = _context.sent;

              ctx.manager = manager[0][0] || null;

            case 12:
              _context.next = 14;
              return next();

            case 14:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, _this);
    }));

    return function (_x, _x2) {
      return _ref.apply(this, arguments);
    };
  }();
};