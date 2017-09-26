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
  '/area/all': function () {
    var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(ctx, next) {
      var data;
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return mysql.query(MYSQL.SHOP, ['select * from area order by sort'], null);

            case 2:
              data = _context.sent;

              sheet[0].data = data[0];
              ctx.body = sheet[0];

            case 5:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, undefined);
    }));

    return function areaAll(_x, _x2) {
      return _ref.apply(this, arguments);
    };
  }(),

  '/area/detail/:id': function () {
    var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(ctx, next) {
      var data;
      return _regenerator2.default.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return mysql.query(MYSQL.SHOP, ['select * from area where id=?'], [ctx.params.id]);

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

    return function areaDetailId(_x3, _x4) {
      return _ref2.apply(this, arguments);
    };
  }(),

  '/area/coordinate/list/:aid': function () {
    var _ref3 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3(ctx, next) {
      var data;
      return _regenerator2.default.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.next = 2;
              return mysql.query(MYSQL.SHOP, ['select * from coordinate_area where aid=? order by sort'], [ctx.params.aid]);

            case 2:
              data = _context3.sent;

              sheet[0].data = data[0];
              ctx.body = sheet[0];

            case 5:
            case 'end':
              return _context3.stop();
          }
        }
      }, _callee3, undefined);
    }));

    return function areaCoordinateListAid(_x5, _x6) {
      return _ref3.apply(this, arguments);
    };
  }()
};

exports.post = {
  '/area/add': function () {
    var _ref4 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee4(ctx, next) {
      var _ctx$request$body, ctid, name, img, manager, mobile, supermarket, contact, address, x, y, xmin, xmax, ymin, ymax, banknumber, bankname, sort, sql, arg;

      return _regenerator2.default.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _ctx$request$body = ctx.request.body, ctid = _ctx$request$body.ctid, name = _ctx$request$body.name, img = _ctx$request$body.img, manager = _ctx$request$body.manager, mobile = _ctx$request$body.mobile, supermarket = _ctx$request$body.supermarket, contact = _ctx$request$body.contact, address = _ctx$request$body.address, x = _ctx$request$body.x, y = _ctx$request$body.y, xmin = _ctx$request$body.xmin, xmax = _ctx$request$body.xmax, ymin = _ctx$request$body.ymin, ymax = _ctx$request$body.ymax, banknumber = _ctx$request$body.banknumber, bankname = _ctx$request$body.bankname, sort = _ctx$request$body.sort;
              sql = ['insert into area (ctid, name, img, manager, mobile, supermarket, contact, address, x, y, xmin, xmax, ymin, ymax, banknumber, bankname, sort) values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)'];
              arg = [ctid, name, img, manager, mobile, supermarket, contact, address, x, y, xmin, xmax, ymin, ymax, banknumber, bankname, sort];
              _context4.next = 5;
              return mysql.query(MYSQL.SHOP, sql, arg);

            case 5:
              ctx.body = sheet[0];

            case 6:
            case 'end':
              return _context4.stop();
          }
        }
      }, _callee4, undefined);
    }));

    return function areaAdd(_x7, _x8) {
      return _ref4.apply(this, arguments);
    };
  }(),

  '/area/coordinate/add': function () {
    var _ref5 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee5(ctx, next) {
      var _ctx$request$body2, aid, x, y, sort, sql, arg, result, coordinate_data, xs, ys, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, v;

      return _regenerator2.default.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              _ctx$request$body2 = ctx.request.body, aid = _ctx$request$body2.aid, x = _ctx$request$body2.x, y = _ctx$request$body2.y, sort = _ctx$request$body2.sort;
              sql = ['insert into coordinate_area (aid, x, y, sort) values(?, ?, ?, ?)'];
              arg = [aid, x, y, sort];
              _context5.next = 5;
              return mysql.query(MYSQL.SHOP, sql, arg);

            case 5:
              result = _context5.sent;
              _context5.next = 8;
              return mysql.query(MYSQL.SHOP, ['select * from coordinate_area where aid=?'], [aid]);

            case 8:
              coordinate_data = _context5.sent;
              xs = [];
              ys = [];
              _iteratorNormalCompletion = true;
              _didIteratorError = false;
              _iteratorError = undefined;
              _context5.prev = 14;

              for (_iterator = (0, _getIterator3.default)(coordinate_data[0]); !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                v = _step.value;

                xs.push(v.x);
                ys.push(v.y);
              }
              _context5.next = 22;
              break;

            case 18:
              _context5.prev = 18;
              _context5.t0 = _context5['catch'](14);
              _didIteratorError = true;
              _iteratorError = _context5.t0;

            case 22:
              _context5.prev = 22;
              _context5.prev = 23;

              if (!_iteratorNormalCompletion && _iterator.return) {
                _iterator.return();
              }

            case 25:
              _context5.prev = 25;

              if (!_didIteratorError) {
                _context5.next = 28;
                break;
              }

              throw _iteratorError;

            case 28:
              return _context5.finish(25);

            case 29:
              return _context5.finish(22);

            case 30:
              _context5.next = 32;
              return mysql.query(MYSQL.SHOP, ['update area set xmin=?, xmax=?, ymin=?, ymax=? where id=?'], [_.min(xs), _.max(xs), _.min(ys), _.max(ys), aid]);

            case 32:
              ctx.body = sheet[0];

            case 33:
            case 'end':
              return _context5.stop();
          }
        }
      }, _callee5, undefined, [[14, 18, 22, 30], [23,, 25, 29]]);
    }));

    return function areaCoordinateAdd(_x9, _x10) {
      return _ref5.apply(this, arguments);
    };
  }()
};

