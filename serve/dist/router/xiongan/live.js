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
  '/live/list/manager': function () {
    var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(ctx, next) {
      var arg, where, limit, data;
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
              if (ctx.query.page > 0) {
                limit = ' limit ' + (ctx.query.page - 1) * 10 + ',10';
              }
              _context.next = 7;
              return mysql.query(MYSQL.XIONGAN, ['select * from live' + where + ' order by time desc ' + limit], arg);

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

    return function liveListManager(_x, _x2) {
      return _ref.apply(this, arguments);
    };
  }(),

  '/live/detail/manager/:id': function () {
    var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(ctx, next) {
      var id, data;
      return _regenerator2.default.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              id = ctx.params.id;
              _context2.next = 3;
              return mysql.query(MYSQL.XIONGAN, ['select * from live where id = ?'], [id]);

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

    return function liveDetailManagerId(_x3, _x4) {
      return _ref2.apply(this, arguments);
    };
  }()
};

exports.post = {
  '/live/add': function () {
    var _ref3 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3(ctx, next) {
      var _ctx$request$body, name, img, href, time, status, today, data;

      return _regenerator2.default.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _ctx$request$body = ctx.request.body, name = _ctx$request$body.name, img = _ctx$request$body.img, href = _ctx$request$body.href, time = _ctx$request$body.time, status = _ctx$request$body.status;

              time = Date.parse(new Date(time.replace(/\T/g, ' '))).toString().slice(0, 10);
              today = Date.parse(new Date()).toString().slice(0, 10);

              if (time > today) {
                status = 0;
              } else {
                status = 1;
              }
              _context3.next = 6;
              return mysql.query(MYSQL.XIONGAN, ['insert into live (name,img,href,time,status) values(?,?,?,?,?)'], [name, img, href, time, status]);

            case 6:
              data = _context3.sent;

              sheet[0].message = '添加成功';
              ctx.body = sheet[0];

            case 9:
            case 'end':
              return _context3.stop();
          }
        }
      }, _callee3, undefined);
    }));

    return function liveAdd(_x5, _x6) {
      return _ref3.apply(this, arguments);
    };
  }()
};

exports.put = {
  '/live/edit/manager': function () {
    var _ref4 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee4(ctx, next) {
      var _ctx$request$body2, name, img, href, time, status, end_time, id, today, data;

      return _regenerator2.default.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _ctx$request$body2 = ctx.request.body, name = _ctx$request$body2.name, img = _ctx$request$body2.img, href = _ctx$request$body2.href, time = _ctx$request$body2.time, status = _ctx$request$body2.status, end_time = _ctx$request$body2.end_time, id = _ctx$request$body2.id;

              time = Date.parse(new Date(time.replace(/\T/g, ' '))).toString().slice(0, 10);
              today = Date.parse(new Date()).toString().slice(0, 10);

              if (status == true) {
                status = 2;
                end_time = today;
              } else if (status == false && time > today) {
                status = 0;
              } else {
                status = 1;
              }
              _context4.next = 6;
              return mysql.query(MYSQL.XIONGAN, ['update live set name=?, img=?, href=?, time=?, status=?, end_time=? where id=?'], [name, img, href, time, status, end_time, id]);

            case 6:
              data = _context4.sent;

              sheet[0].data = data[0];
              ctx.body = sheet[0];

            case 9:
            case 'end':
              return _context4.stop();
          }
        }
      }, _callee4, undefined);
    }));

    return function liveEditManager(_x7, _x8) {
      return _ref4.apply(this, arguments);
    };
  }(),

  '/live/uprow': function () {
    var _ref5 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee5(ctx, next) {
      var sql, arg, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, item, ishome, id;

      return _regenerator2.default.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              if (!_.isArray(ctx.request.body)) {
                ctx.request.body = [ctx.request.body];
              }
              _context5.next = 3;
              return mysql.query(MYSQL.XIONGAN, ['update live set ishome=0'], [null]);

            case 3:
              sql = [];
              arg = [];
              _iteratorNormalCompletion = true;
              _didIteratorError = false;
              _iteratorError = undefined;
              _context5.prev = 8;

              for (_iterator = (0, _getIterator3.default)(ctx.request.body); !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                item = _step.value;
                ishome = item.ishome, id = item.id;

                if (item.ishome == true) {
                  item.ishome = 1;
                } else {
                  item.ishome = 0;
                }
                sql.push('update live set ishome=? where id=?');
                arg.push([ishome, id]);
              }
              _context5.next = 16;
              break;

            case 12:
              _context5.prev = 12;
              _context5.t0 = _context5['catch'](8);
              _didIteratorError = true;
              _iteratorError = _context5.t0;

            case 16:
              _context5.prev = 16;
              _context5.prev = 17;

              if (!_iteratorNormalCompletion && _iterator.return) {
                _iterator.return();
              }

            case 19:
              _context5.prev = 19;

              if (!_didIteratorError) {
                _context5.next = 22;
                break;
              }

              throw _iteratorError;

            case 22:
              return _context5.finish(19);

            case 23:
              return _context5.finish(16);

            case 24:
              _context5.next = 26;
              return mysql.query(MYSQL.XIONGAN, sql, arg);

            case 26:
              sheet[0].message = '更新成功!';
              ctx.body = sheet[0];

            case 28:
            case 'end':
              return _context5.stop();
          }
        }
      }, _callee5, undefined, [[8, 12, 16, 24], [17,, 19, 23]]);
    }));

    return function liveUprow(_x9, _x10) {
      return _ref5.apply(this, arguments);
    };
  }()
};

exports.delete = {
  '/live/delete/manager/:ids': function () {
    var _ref6 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee6(ctx, next) {
      var ids, sql, arg;
      return _regenerator2.default.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              ids = ctx.params.ids;

              ids = ids.replace(/[|]/g, ',');
              sql = ['delete from live where id in (' + ids + ')'];
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

    return function liveDeleteManagerIds(_x11, _x12) {
      return _ref6.apply(this, arguments);
    };
  }()
};