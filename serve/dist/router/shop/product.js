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
  '/product/list': function () {
    var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(ctx, next) {
      var arg, where, limit, sql, data;
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              arg = [];
              where = '';
              limit = ' limit 0,15';

              if (ctx.query.cbid > 0) {
                where = where == '' ? ' where cbid = ?' : where + ' and cbid = ?';
                arg.push(ctx.query.cbid);
              }
              if (ctx.query.csid > 0) {
                where = where == '' ? ' where csid = ?' : where + ' and csid = ?';
                arg.push(ctx.query.csid);
              }
              if (ctx.query.name) {
                where = where == '' ? ' where name like "%' + ctx.query.name + '%"' : where + ' and name like "%' + ctx.query.name + '%"';
              }
              if (ctx.query.page > 0) {
                limit = ' limit ' + (ctx.query.page - 1) * 15 + ',15';
              }
              sql = ['select * from product' + where + ' order by id desc ' + limit];
              _context.next = 10;
              return mysql.query(MYSQL.SHOP, sql, arg);

            case 10:
              data = _context.sent;

              sheet[0].data = data[0];
              ctx.body = sheet[0];

            case 13:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, undefined);
    }));

    return function productList(_x, _x2) {
      return _ref.apply(this, arguments);
    };
  }(),

  '/product/detail/:id': function () {
    var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(ctx, next) {
      var data;
      return _regenerator2.default.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return mysql.query(MYSQL.SHOP, ['select * from product where id=?'], [ctx.params.id]);

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

    return function productDetailId(_x3, _x4) {
      return _ref2.apply(this, arguments);
    };
  }(),

  '/product/set/list/:pid': function () {
    var _ref3 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3(ctx, next) {
      var sql, arg, data;
      return _regenerator2.default.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              sql = ['select B.name,B.img_small,C.name as area,A.* from product_set A, product B, area C where A.pid=B.id and A.aid=C.id and A.pid=? order by A.sort desc'];
              arg = [ctx.params.pid];
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

    return function productSetListPid(_x5, _x6) {
      return _ref3.apply(this, arguments);
    };
  }(),

  '/stand/list/:pid': function () {
    var _ref4 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee4(ctx, next) {
      var data;
      return _regenerator2.default.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.next = 2;
              return mysql.query(MYSQL.SHOP, ['select * from stand where pid=? order by sort'], [ctx.params.pid]);

            case 2:
              data = _context4.sent;

              sheet[0].data = data[0];
              ctx.body = sheet[0];

            case 5:
            case 'end':
              return _context4.stop();
          }
        }
      }, _callee4, undefined);
    }));

    return function standListPid(_x7, _x8) {
      return _ref4.apply(this, arguments);
    };
  }(),

  '/stand/detail/:id': function () {
    var _ref5 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee5(ctx, next) {
      var data;
      return _regenerator2.default.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              _context5.next = 2;
              return mysql.query(MYSQL.SHOP, ['select * from stand where id=?'], [ctx.params.id]);

            case 2:
              data = _context5.sent;

              sheet[0].data = data[0][0];
              ctx.body = sheet[0];

            case 5:
            case 'end':
              return _context5.stop();
          }
        }
      }, _callee5, undefined);
    }));

    return function standDetailId(_x9, _x10) {
      return _ref5.apply(this, arguments);
    };
  }(),

  '/stand/set/list/:pid/:aid': function () {
    var _ref6 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee6(ctx, next) {
      var sql, arg, data;
      return _regenerator2.default.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              sql = ['select B.name,B.img,A.* from stand_set A,stand B where A.stid=B.id and A.pid=? and A.aid=? order by A.sort'];
              arg = [ctx.params.pid, ctx.params.aid];
              _context6.next = 4;
              return mysql.query(MYSQL.SHOP, sql, arg);

            case 4:
              data = _context6.sent;

              sheet[0].data = data[0];
              ctx.body = sheet[0];

            case 7:
            case 'end':
              return _context6.stop();
          }
        }
      }, _callee6, undefined);
    }));

    return function standSetListPidAid(_x11, _x12) {
      return _ref6.apply(this, arguments);
    };
  }(),

  '/cat/list': function () {
    var _ref7 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee7(ctx, next) {
      var arg, where, sql, data;
      return _regenerator2.default.wrap(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              arg = [];
              where = '';

              if (ctx.query.fid >= 0) {
                arg = [ctx.query.fid];
                where = ' where fid=? ';
              }
              sql = ['select * from cat ' + where + ' order by sort '];
              _context7.next = 6;
              return mysql.query(MYSQL.SHOP, sql, arg);

            case 6:
              data = _context7.sent;

              sheet[0].data = data[0];
              ctx.body = sheet[0];

            case 9:
            case 'end':
              return _context7.stop();
          }
        }
      }, _callee7, undefined);
    }));

    return function catList(_x13, _x14) {
      return _ref7.apply(this, arguments);
    };
  }(),

  '/bigcat/list': function () {
    var _ref8 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee8(ctx, next) {
      var data;
      return _regenerator2.default.wrap(function _callee8$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              _context8.next = 2;
              return mysql.query(MYSQL.SHOP, ['select * from cat where fid=0 order by sort '], null);

            case 2:
              data = _context8.sent;

              sheet[0].data = data[0];
              ctx.body = sheet[0];

            case 5:
            case 'end':
              return _context8.stop();
          }
        }
      }, _callee8, undefined);
    }));

    return function bigcatList(_x15, _x16) {
      return _ref8.apply(this, arguments);
    };
  }(),

  '/smallcat/list/:fid': function () {
    var _ref9 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee9(ctx, next) {
      var data;
      return _regenerator2.default.wrap(function _callee9$(_context9) {
        while (1) {
          switch (_context9.prev = _context9.next) {
            case 0:
              _context9.next = 2;
              return mysql.query(MYSQL.SHOP, ['select * from cat where fid=? order by sort'], [ctx.params.fid]);

            case 2:
              data = _context9.sent;

              sheet[0].data = data[0];
              ctx.body = sheet[0];

            case 5:
            case 'end':
              return _context9.stop();
          }
        }
      }, _callee9, undefined);
    }));

    return function smallcatListFid(_x17, _x18) {
      return _ref9.apply(this, arguments);
    };
  }(),

  '/cat/detail/:id': function () {
    var _ref10 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee10(ctx, next) {
      var data;
      return _regenerator2.default.wrap(function _callee10$(_context10) {
        while (1) {
          switch (_context10.prev = _context10.next) {
            case 0:
              _context10.next = 2;
              return mysql.query(MYSQL.SHOP, ['select * from cat where id=?'], [ctx.params.id]);

            case 2:
              data = _context10.sent;

              sheet[0].data = data[0][0];
              ctx.body = sheet[0];

            case 5:
            case 'end':
              return _context10.stop();
          }
        }
      }, _callee10, undefined);
    }));

    return function catDetailId(_x19, _x20) {
      return _ref10.apply(this, arguments);
    };
  }()
};

