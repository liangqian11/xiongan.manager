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
  '/help/list': function () {
    var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(ctx, next) {
      var arg, where, limit, sql, data;
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              arg = [];
              where = '';
              limit = ' limit 0,15';

              if (ctx.query.cid > 0) {
                where = where == '' ? ' where cid = ?' : where + ' and cid = ?';
                arg.push(ctx.query.cid);
              }
              if (ctx.query.name) {
                where = where == '' ? ' where name like "%' + ctx.query.name + '%"' : where + ' and name like "%' + ctx.query.name + '%"';
              }
              if (ctx.query.page > 0) {
                limit = ' limit ' + (ctx.query.page - 1) * 15 + ',15';
              }
              sql = ['select * from help' + where + ' order by sort ' + limit];
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

    return function helpList(_x, _x2) {
      return _ref.apply(this, arguments);
    };
  }(),

  '/help/detail/:id': function () {
    var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(ctx, next) {
      var sql, arg, data;
      return _regenerator2.default.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              sql = ['select * from help where id=?'];
              arg = [ctx.params.id];
              _context2.next = 4;
              return mysql.query(MYSQL.SHOP, sql, arg);

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

    return function helpDetailId(_x3, _x4) {
      return _ref2.apply(this, arguments);
    };
  }(),

  '/help/cat/list': function () {
    var _ref3 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3(ctx, next) {
      var sql, arg, data;
      return _regenerator2.default.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              sql = ['select * from help_cat order by sort '];
              arg = null;
              _context3.next = 4;
              return mysql.query(MYSQL.SHOP, sql, arg);

            case 4:
              data = _context3.sent;

              sheet[0].data = data[0];
              ctx.body = sheet[0];

            case 7:
            case 'end':
              return _context3.stop();
          }
        }
      }, _callee3, undefined);
    }));

    return function helpCatList(_x5, _x6) {
      return _ref3.apply(this, arguments);
    };
  }(),

  '/help/cat/detail/:id': function () {
    var _ref4 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee4(ctx, next) {
      var sql, arg, data;
      return _regenerator2.default.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              sql = ['select * from help_cat where id=?'];
              arg = [ctx.params.id];
              _context4.next = 4;
              return mysql.query(MYSQL.SHOP, sql, arg);

            case 4:
              data = _context4.sent;

              sheet[0].data = data[0][0];
              ctx.body = sheet[0];

            case 7:
            case 'end':
              return _context4.stop();
          }
        }
      }, _callee4, undefined);
    }));

    return function helpCatDetailId(_x7, _x8) {
      return _ref4.apply(this, arguments);
    };
  }()
};

exports.post = {
  '/help/add': function () {
    var _ref5 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee5(ctx, next) {
      var _ctx$request$body, cid, name, content, sort, sql, arg;

      return _regenerator2.default.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              _ctx$request$body = ctx.request.body, cid = _ctx$request$body.cid, name = _ctx$request$body.name, content = _ctx$request$body.content, sort = _ctx$request$body.sort;
              sql = ['insert into help (cid, name, content, sort) values(?, ?, ?, ?)'];
              arg = [cid, name, content, sort];
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

    return function helpAdd(_x9, _x10) {
      return _ref5.apply(this, arguments);
    };
  }(),

  '/help/cat/add': function () {
    var _ref6 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee6(ctx, next) {
      var _ctx$request$body2, name, img, sort, sql, arg;

      return _regenerator2.default.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              _ctx$request$body2 = ctx.request.body, name = _ctx$request$body2.name, img = _ctx$request$body2.img, sort = _ctx$request$body2.sort;
              sql = ['insert into help_cat (name, img, sort) values(?, ?, ?)'];
              arg = [name, img, sort];
              _context6.next = 5;
              return mysql.query(MYSQL.SHOP, sql, arg);

            case 5:
              ctx.body = sheet[0];

            case 6:
            case 'end':
              return _context6.stop();
          }
        }
      }, _callee6, undefined);
    }));

    return function helpCatAdd(_x11, _x12) {
      return _ref6.apply(this, arguments);
    };
  }()
};

