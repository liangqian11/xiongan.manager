'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _ = require('lodash');

var _require = require('../../config'),
    MYSQL = _require.MYSQL;

var mysql = require('../../plugin/util/mysql');
var sheet = require('../../plugin/util/sheet');
var log = require('../../plugin/util/log');

exports.get = {
  '/feedback/list': function () {
    var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(ctx, next) {
      var sql, arg, data;
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              sql = ['select * from feedback where platform=? order by id desc'];
              arg = ['shop'];
              _context.next = 4;
              return mysql.query(MYSQL.USER, sql, arg);

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

    return function feedbackList(_x, _x2) {
      return _ref.apply(this, arguments);
    };
  }(),

  '/feedback/detail/:id': function () {
    var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(ctx, next) {
      var sql, arg, data;
      return _regenerator2.default.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              sql = ['select * from feedback where id=?'];
              arg = [ctx.params.id];
              _context2.next = 4;
              return mysql.query(MYSQL.USER, sql, arg);

            case 4:
              data = _context2.sent;

              sheet[0].data = data[0][0];
              ctx.body = sheet[0];

            case 7:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, undefined);
    }));

    return function feedbackDetailId(_x3, _x4) {
      return _ref2.apply(this, arguments);
    };
  }()
};

exports.post = {};

exports.put = {};

exports.delete = {};