exports.post = {
  '/product/add': function () {
    var _ref11 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee11(ctx, next) {
      var _ctx$request$body, name, cbid, csid, img_small, sort, content, sql, arg, product, sql_set, arg_set, areas, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, area;

      return _regenerator2.default.wrap(function _callee11$(_context11) {
        while (1) {
          switch (_context11.prev = _context11.next) {
            case 0:
              _ctx$request$body = ctx.request.body, name = _ctx$request$body.name, cbid = _ctx$request$body.cbid, csid = _ctx$request$body.csid, img_small = _ctx$request$body.img_small, sort = _ctx$request$body.sort, content = _ctx$request$body.content;
              sql = ['insert into product (name, cbid, csid, img_small, sort, content) values(?, ?, ?, ?, ?, ?)'];
              arg = [name, cbid, csid, img_small, sort, content];
              _context11.next = 5;
              return mysql.query(MYSQL.SHOP, sql, arg);

            case 5:
              product = _context11.sent;
              sql_set = [];
              arg_set = [];
              _context11.next = 10;
              return mysql.query(MYSQL.SHOP, ['select * from area order by sort'], null);

            case 10:
              areas = _context11.sent;
              _iteratorNormalCompletion = true;
              _didIteratorError = false;
              _iteratorError = undefined;
              _context11.prev = 14;

              for (_iterator = (0, _getIterator3.default)(areas[0]); !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                area = _step.value;

                sql_set.push('insert into product_set (aid, pid) values (?,?)');
                arg_set.push([area.id, product[0].insertId]);
              }
              _context11.next = 22;
              break;

            case 18:
              _context11.prev = 18;
              _context11.t0 = _context11['catch'](14);
              _didIteratorError = true;
              _iteratorError = _context11.t0;

            case 22:
              _context11.prev = 22;
              _context11.prev = 23;

              if (!_iteratorNormalCompletion && _iterator.return) {
                _iterator.return();
              }

            case 25:
              _context11.prev = 25;

              if (!_didIteratorError) {
                _context11.next = 28;
                break;
              }

              throw _iteratorError;

            case 28:
              return _context11.finish(25);

            case 29:
              return _context11.finish(22);

            case 30:
              _context11.next = 32;
              return mysql.query(MYSQL.SHOP, sql_set, arg_set);

            case 32:
              ctx.body = sheet[0];

            case 33:
            case 'end':
              return _context11.stop();
          }
        }
      }, _callee11, undefined, [[14, 18, 22, 30], [23,, 25, 29]]);
    }));

    return function productAdd(_x21, _x22) {
      return _ref11.apply(this, arguments);
    };
  }(),

  '/stand/add': function () {
    var _ref12 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee12(ctx, next) {
      var _ctx$request$body2, pid, name, img, price, sort, sql, arg, stand, sql_set, arg_set, areas, _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, area;

      return _regenerator2.default.wrap(function _callee12$(_context12) {
        while (1) {
          switch (_context12.prev = _context12.next) {
            case 0:
              _ctx$request$body2 = ctx.request.body, pid = _ctx$request$body2.pid, name = _ctx$request$body2.name, img = _ctx$request$body2.img, price = _ctx$request$body2.price, sort = _ctx$request$body2.sort;
              sql = ['insert into stand (pid, name, img, price, sort) values(?, ?, ?, ?, ?)'];
              arg = [pid, name, img, price, sort];
              _context12.next = 5;
              return mysql.query(MYSQL.SHOP, sql, arg);

            case 5:
              stand = _context12.sent;
              sql_set = [];
              arg_set = [];
              _context12.next = 10;
              return mysql.query(MYSQL.SHOP, ['select * from area order by sort'], null);

            case 10:
              areas = _context12.sent;
              _iteratorNormalCompletion2 = true;
              _didIteratorError2 = false;
              _iteratorError2 = undefined;
              _context12.prev = 14;

              for (_iterator2 = (0, _getIterator3.default)(areas[0]); !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                area = _step2.value;

                sql_set.push('insert into stand_set (aid, pid, stid, price) values (?,?,?,?)');
                arg_set.push([area.id, pid, stand[0].insertId, price]);
              }
              _context12.next = 22;
              break;

            case 18:
              _context12.prev = 18;
              _context12.t0 = _context12['catch'](14);
              _didIteratorError2 = true;
              _iteratorError2 = _context12.t0;

            case 22:
              _context12.prev = 22;
              _context12.prev = 23;

              if (!_iteratorNormalCompletion2 && _iterator2.return) {
                _iterator2.return();
              }

            case 25:
              _context12.prev = 25;

              if (!_didIteratorError2) {
                _context12.next = 28;
                break;
              }

              throw _iteratorError2;

            case 28:
              return _context12.finish(25);

            case 29:
              return _context12.finish(22);

            case 30:
              _context12.next = 32;
              return mysql.query(MYSQL.SHOP, sql_set, arg_set);

            case 32:
              ctx.body = sheet[0];

            case 33:
            case 'end':
              return _context12.stop();
          }
        }
      }, _callee12, undefined, [[14, 18, 22, 30], [23,, 25, 29]]);
    }));

    return function standAdd(_x23, _x24) {
      return _ref12.apply(this, arguments);
    };
  }(),

  '/cat/add': function () {
    var _ref13 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee13(ctx, next) {
      var _ctx$request$body3, fid, name, img, sort, sql, arg, result;

      return _regenerator2.default.wrap(function _callee13$(_context13) {
        while (1) {
          switch (_context13.prev = _context13.next) {
            case 0:
              _ctx$request$body3 = ctx.request.body, fid = _ctx$request$body3.fid, name = _ctx$request$body3.name, img = _ctx$request$body3.img, sort = _ctx$request$body3.sort;
              sql = ['insert into cat (fid, name, img, sort) values(?, ?, ?, ?)'];
              arg = [fid, name, img, sort];
              _context13.next = 5;
              return mysql.query(MYSQL.SHOP, sql, arg);

            case 5:
              result = _context13.sent;

              ctx.body = sheet[0];

            case 7:
            case 'end':
              return _context13.stop();
          }
        }
      }, _callee13, undefined);
    }));

    return function catAdd(_x25, _x26) {
      return _ref13.apply(this, arguments);
    };
  }()
};