exports.put = {
  '/help/uprow': function () {
    var _ref7 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee7(ctx, next) {
      var sql, arg, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, item, id, name, sort;

      return _regenerator2.default.wrap(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              if (!_.isArray(ctx.request.body)) {
                ctx.request.body = [ctx.request.body];
              }
              sql = [];
              arg = [];
              _iteratorNormalCompletion = true;
              _didIteratorError = false;
              _iteratorError = undefined;
              _context7.prev = 6;

              for (_iterator = (0, _getIterator3.default)(ctx.request.body); !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                item = _step.value;
                id = item.id, name = item.name, sort = item.sort;

                sql.push('update help set name=?, sort=? where id=?');
                arg.push([name, sort, id]);
              }
              _context7.next = 14;
              break;

            case 10:
              _context7.prev = 10;
              _context7.t0 = _context7['catch'](6);
              _didIteratorError = true;
              _iteratorError = _context7.t0;

            case 14:
              _context7.prev = 14;
              _context7.prev = 15;

              if (!_iteratorNormalCompletion && _iterator.return) {
                _iterator.return();
              }

            case 17:
              _context7.prev = 17;

              if (!_didIteratorError) {
                _context7.next = 20;
                break;
              }

              throw _iteratorError;

            case 20:
              return _context7.finish(17);

            case 21:
              return _context7.finish(14);

            case 22:
              _context7.next = 24;
              return mysql.query(MYSQL.SHOP, sql, arg);

            case 24:
              ctx.body = sheet[0];

            case 25:
            case 'end':
              return _context7.stop();
          }
        }
      }, _callee7, undefined, [[6, 10, 14, 22], [15,, 17, 21]]);
    }));

    return function helpUprow(_x13, _x14) {
      return _ref7.apply(this, arguments);
    };
  }(),

  '/help/update': function () {
    var _ref8 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee8(ctx, next) {
      var _ctx$request$body3, id, cid, name, sort, content, sql, arg;

      return _regenerator2.default.wrap(function _callee8$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              _ctx$request$body3 = ctx.request.body, id = _ctx$request$body3.id, cid = _ctx$request$body3.cid, name = _ctx$request$body3.name, sort = _ctx$request$body3.sort, content = _ctx$request$body3.content;
              sql = ['update help set name=?, cid=?, sort=?, content=? where id=?'];
              arg = [name, cid, sort, content, id];
              _context8.next = 5;
              return mysql.query(MYSQL.SHOP, sql, arg);

            case 5:
              ctx.body = sheet[0];

            case 6:
            case 'end':
              return _context8.stop();
          }
        }
      }, _callee8, undefined);
    }));

    return function helpUpdate(_x15, _x16) {
      return _ref8.apply(this, arguments);
    };
  }(),

  '/help/cat/uprow': function () {
    var _ref9 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee9(ctx, next) {
      var sql, arg, _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, item, id, name, sort;

      return _regenerator2.default.wrap(function _callee9$(_context9) {
        while (1) {
          switch (_context9.prev = _context9.next) {
            case 0:
              if (!_.isArray(ctx.request.body)) {
                ctx.request.body = [ctx.request.body];
              }
              sql = [];
              arg = [];
              _iteratorNormalCompletion2 = true;
              _didIteratorError2 = false;
              _iteratorError2 = undefined;
              _context9.prev = 6;

              for (_iterator2 = (0, _getIterator3.default)(ctx.request.body); !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                item = _step2.value;
                id = item.id, name = item.name, sort = item.sort;

                sql.push('update help_cat set name=?, sort=? where id=?');
                arg.push([name, sort, id]);
              }
              _context9.next = 14;
              break;

            case 10:
              _context9.prev = 10;
              _context9.t0 = _context9['catch'](6);
              _didIteratorError2 = true;
              _iteratorError2 = _context9.t0;

            case 14:
              _context9.prev = 14;
              _context9.prev = 15;

              if (!_iteratorNormalCompletion2 && _iterator2.return) {
                _iterator2.return();
              }

            case 17:
              _context9.prev = 17;

              if (!_didIteratorError2) {
                _context9.next = 20;
                break;
              }

              throw _iteratorError2;

            case 20:
              return _context9.finish(17);

            case 21:
              return _context9.finish(14);

            case 22:
              _context9.next = 24;
              return mysql.query(MYSQL.SHOP, sql, arg);

            case 24:
              ctx.body = sheet[0];

            case 25:
            case 'end':
              return _context9.stop();
          }
        }
      }, _callee9, undefined, [[6, 10, 14, 22], [15,, 17, 21]]);
    }));

    return function helpCatUprow(_x17, _x18) {
      return _ref9.apply(this, arguments);
    };
  }(),

  '/help/cat/update': function () {
    var _ref10 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee10(ctx, next) {
      var _ctx$request$body4, id, name, img, sort, sql, arg;

      return _regenerator2.default.wrap(function _callee10$(_context10) {
        while (1) {
          switch (_context10.prev = _context10.next) {
            case 0:
              _ctx$request$body4 = ctx.request.body, id = _ctx$request$body4.id, name = _ctx$request$body4.name, img = _ctx$request$body4.img, sort = _ctx$request$body4.sort;
              sql = ['update help_cat set name=?, img=?, sort=? where id=?'];
              arg = [name, img, sort, id];
              _context10.next = 5;
              return mysql.query(MYSQL.SHOP, sql, arg);

            case 5:
              ctx.body = sheet[0];

            case 6:
            case 'end':
              return _context10.stop();
          }
        }
      }, _callee10, undefined);
    }));

    return function helpCatUpdate(_x19, _x20) {
      return _ref10.apply(this, arguments);
    };
  }()
};

