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
var log = require('../../plugin/util/log');

exports.get = {
  '/express/list': function () {
    var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(ctx, next) {
      var arg, where, limit, sql, data;
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              arg = [];
              where = '';
              limit = ' limit 0,15';

              if (ctx.query.name) {
                where = where == '' ? ' where name like "%' + ctx.query.name + '%"' : where + ' and name like "%' + ctx.query.name + '%"';
              }
              if (ctx.query.mobile) {
                where = where == '' ? ' where mobile like "%' + ctx.query.mobile + '%"' : where + ' and mobile like "%' + ctx.query.mobile + '%"';
              }
              if (ctx.query.page > 0) {
                limit = ' limit ' + (ctx.query.page - 1) * 15 + ',15';
              }
              sql = ['select * from express' + where + ' order by id desc ' + limit];
              _context.next = 9;
              return mysql.query(MYSQL.SHOP, sql, arg);

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

    return function expressList(_x, _x2) {
      return _ref.apply(this, arguments);
    };
  }(),

  '/express/area/:aid': function () {
    var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(ctx, next) {
      var aid, data;
      return _regenerator2.default.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              aid = ctx.params.aid;
              _context2.next = 3;
              return mysql.query(MYSQL.SHOP, ['select * from express where aid=?'], [aid]);

            case 3:
              data = _context2.sent;

              sheet[0].data = data[0];
              ctx.body = sheet[0];

            case 6:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, undefined);
    }));

    return function expressAreaAid(_x3, _x4) {
      return _ref2.apply(this, arguments);
    };
  }()
};

exports.post = {
  '/express/add': function () {
    var _ref3 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3(ctx, next) {
      var _ctx$request$body, aid, name, mobile, sql, arg;

      return _regenerator2.default.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _ctx$request$body = ctx.request.body, aid = _ctx$request$body.aid, name = _ctx$request$body.name, mobile = _ctx$request$body.mobile;
              sql = ['insert into express (aid, name, mobile) values(?, ?, ?)'];
              arg = [aid, name, mobile];
              _context3.next = 5;
              return mysql.query(MYSQL.SHOP, sql, arg);

            case 5:
              ctx.body = sheet[0];

            case 6:
            case 'end':
              return _context3.stop();
          }
        }
      }, _callee3, undefined);
    }));

    return function expressAdd(_x5, _x6) {
      return _ref3.apply(this, arguments);
    };
  }()
};

exports.put = {
  '/express/uprow': function () {
    var _ref4 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee4(ctx, next) {
      var sql, arg, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, item, id, name, mobile;

      return _regenerator2.default.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              if (!_.isArray(ctx.request.body)) {
                ctx.request.body = [ctx.request.body];
              }
              sql = [];
              arg = [];
              _iteratorNormalCompletion = true;
              _didIteratorError = false;
              _iteratorError = undefined;
              _context4.prev = 6;

              for (_iterator = (0, _getIterator3.default)(ctx.request.body); !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                item = _step.value;
                id = item.id, name = item.name, mobile = item.mobile;

                sql.push('update express set name=?, mobile=? where id=?');
                arg.push([name, mobile, id]);
              }
              _context4.next = 14;
              break;

            case 10:
              _context4.prev = 10;
              _context4.t0 = _context4['catch'](6);
              _didIteratorError = true;
              _iteratorError = _context4.t0;

            case 14:
              _context4.prev = 14;
              _context4.prev = 15;

              if (!_iteratorNormalCompletion && _iterator.return) {
                _iterator.return();
              }

            case 17:
              _context4.prev = 17;

              if (!_didIteratorError) {
                _context4.next = 20;
                break;
              }

              throw _iteratorError;

            case 20:
              return _context4.finish(17);

            case 21:
              return _context4.finish(14);

            case 22:
              _context4.next = 24;
              return mysql.query(MYSQL.SHOP, sql, arg);

            case 24:
              ctx.body = sheet[0];

            case 25:
            case 'end':
              return _context4.stop();
          }
        }
      }, _callee4, undefined, [[6, 10, 14, 22], [15,, 17, 21]]);
    }));

    return function expressUprow(_x7, _x8) {
      return _ref4.apply(this, arguments);
    };
  }(),

  '/express/update': function () {
    var _ref5 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee5(ctx, next) {
      var _ctx$request$body2, id, aid, name, mobile, sql, arg;

      return _regenerator2.default.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              _ctx$request$body2 = ctx.request.body, id = _ctx$request$body2.id, aid = _ctx$request$body2.aid, name = _ctx$request$body2.name, mobile = _ctx$request$body2.mobile;
              sql = ['update express set aid=?, name=?, mobile=? where id=?'];
              arg = [aid, name, mobile, id];
              _context5.next = 5;
              return mysql.query(MYSQL.SHOP, sql, arg);

            case 5:
              ctx.body = sheet[0];

            case 6:
            case 'end':
              return _context5.stop();
          }
        }
      }, _callee5, undefined);
    }));

    return function expressUpdate(_x9, _x10) {
      return _ref5.apply(this, arguments);
    };
  }()
};

exports.delete = {
  '/express/remove/:ids': function () {
    var _ref6 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee6(ctx, next) {
      var ids, sql, arg;
      return _regenerator2.default.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              ids = ctx.params.ids;

              ids = ids.replace(/[|]/g, ',');
              sql = ['delete from express where id in (' + ids + ')'];
              arg = null;
              _context6.next = 6;
              return mysql.query(MYSQL.SHOP, sql, arg);

            case 6:
              ctx.body = sheet[0];

            case 7:
            case 'end':
              return _context6.stop();
          }
        }
      }, _callee6, undefined);
    }));

    return function expressRemoveIds(_x11, _x12) {
      return _ref6.apply(this, arguments);
    };
  }()
};