exports.put = {
  '/product/uprow': function () {
    var _ref14 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee14(ctx, next) {
      var sql, arg, _iteratorNormalCompletion3, _didIteratorError3, _iteratorError3, _iterator3, _step3, item, id, name, sort;

      return _regenerator2.default.wrap(function _callee14$(_context14) {
        while (1) {
          switch (_context14.prev = _context14.next) {
            case 0:
              if (!_.isArray(ctx.request.body)) {
                ctx.request.body = [ctx.request.body];
              }
              sql = [];
              arg = [];
              _iteratorNormalCompletion3 = true;
              _didIteratorError3 = false;
              _iteratorError3 = undefined;
              _context14.prev = 6;

              for (_iterator3 = (0, _getIterator3.default)(ctx.request.body); !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                item = _step3.value;
                id = item.id, name = item.name, sort = item.sort;

                sql.push('update product set name=?, sort=? where id=?');
                arg.push([name, sort, id]);
              }
              _context14.next = 14;
              break;

            case 10:
              _context14.prev = 10;
              _context14.t0 = _context14['catch'](6);
              _didIteratorError3 = true;
              _iteratorError3 = _context14.t0;

            case 14:
              _context14.prev = 14;
              _context14.prev = 15;

              if (!_iteratorNormalCompletion3 && _iterator3.return) {
                _iterator3.return();
              }

            case 17:
              _context14.prev = 17;

              if (!_didIteratorError3) {
                _context14.next = 20;
                break;
              }

              throw _iteratorError3;

            case 20:
              return _context14.finish(17);

            case 21:
              return _context14.finish(14);

            case 22:
              _context14.next = 24;
              return mysql.query(MYSQL.SHOP, sql, arg);

            case 24:
              ctx.body = sheet[0];

            case 25:
            case 'end':
              return _context14.stop();
          }
        }
      }, _callee14, undefined, [[6, 10, 14, 22], [15,, 17, 21]]);
    }));

    return function productUprow(_x27, _x28) {
      return _ref14.apply(this, arguments);
    };
  }(),

  '/product/update': function () {
    var _ref15 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee15(ctx, next) {
      var _ctx$request$body4, id, name, cbid, csid, img_small, sort, content, sql, arg;

      return _regenerator2.default.wrap(function _callee15$(_context15) {
        while (1) {
          switch (_context15.prev = _context15.next) {
            case 0:
              _ctx$request$body4 = ctx.request.body, id = _ctx$request$body4.id, name = _ctx$request$body4.name, cbid = _ctx$request$body4.cbid, csid = _ctx$request$body4.csid, img_small = _ctx$request$body4.img_small, sort = _ctx$request$body4.sort, content = _ctx$request$body4.content;
              sql = ['update product set name=?, cbid=?, csid=?, img_small=?, sort=?, content=? where id=?'];
              arg = [name, cbid, csid, img_small, sort, content, id];
              _context15.next = 5;
              return mysql.query(MYSQL.SHOP, sql, arg);

            case 5:
              ctx.body = sheet[0];

            case 6:
            case 'end':
              return _context15.stop();
          }
        }
      }, _callee15, undefined);
    }));

    return function productUpdate(_x29, _x30) {
      return _ref15.apply(this, arguments);
    };
  }(),

  '/product/set/uprow': function () {
    var _ref16 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee16(ctx, next) {
      var sql, arg, _iteratorNormalCompletion4, _didIteratorError4, _iteratorError4, _iterator4, _step4, item, id, special, recommend, isnew, top, sort, enabled;

      return _regenerator2.default.wrap(function _callee16$(_context16) {
        while (1) {
          switch (_context16.prev = _context16.next) {
            case 0:
              if (!_.isArray(ctx.request.body)) {
                ctx.request.body = [ctx.request.body];
              }
              sql = [];
              arg = [];
              _iteratorNormalCompletion4 = true;
              _didIteratorError4 = false;
              _iteratorError4 = undefined;
              _context16.prev = 6;

              for (_iterator4 = (0, _getIterator3.default)(ctx.request.body); !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
                item = _step4.value;
                id = item.id, special = item.special, recommend = item.recommend, isnew = item.isnew, top = item.top, sort = item.sort, enabled = item.enabled;

                sql.push('update product_set set special=?, recommend=?, isnew=?, top=?, sort=?, enabled=? where id=?');
                arg.push([special, recommend, isnew, top, sort, enabled, id]);
              }
              _context16.next = 14;
              break;

            case 10:
              _context16.prev = 10;
              _context16.t0 = _context16['catch'](6);
              _didIteratorError4 = true;
              _iteratorError4 = _context16.t0;

            case 14:
              _context16.prev = 14;
              _context16.prev = 15;

              if (!_iteratorNormalCompletion4 && _iterator4.return) {
                _iterator4.return();
              }

            case 17:
              _context16.prev = 17;

              if (!_didIteratorError4) {
                _context16.next = 20;
                break;
              }

              throw _iteratorError4;

            case 20:
              return _context16.finish(17);

            case 21:
              return _context16.finish(14);

            case 22:
              _context16.next = 24;
              return mysql.query(MYSQL.SHOP, sql, arg);

            case 24:
              ctx.body = sheet[0];

            case 25:
            case 'end':
              return _context16.stop();
          }
        }
      }, _callee16, undefined, [[6, 10, 14, 22], [15,, 17, 21]]);
    }));

    return function productSetUprow(_x31, _x32) {
      return _ref16.apply(this, arguments);
    };
  }(),

  '/stand/uprow': function () {
    var _ref17 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee17(ctx, next) {
      var sql, arg, _iteratorNormalCompletion5, _didIteratorError5, _iteratorError5, _iterator5, _step5, item, id, name, price, sort;

      return _regenerator2.default.wrap(function _callee17$(_context17) {
        while (1) {
          switch (_context17.prev = _context17.next) {
            case 0:
              if (!_.isArray(ctx.request.body)) {
                ctx.request.body = [ctx.request.body];
              }
              sql = [];
              arg = [];
              _iteratorNormalCompletion5 = true;
              _didIteratorError5 = false;
              _iteratorError5 = undefined;
              _context17.prev = 6;

              for (_iterator5 = (0, _getIterator3.default)(ctx.request.body); !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
                item = _step5.value;
                id = item.id, name = item.name, price = item.price, sort = item.sort;

                sql.push('update stand set name=?, price=?, sort=? where id=?');
                arg.push([name, price, sort, id]);
              }
              _context17.next = 14;
              break;

            case 10:
              _context17.prev = 10;
              _context17.t0 = _context17['catch'](6);
              _didIteratorError5 = true;
              _iteratorError5 = _context17.t0;

            case 14:
              _context17.prev = 14;
              _context17.prev = 15;

              if (!_iteratorNormalCompletion5 && _iterator5.return) {
                _iterator5.return();
              }

            case 17:
              _context17.prev = 17;

              if (!_didIteratorError5) {
                _context17.next = 20;
                break;
              }

              throw _iteratorError5;

            case 20:
              return _context17.finish(17);

            case 21:
              return _context17.finish(14);

            case 22:
              _context17.next = 24;
              return mysql.query(MYSQL.SHOP, sql, arg);

            case 24:
              ctx.body = sheet[0];

            case 25:
            case 'end':
              return _context17.stop();
          }
        }
      }, _callee17, undefined, [[6, 10, 14, 22], [15,, 17, 21]]);
    }));

    return function standUprow(_x33, _x34) {
      return _ref17.apply(this, arguments);
    };
  }(),

  '/stand/update': function () {
    var _ref18 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee18(ctx, next) {
      var _ctx$request$body5, id, name, price, img, sort, sql, arg;

      return _regenerator2.default.wrap(function _callee18$(_context18) {
        while (1) {
          switch (_context18.prev = _context18.next) {
            case 0:
              _ctx$request$body5 = ctx.request.body, id = _ctx$request$body5.id, name = _ctx$request$body5.name, price = _ctx$request$body5.price, img = _ctx$request$body5.img, sort = _ctx$request$body5.sort;
              sql = ['update stand set name=?, price=?, img=?, sort=? where id=?'];
              arg = [name, price, img, sort, id];
              _context18.next = 5;
              return mysql.query(MYSQL.SHOP, sql, arg);

            case 5:
              ctx.body = sheet[0];

            case 6:
            case 'end':
              return _context18.stop();
          }
        }
      }, _callee18, undefined);
    }));

    return function standUpdate(_x35, _x36) {
      return _ref18.apply(this, arguments);
    };
  }(),

  '/stand/set/uprow': function () {
    var _ref19 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee19(ctx, next) {
      var sql, arg, _iteratorNormalCompletion6, _didIteratorError6, _iteratorError6, _iterator6, _step6, item, id, price, sort, enabled;

      return _regenerator2.default.wrap(function _callee19$(_context19) {
        while (1) {
          switch (_context19.prev = _context19.next) {
            case 0:
              if (!_.isArray(ctx.request.body)) {
                ctx.request.body = [ctx.request.body];
              }
              sql = [];
              arg = [];
              _iteratorNormalCompletion6 = true;
              _didIteratorError6 = false;
              _iteratorError6 = undefined;
              _context19.prev = 6;

              for (_iterator6 = (0, _getIterator3.default)(ctx.request.body); !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
                item = _step6.value;
                id = item.id, price = item.price, sort = item.sort, enabled = item.enabled;

                sql.push('update stand_set set price=?, sort=?, enabled=? where id=?');
                arg.push([price, sort, enabled, id]);
              }
              _context19.next = 14;
              break;

            case 10:
              _context19.prev = 10;
              _context19.t0 = _context19['catch'](6);
              _didIteratorError6 = true;
              _iteratorError6 = _context19.t0;

            case 14:
              _context19.prev = 14;
              _context19.prev = 15;

              if (!_iteratorNormalCompletion6 && _iterator6.return) {
                _iterator6.return();
              }

            case 17:
              _context19.prev = 17;

              if (!_didIteratorError6) {
                _context19.next = 20;
                break;
              }

              throw _iteratorError6;

            case 20:
              return _context19.finish(17);

            case 21:
              return _context19.finish(14);

            case 22:
              _context19.next = 24;
              return mysql.query(MYSQL.SHOP, sql, arg);

            case 24:
              ctx.body = sheet[0];

            case 25:
            case 'end':
              return _context19.stop();
          }
        }
      }, _callee19, undefined, [[6, 10, 14, 22], [15,, 17, 21]]);
    }));

    return function standSetUprow(_x37, _x38) {
      return _ref19.apply(this, arguments);
    };
  }(),

  '/cat/uprow': function () {
    var _ref20 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee20(ctx, next) {
      var sql, arg, _iteratorNormalCompletion7, _didIteratorError7, _iteratorError7, _iterator7, _step7, item, id, name, sort;

      return _regenerator2.default.wrap(function _callee20$(_context20) {
        while (1) {
          switch (_context20.prev = _context20.next) {
            case 0:
              if (!_.isArray(ctx.request.body)) {
                ctx.request.body = [ctx.request.body];
              }
              sql = [];
              arg = [];
              _iteratorNormalCompletion7 = true;
              _didIteratorError7 = false;
              _iteratorError7 = undefined;
              _context20.prev = 6;

              for (_iterator7 = (0, _getIterator3.default)(ctx.request.body); !(_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done); _iteratorNormalCompletion7 = true) {
                item = _step7.value;
                id = item.id, name = item.name, sort = item.sort;

                sql.push('update cat set name=?, sort=? where id=?');
                arg.push([name, sort, id]);
              }
              _context20.next = 14;
              break;

            case 10:
              _context20.prev = 10;
              _context20.t0 = _context20['catch'](6);
              _didIteratorError7 = true;
              _iteratorError7 = _context20.t0;

            case 14:
              _context20.prev = 14;
              _context20.prev = 15;

              if (!_iteratorNormalCompletion7 && _iterator7.return) {
                _iterator7.return();
              }

            case 17:
              _context20.prev = 17;

              if (!_didIteratorError7) {
                _context20.next = 20;
                break;
              }

              throw _iteratorError7;

            case 20:
              return _context20.finish(17);

            case 21:
              return _context20.finish(14);

            case 22:
              _context20.next = 24;
              return mysql.query(MYSQL.SHOP, sql, arg);

            case 24:
              ctx.body = sheet[0];

            case 25:
            case 'end':
              return _context20.stop();
          }
        }
      }, _callee20, undefined, [[6, 10, 14, 22], [15,, 17, 21]]);
    }));

    return function catUprow(_x39, _x40) {
      return _ref20.apply(this, arguments);
    };
  }(),

  '/cat/update': function () {
    var _ref21 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee21(ctx, next) {
      var _ctx$request$body6, id, fid, name, img, sort, sql, arg;

      return _regenerator2.default.wrap(function _callee21$(_context21) {
        while (1) {
          switch (_context21.prev = _context21.next) {
            case 0:
              _ctx$request$body6 = ctx.request.body, id = _ctx$request$body6.id, fid = _ctx$request$body6.fid, name = _ctx$request$body6.name, img = _ctx$request$body6.img, sort = _ctx$request$body6.sort;
              sql = ['update cat set fid=?, name=?, img=?, sort=? where id=?'];
              arg = [fid, name, img, sort, id];
              _context21.next = 5;
              return mysql.query(MYSQL.SHOP, sql, arg);

            case 5:
              ctx.body = sheet[0];

            case 6:
            case 'end':
              return _context21.stop();
          }
        }
      }, _callee21, undefined);
    }));

    return function catUpdate(_x41, _x42) {
      return _ref21.apply(this, arguments);
    };
  }()
};

