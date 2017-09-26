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
  '/company/list': function () {
    var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(ctx, next) {
      var arg, where, limit, sql, data;
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              arg = [];
              where = '';
              limit = ' limit 0,16';

              if (ctx.query.page > 0) {
                limit = ' limit ' + (ctx.query.page - 1) * 16 + ',16';
              }
              sql = ['select * from company order by id desc ' + limit];
              _context.next = 7;
              return mysql.query(MYSQL.XIONGAN, sql, arg);

            case 7:
              data = _context.sent;

              sheet[0].data = data[0];
              ctx.body = sheet[0];

            case 10:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, undefined);
    }));

    return function companyList(_x, _x2) {
      return _ref.apply(this, arguments);
    };
  }(),

  '/company/detail/:id': function () {
    var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(ctx, next) {
      var data;
      return _regenerator2.default.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return mysql.query(MYSQL.XIONGAN, ['select * from company where id=?'], [ctx.params.id]);

            case 2:
              data = _context2.sent;

              sheet[0].data = data[0][0];
              ctx.body = sheet[0];

            case 5:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, undefined);
    }));

    return function companyDetailId(_x3, _x4) {
      return _ref2.apply(this, arguments);
    };
  }()
};

exports.post = {
  '/company/add': function () {
    var _ref3 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3(ctx, next) {
      var _ctx$request$body, name, author, img_big, img_small, img_recommend, summary, content, isbanner, istop, time, sql, arg;

      return _regenerator2.default.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _ctx$request$body = ctx.request.body, name = _ctx$request$body.name, author = _ctx$request$body.author, img_big = _ctx$request$body.img_big, img_small = _ctx$request$body.img_small, img_recommend = _ctx$request$body.img_recommend, summary = _ctx$request$body.summary, content = _ctx$request$body.content, isbanner = _ctx$request$body.isbanner, istop = _ctx$request$body.istop;
              time = _.now().toString().substr(0, 10);
              sql = ['insert into company (name, author, time, img_big, img_small, img_recommend, summary, content, isbanner, istop) values(?,?,?,?,?,?,?,?,?,?)'];
              arg = [name, author, time, img_big, img_small, img_recommend, summary, content, isbanner, istop];
              _context3.next = 6;
              return mysql.query(MYSQL.XIONGAN, sql, arg);

            case 6:
              sheet[0].message = '添加成功!';
              ctx.body = sheet[0];

            case 8:
            case 'end':
              return _context3.stop();
          }
        }
      }, _callee3, undefined);
    }));

    return function companyAdd(_x5, _x6) {
      return _ref3.apply(this, arguments);
    };
  }()
};

exports.put = {
  '/company/uprow': function () {
    var _ref4 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee4(ctx, next) {
      var sql, arg, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, item, id, name, author, isbanner, istop;

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
                id = item.id, name = item.name, author = item.author, isbanner = item.isbanner, istop = item.istop;

                sql.push('update company set name=?, author=?, isbanner=?, istop=? where id=?');
                arg.push([name, author, isbanner, istop, id]);
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
              return mysql.query(MYSQL.XIONGAN, sql, arg);

            case 24:
              sheet[0].message = '更新成功!';
              ctx.body = sheet[0];

            case 26:
            case 'end':
              return _context4.stop();
          }
        }
      }, _callee4, undefined, [[6, 10, 14, 22], [15,, 17, 21]]);
    }));

    return function companyUprow(_x7, _x8) {
      return _ref4.apply(this, arguments);
    };
  }(),

  '/company/update': function () {
    var _ref5 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee5(ctx, next) {
      var _ctx$request$body2, id, name, author, img_big, img_small, img_recommend, summary, content, isbanner, istop, sql, arg;

      return _regenerator2.default.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              _ctx$request$body2 = ctx.request.body, id = _ctx$request$body2.id, name = _ctx$request$body2.name, author = _ctx$request$body2.author, img_big = _ctx$request$body2.img_big, img_small = _ctx$request$body2.img_small, img_recommend = _ctx$request$body2.img_recommend, summary = _ctx$request$body2.summary, content = _ctx$request$body2.content, isbanner = _ctx$request$body2.isbanner, istop = _ctx$request$body2.istop;
              sql = ['update company set name=?, author=?, img_big=?, img_small=?, img_recommend=?, summary=?, content=?, isbanner=?, istop=? where id=?'];
              arg = [name, author, img_big, img_small, img_recommend, summary, content, isbanner, istop, id];
              _context5.next = 5;
              return mysql.query(MYSQL.XIONGAN, sql, arg);

            case 5:
              sheet[0].message = '更新成功!';
              ctx.body = sheet[0];

            case 7:
            case 'end':
              return _context5.stop();
          }
        }
      }, _callee5, undefined);
    }));

    return function companyUpdate(_x9, _x10) {
      return _ref5.apply(this, arguments);
    };
  }()
};

exports.delete = {
  '/company/remove/:ids': function () {
    var _ref6 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee6(ctx, next) {
      var ids, sql, arg;
      return _regenerator2.default.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              ids = ctx.params.ids;

              ids = ids.replace(/[|]/g, ',');
              sql = ['delete from company where id in (' + ids + ')'];
              arg = null;
              _context6.next = 6;
              return mysql.query(MYSQL.XIONGAN, sql, arg);

            case 6:
              sheet[0].message = '删除成功!';
              ctx.body = sheet[0];

            case 8:
            case 'end':
              return _context6.stop();
          }
        }
      }, _callee6, undefined);
    }));

    return function companyRemoveIds(_x11, _x12) {
      return _ref6.apply(this, arguments);
    };
  }()
};