exports.delete = {
  '/help/remove/:ids': function () {
    var _ref11 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee11(ctx, next) {
      var ids, sql, arg;
      return _regenerator2.default.wrap(function _callee11$(_context11) {
        while (1) {
          switch (_context11.prev = _context11.next) {
            case 0:
              ids = ctx.params.ids;

              ids = ids.replace(/[|]/g, ',');
              sql = ['delete from help where id in (' + ids + ')'];
              arg = null;
              _context11.next = 6;
              return mysql.query(MYSQL.SHOP, sql, arg);

            case 6:
              ctx.body = sheet[0];

            case 7:
            case 'end':
              return _context11.stop();
          }
        }
      }, _callee11, undefined);
    }));

    return function helpRemoveIds(_x21, _x22) {
      return _ref11.apply(this, arguments);
    };
  }(),

  '/help/cat/remove/:ids': function () {
    var _ref12 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee12(ctx, next) {
      var ids, data, sql, arg;
      return _regenerator2.default.wrap(function _callee12$(_context12) {
        while (1) {
          switch (_context12.prev = _context12.next) {
            case 0:
              ids = ctx.params.ids;

              ids = ids.replace(/[|]/g, ',');
              _context12.next = 4;
              return mysql.query(MYSQL.SHOP, ['select * from help where cid in (' + ids + ')'], null);

            case 4:
              data = _context12.sent;

              if (!(data[0].length > 0)) {
                _context12.next = 9;
                break;
              }

              sheet[20001].message = '该类别下存在条目, 不能删除';
              ctx.body = sheet[20001];
              return _context12.abrupt('return');

            case 9:
              sql = ['delete from help_cat where id in (' + ids + ')'];
              arg = null;
              _context12.next = 13;
              return mysql.query(MYSQL.SHOP, sql, arg);

            case 13:
              ctx.body = sheet[0];

            case 14:
            case 'end':
              return _context12.stop();
          }
        }
      }, _callee12, undefined);
    }));

    return function helpCatRemoveIds(_x23, _x24) {
      return _ref12.apply(this, arguments);
    };
  }()
};