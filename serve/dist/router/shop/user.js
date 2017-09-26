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
  '/user/list': function () {
    var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(ctx, next) {
      var arg, where, limit, sql, data;
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              arg = [];
              where = '';
              limit = ' limit 0,20';

              if (ctx.query.id > 0) {
                where = where == '' ? ' where id = ?' : where + ' and id = ?';
                arg.push(ctx.query.id);
              }
              if (ctx.query.nick) {
                where = where == '' ? ' where nick like "%' + ctx.query.nick + '%"' : where + ' and nick like "%' + ctx.query.nick + '%"';
              }
              if (ctx.query.page > 0) {
                limit = ' limit ' + (ctx.query.page - 1) * 20 + ',20';
              }
              sql = ['select * from user' + where + ' order by id desc' + limit];
              _context.next = 9;
              return mysql.query(MYSQL.USER, sql, arg);

            case 9:
              data = _context.sent;

              sheet[0].data = data[0];
              ctx.body = sheet[0];

            case 12:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, undefined);
    }));

    return function userList(_x, _x2) {
      return _ref.apply(this, arguments);
    };
  }(),

  '/user/detail/:id': function () {
    var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(ctx, next) {
      var sql, arg, data;
      return _regenerator2.default.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              sql = ['select * from user where id=?'];
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

    return function userDetailId(_x3, _x4) {
      return _ref2.apply(this, arguments);
    };
  }()
};

exports.post = {};

exports.put = {
  '/user/changecash': function () {
    var _ref3 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3(ctx, next) {
      var _ctx$request$body, id, cash, type, user_data;

      return _regenerator2.default.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _ctx$request$body = ctx.request.body, id = _ctx$request$body.id, cash = _ctx$request$body.cash, type = _ctx$request$body.type;
              _context3.next = 3;
              return mysql.query(MYSQL.USER, ['select * from user where id=?'], [id]);

            case 3:
              user_data = _context3.sent;

              if (!(user_data[0].length == 0)) {
                _context3.next = 8;
                break;
              }

              sheet[20003].message = '操作失败:该用户不存在';
              ctx.body = sheet[20003];
              return _context3.abrupt('return');

            case 8:
              if (!(type == 'add')) {
                _context3.next = 11;
                break;
              }

              _context3.next = 11;
              return mysql.query(MYSQL.USER, ['update user set cash=cash+? where id=?'], [cash, id]);

            case 11:
              if (!(type == 'sub')) {
                _context3.next = 18;
                break;
              }

              if (!(cash > user_data[0][0].cash)) {
                _context3.next = 16;
                break;
              }

              sheet[20004].message = '操作失败:扣款金额超过用户当前余额';
              ctx.body = sheet[20004];
              return _context3.abrupt('return');

            case 16:
              _context3.next = 18;
              return mysql.query(MYSQL.USER, ['update user set cash=cash-? where id=?'], [cash, id]);

            case 18:
              ctx.body = sheet[0];

            case 19:
            case 'end':
              return _context3.stop();
          }
        }
      }, _callee3, undefined);
    }));

    return function userChangecash(_x5, _x6) {
      return _ref3.apply(this, arguments);
    };
  }()
};

exports.delete = {};