exports.put = {
  '/area/uprow': function () {
    var _ref6 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee6(ctx, next) {
      var sql, arg, _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, item, id, name, manager, mobile;

      return _regenerator2.default.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              if (!_.isArray(ctx.request.body)) {
                ctx.request.body = [ctx.request.body];
              }
              sql = [];
              arg = [];
              _iteratorNormalCompletion2 = true;
              _didIteratorError2 = false;
              _iteratorError2 = undefined;
              _context6.prev = 6;

              for (_iterator2 = (0, _getIterator3.default)(ctx.request.body); !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                item = _step2.value;
                id = item.id, name = item.name, manager = item.manager, mobile = item.mobile;

                sql.push('update area set name=?, manager=?, mobile=? where id=?');
                arg.push([name, manager, mobile, id]);
              }
              _context6.next = 14;
              break;

            case 10:
              _context6.prev = 10;
              _context6.t0 = _context6['catch'](6);
              _didIteratorError2 = true;
              _iteratorError2 = _context6.t0;

            case 14:
              _context6.prev = 14;
              _context6.prev = 15;

              if (!_iteratorNormalCompletion2 && _iterator2.return) {
                _iterator2.return();
              }

            case 17:
              _context6.prev = 17;

              if (!_didIteratorError2) {
                _context6.next = 20;
                break;
              }

              throw _iteratorError2;

            case 20:
              return _context6.finish(17);

            case 21:
              return _context6.finish(14);

            case 22:
              _context6.next = 24;
              return mysql.query(MYSQL.SHOP, sql, arg);

            case 24:
              ctx.body = sheet[0];

            case 25:
            case 'end':
              return _context6.stop();
          }
        }
      }, _callee6, undefined, [[6, 10, 14, 22], [15,, 17, 21]]);
    }));

    return function areaUprow(_x11, _x12) {
      return _ref6.apply(this, arguments);
    };
  }(),

  '/area/coordinate/uprow': function () {
    var _ref7 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee7(ctx, next) {
      var sql, arg, _iteratorNormalCompletion3, _didIteratorError3, _iteratorError3, _iterator3, _step3, item, id, x, y, sort;

      return _regenerator2.default.wrap(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              if (!_.isArray(ctx.request.body)) {
                ctx.request.body = [ctx.request.body];
              }
              sql = [];
              arg = [];
              _iteratorNormalCompletion3 = true;
              _didIteratorError3 = false;
              _iteratorError3 = undefined;
              _context7.prev = 6;

              for (_iterator3 = (0, _getIterator3.default)(ctx.request.body); !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                item = _step3.value;
                id = item.id, x = item.x, y = item.y, sort = item.sort;

                sql.push('update coordinate_area set x=?, y=?, sort=? where id=?');
                arg.push([x, y, sort, id]);
              }
              _context7.next = 14;
              break;

            case 10:
              _context7.prev = 10;
              _context7.t0 = _context7['catch'](6);
              _didIteratorError3 = true;
              _iteratorError3 = _context7.t0;

            case 14:
              _context7.prev = 14;
              _context7.prev = 15;

              if (!_iteratorNormalCompletion3 && _iterator3.return) {
                _iterator3.return();
              }

            case 17:
              _context7.prev = 17;

              if (!_didIteratorError3) {
                _context7.next = 20;
                break;
              }

              throw _iteratorError3;

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

    return function areaCoordinateUprow(_x13, _x14) {
      return _ref7.apply(this, arguments);
    };
  }()
};

exports.delete = {
  '/area/remove/:ids': function () {
    var _ref8 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee8(ctx, next) {
      var ids, data, sql, arg;
      return _regenerator2.default.wrap(function _callee8$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              ids = ctx.params.ids;

              ids = ids.replace(/[|]/g, ',');
              _context8.next = 4;
              return mysql.query(MYSQL.SHOP, ['select * from trade where aid in (' + ids + ')'], null);

            case 4:
              data = _context8.sent;

              if (!(data[0].length > 0)) {
                _context8.next = 9;
                break;
              }

              sheet[20001].message = '区域下存在店铺, 不能删除';
              ctx.body = sheet[20001];
              return _context8.abrupt('return');

            case 9:
              sql = ['delete from area where id in(' + ids + ')'];
              arg = null;
              _context8.next = 13;
              return mysql.query(MYSQL.SHOP, sql, arg);

            case 13:
              ctx.body = sheet[0];

            case 14:
            case 'end':
              return _context8.stop();
          }
        }
      }, _callee8, undefined);
    }));

    return function areaRemoveIds(_x15, _x16) {
      return _ref8.apply(this, arguments);
    };
  }(),

  '/area/coordinate/remove/:ids': function () {
    var _ref9 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee9(ctx, next) {
      var ids, sql, arg;
      return _regenerator2.default.wrap(function _callee9$(_context9) {
        while (1) {
          switch (_context9.prev = _context9.next) {
            case 0:
              ids = ctx.params.ids;

              ids = ids.replace(/[|]/g, ',');
              sql = ['delete from coordinate_area where id in(' + ids + ')'];
              arg = null;
              _context9.next = 6;
              return mysql.query(MYSQL.SHOP, sql, arg);

            case 6:
              ctx.body = sheet[0];

            case 7:
            case 'end':
              return _context9.stop();
          }
        }
      }, _callee9, undefined);
    }));

    return function areaCoordinateRemoveIds(_x17, _x18) {
      return _ref9.apply(this, arguments);
    };
  }()
};