'use strict';

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

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
              limit = ' limit 0,10';

              if (ctx.query.name) {
                where = where == '' ? ' where name like "%' + ctx.query.name + '%"' : where + ' and name like "%' + ctx.query.name + '%"';
              }
              if (ctx.query.page) {
                limit = ' limit ' + (ctx.query.page - 1) * 10 + ',10';
              }
              sql = ['select * from user' + where + ' order by id desc ' + limit];
              _context.next = 8;
              return mysql.query(MYSQL.STOCK, sql, arg);

            case 8:
              data = _context.sent;

              sheet[0].data = data[0];
              ctx.body = sheet[0];

            case 11:
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

  '/user/record/:id': function () {
    var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(ctx, next) {
      var id, sql, arg, data;
      return _regenerator2.default.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              id = ctx.params.id;
              sql = ['select * from deposit where uid=?', 'select * from buy_item where uid=? and pay=1'];
              arg = [[id], [id]];
              _context2.next = 5;
              return mysql.query(MYSQL.STOCK, sql, arg);

            case 5:
              data = _context2.sent;

              sheet[0].data = [data[0], data[1]];
              ctx.body = sheet[0];

            case 8:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, undefined);
    }));

    return function userRecordId(_x3, _x4) {
      return _ref2.apply(this, arguments);
    };
  }()
};

exports.put = {
  '/point/return/:id': function () {
    var _ref3 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3(ctx, next) {
      var id, return_time, mid, isreturn, sql, arg, data, userdata, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, v, pointdata;

      return _regenerator2.default.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              id = ctx.params.id;
              return_time = _.now().toString().substr(0, 10);
              mid = ctx.request.body.mid;
              _context3.next = 5;
              return mysql.query(MYSQL.STOCK, ['select isreturn from article where id=?'], [id]);

            case 5:
              isreturn = _context3.sent;

              if (!(isreturn[0][0].isreturn > 0)) {
                _context3.next = 10;
                break;
              }

              sheet[0].message = '此文章已经返还积分,不能重复操作';
              ctx.body = sheet[0];
              return _context3.abrupt('return');

            case 10:
              sql = ['update user set point=point+20 where id in(select uid from buy_item where aid=?)', 'update article set isreturn=1 where id=?', 'update buy_item set return_time=?, mid=?, point=? where aid=?'];
              arg = [[id], [id], [return_time, mid, 20, id]];
              _context3.next = 14;
              return mysql.query(MYSQL.STOCK, sql, arg);

            case 14:
              data = _context3.sent;
              _context3.next = 17;
              return mysql.query(MYSQL.STOCK, ['select * from buy_item where aid=?'], [id]);

            case 17:
              userdata = _context3.sent;
              _iteratorNormalCompletion = true;
              _didIteratorError = false;
              _iteratorError = undefined;
              _context3.prev = 21;
              _iterator = (0, _getIterator3.default)(userdata[0]);

            case 23:
              if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                _context3.next = 31;
                break;
              }

              v = _step.value;
              _context3.next = 27;
              return mysql.query(MYSQL.STOCK, ['insert into point (aid, uid, point,description,time) values (?,?,?,?,?)'], [id, v.uid, 20, '止损返还积分', return_time]);

            case 27:
              pointdata = _context3.sent;

            case 28:
              _iteratorNormalCompletion = true;
              _context3.next = 23;
              break;

            case 31:
              _context3.next = 37;
              break;

            case 33:
              _context3.prev = 33;
              _context3.t0 = _context3['catch'](21);
              _didIteratorError = true;
              _iteratorError = _context3.t0;

            case 37:
              _context3.prev = 37;
              _context3.prev = 38;

              if (!_iteratorNormalCompletion && _iterator.return) {
                _iterator.return();
              }

            case 40:
              _context3.prev = 40;

              if (!_didIteratorError) {
                _context3.next = 43;
                break;
              }

              throw _iteratorError;

            case 43:
              return _context3.finish(40);

            case 44:
              return _context3.finish(37);

            case 45:
              sheet[0].message = '';
              sheet[0].data = [data[0], data[1][0], data[2]];
              ctx.body = sheet[0];

            case 48:
            case 'end':
              return _context3.stop();
          }
        }
      }, _callee3, undefined, [[21, 33, 37, 45], [38,, 40, 44]]);
    }));

    return function pointReturnId(_x5, _x6) {
      return _ref3.apply(this, arguments);
    };
  }()
};