exports.delete = {
  '/product/remove/:ids': function () {
    var _ref22 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee22(ctx, next) {
      var ids, sql, arg;
      return _regenerator2.default.wrap(function _callee22$(_context22) {
        while (1) {
          switch (_context22.prev = _context22.next) {
            case 0:
              ids = ctx.params.ids;

              ids = ids.replace(/[|]/g, ',');
              sql = ['delete from product where id in (' + ids + ')', 'delete from stand where pid in (' + ids + ')', 'delete from product_set where pid in (' + ids + ')', 'delete from stand_set where pid in (' + ids + ')'];
              arg = [null, null, null, null];
              _context22.next = 6;
              return mysql.query(MYSQL.SHOP, sql, arg);

            case 6:
              ctx.body = sheet[0];

            case 7:
            case 'end':
              return _context22.stop();
          }
        }
      }, _callee22, undefined);
    }));

    return function productRemoveIds(_x43, _x44) {
      return _ref22.apply(this, arguments);
    };
  }(),

  '/stand/remove/:ids': function () {
    var _ref23 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee23(ctx, next) {
      var ids, sql, arg;
      return _regenerator2.default.wrap(function _callee23$(_context23) {
        while (1) {
          switch (_context23.prev = _context23.next) {
            case 0:
              ids = ctx.params.ids;

              ids = ids.replace(/[|]/g, ',');
              sql = ['delete from stand where id in (' + ids + ')', 'delete from stand_set where stid in (' + ids + ')'];
              arg = [null, null];
              _context23.next = 6;
              return mysql.query(MYSQL.SHOP, sql, arg);

            case 6:
              ctx.body = sheet[0];

            case 7:
            case 'end':
              return _context23.stop();
          }
        }
      }, _callee23, undefined);
    }));

    return function standRemoveIds(_x45, _x46) {
      return _ref23.apply(this, arguments);
    };
  }(),

  '/cat/remove/:ids': function () {
    var _ref24 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee24(ctx, next) {
      var ids, data, sql, arg;
      return _regenerator2.default.wrap(function _callee24$(_context24) {
        while (1) {
          switch (_context24.prev = _context24.next) {
            case 0:
              ids = ctx.params.ids;

              ids = ids.replace(/[|]/g, ',');
              _context24.next = 4;
              return mysql.query(MYSQL.SHOP, ['select * from product where cbid in (' + ids + ') or csid in (' + ids + ')'], null);

            case 4:
              data = _context24.sent;

              if (!(data[0].length > 0)) {
                _context24.next = 9;
                break;
              }

              sheet[20001].message = '该类别下存在商品, 不能删除';
              ctx.body = sheet[20001];
              return _context24.abrupt('return');

            case 9:
              sql = ['delete from cat where id in (' + ids + ')'];
              arg = null;
              _context24.next = 13;
              return mysql.query(MYSQL.SHOP, sql, arg);

            case 13:
              ctx.body = sheet[0];

            case 14:
            case 'end':
              return _context24.stop();
          }
        }
      }, _callee24, undefined);
    }));

    return function catRemoveIds(_x47, _x48) {
      return _ref24.apply(this, arguments);
    };
  }()
};