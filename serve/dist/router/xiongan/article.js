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
  '/article/list': function () {
    var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(ctx, next) {
      var where, limit, sql, data;
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              where = '';
              limit = ' limit 0,15';

              if (ctx.query.page > 0) {
                limit = ' limit ' + (ctx.query.page - 1) * 15 + ',15';
              }
              if (ctx.query.name) {
                where = where + ' and A.name like "%' + ctx.query.name + '%"';
              }
              if (ctx.query.cid > 0) {
                where = 'and A.cid = ' + ctx.query.cid;
              }
              sql = ['select A.*,B.name as cname from article A, article_cat B where A.cid = B.id ' + where + ' order by sort, id desc' + limit];
              _context.next = 8;
              return mysql.query(MYSQL.XIONGAN, sql, null);

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

    return function articleList(_x, _x2) {
      return _ref.apply(this, arguments);
    };
  }(),

  '/article/category': function () {
    var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(ctx, next) {
      var sql, data;
      return _regenerator2.default.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              sql = ['select * from article_cat order by sort, id desc'];
              _context2.next = 3;
              return mysql.query(MYSQL.XIONGAN, sql, null);

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

    return function articleCategory(_x3, _x4) {
      return _ref2.apply(this, arguments);
    };
  }(),

  '/swiper/list': function () {
    var _ref3 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3(ctx, next) {
      var sql, data;
      return _regenerator2.default.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              sql = ['select * from swiper order by sort, id desc'];
              _context3.next = 3;
              return mysql.query(MYSQL.XIONGAN, sql, null);

            case 3:
              data = _context3.sent;

              sheet[0].data = data[0];
              ctx.body = sheet[0];

            case 6:
            case 'end':
              return _context3.stop();
          }
        }
      }, _callee3, undefined);
    }));

    return function swiperList(_x5, _x6) {
      return _ref3.apply(this, arguments);
    };
  }(),

  '/article/detail/:id': function () {
    var _ref4 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee4(ctx, next) {
      var data;
      return _regenerator2.default.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.next = 2;
              return mysql.query(MYSQL.XIONGAN, ['select * from article where id=?'], [ctx.params.id]);

            case 2:
              data = _context4.sent;

              sheet[0].data = data[0][0];
              ctx.body = sheet[0];

            case 5:
            case 'end':
              return _context4.stop();
          }
        }
      }, _callee4, undefined);
    }));

    return function articleDetailId(_x7, _x8) {
      return _ref4.apply(this, arguments);
    };
  }(),

  '/cat/detail/:id': function () {
    var _ref5 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee5(ctx, next) {
      var data;
      return _regenerator2.default.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              _context5.next = 2;
              return mysql.query(MYSQL.XIONGAN, ['select * from article_cat where id=?'], [ctx.params.id]);

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

    return function catDetailId(_x9, _x10) {
      return _ref5.apply(this, arguments);
    };
  }()
};

exports.post = {
  '/article/add': function () {
    var _ref6 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee6(ctx, next) {
      var _ctx$request$body, cid, title, name, img, content, img_small, sort, sql, arg;

      return _regenerator2.default.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              _ctx$request$body = ctx.request.body, cid = _ctx$request$body.cid, title = _ctx$request$body.title, name = _ctx$request$body.name, img = _ctx$request$body.img, content = _ctx$request$body.content, img_small = _ctx$request$body.img_small, sort = _ctx$request$body.sort;
              sql = ['insert into article (cid,title,name, content, sort,img,img_small) values(?,?,?,?,?,?,?)'];
              arg = [cid, title, name, content, sort, img, img_small];
              _context6.next = 5;
              return mysql.query(MYSQL.XIONGAN, sql, arg);

            case 5:
              sheet[0].message = '添加成功';
              ctx.body = sheet[0];

            case 7:
            case 'end':
              return _context6.stop();
          }
        }
      }, _callee6, undefined);
    }));

    return function articleAdd(_x11, _x12) {
      return _ref6.apply(this, arguments);
    };
  }(),

  '/swiper/add': function () {
    var _ref7 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee7(ctx, next) {
      var _ctx$request$body2, img, sort, sql, arg;

      return _regenerator2.default.wrap(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              _ctx$request$body2 = ctx.request.body, img = _ctx$request$body2.img, sort = _ctx$request$body2.sort;
              sql = ['insert into swiper ( sort,img) values(?,?)'];
              arg = [sort, img];
              _context7.next = 5;
              return mysql.query(MYSQL.XIONGAN, sql, arg);

            case 5:
              sheet[0].message = '添加成功';
              ctx.body = sheet[0];

            case 7:
            case 'end':
              return _context7.stop();
          }
        }
      }, _callee7, undefined);
    }));

    return function swiperAdd(_x13, _x14) {
      return _ref7.apply(this, arguments);
    };
  }(),

  '/cat/add': function () {
    var _ref8 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee8(ctx, next) {
      var _ctx$request$body3, name, sort, sql, arg;

      return _regenerator2.default.wrap(function _callee8$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              _ctx$request$body3 = ctx.request.body, name = _ctx$request$body3.name, sort = _ctx$request$body3.sort;
              sql = ['insert into article_cat (name, sort) values(?,?)'];
              arg = [name, sort];
              _context8.next = 5;
              return mysql.query(MYSQL.XIONGAN, sql, arg);

            case 5:
              sheet[0].message = '添加成功';
              ctx.body = sheet[0];

            case 7:
            case 'end':
              return _context8.stop();
          }
        }
      }, _callee8, undefined);
    }));

    return function catAdd(_x15, _x16) {
      return _ref8.apply(this, arguments);
    };
  }()

};

exports.put = {
  '/article/uprow': function () {
    var _ref9 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee9(ctx, next) {
      var sql, arg, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, item, id, title, name, sort;

      return _regenerator2.default.wrap(function _callee9$(_context9) {
        while (1) {
          switch (_context9.prev = _context9.next) {
            case 0:
              if (!_.isArray(ctx.request.body)) {
                ctx.request.body = [ctx.request.body];
              }
              sql = [];
              arg = [];
              _iteratorNormalCompletion = true;
              _didIteratorError = false;
              _iteratorError = undefined;
              _context9.prev = 6;

              for (_iterator = (0, _getIterator3.default)(ctx.request.body); !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                item = _step.value;
                id = item.id, title = item.title, name = item.name, sort = item.sort;

                sql.push('update article set name=?,title=?, sort=? where id=?');
                arg.push([name, title, sort, id]);
              }
              _context9.next = 14;
              break;

            case 10:
              _context9.prev = 10;
              _context9.t0 = _context9['catch'](6);
              _didIteratorError = true;
              _iteratorError = _context9.t0;

            case 14:
              _context9.prev = 14;
              _context9.prev = 15;

              if (!_iteratorNormalCompletion && _iterator.return) {
                _iterator.return();
              }

            case 17:
              _context9.prev = 17;

              if (!_didIteratorError) {
                _context9.next = 20;
                break;
              }

              throw _iteratorError;

            case 20:
              return _context9.finish(17);

            case 21:
              return _context9.finish(14);

            case 22:
              _context9.next = 24;
              return mysql.query(MYSQL.XIONGAN, sql, arg);

            case 24:
              sheet[0].message = '更新成功';
              ctx.body = sheet[0];

            case 26:
            case 'end':
              return _context9.stop();
          }
        }
      }, _callee9, undefined, [[6, 10, 14, 22], [15,, 17, 21]]);
    }));

    return function articleUprow(_x17, _x18) {
      return _ref9.apply(this, arguments);
    };
  }(),

  '/cat/uprow': function () {
    var _ref10 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee10(ctx, next) {
      var sql, arg, _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, item, id, name, sort;

      return _regenerator2.default.wrap(function _callee10$(_context10) {
        while (1) {
          switch (_context10.prev = _context10.next) {
            case 0:
              if (!_.isArray(ctx.request.body)) {
                ctx.request.body = [ctx.request.body];
              }
              sql = [];
              arg = [];
              _iteratorNormalCompletion2 = true;
              _didIteratorError2 = false;
              _iteratorError2 = undefined;
              _context10.prev = 6;

              for (_iterator2 = (0, _getIterator3.default)(ctx.request.body); !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                item = _step2.value;
                id = item.id, name = item.name, sort = item.sort;

                sql.push('update article_cat set name=?,sort=? where id=?');
                arg.push([name, sort, id]);
              }
              _context10.next = 14;
              break;

            case 10:
              _context10.prev = 10;
              _context10.t0 = _context10['catch'](6);
              _didIteratorError2 = true;
              _iteratorError2 = _context10.t0;

            case 14:
              _context10.prev = 14;
              _context10.prev = 15;

              if (!_iteratorNormalCompletion2 && _iterator2.return) {
                _iterator2.return();
              }

            case 17:
              _context10.prev = 17;

              if (!_didIteratorError2) {
                _context10.next = 20;
                break;
              }

              throw _iteratorError2;

            case 20:
              return _context10.finish(17);

            case 21:
              return _context10.finish(14);

            case 22:
              _context10.next = 24;
              return mysql.query(MYSQL.XIONGAN, sql, arg);

            case 24:
              sheet[0].message = '更新成功';
              ctx.body = sheet[0];

            case 26:
            case 'end':
              return _context10.stop();
          }
        }
      }, _callee10, undefined, [[6, 10, 14, 22], [15,, 17, 21]]);
    }));

    return function catUprow(_x19, _x20) {
      return _ref10.apply(this, arguments);
    };
  }(),

  '/article/update': function () {
    var _ref11 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee11(ctx, next) {
      var _ctx$request$body4, id, cid, name, img, img_small, title, content, sort, sql, arg;

      return _regenerator2.default.wrap(function _callee11$(_context11) {
        while (1) {
          switch (_context11.prev = _context11.next) {
            case 0:
              console.log(ctx.request.body);
              _ctx$request$body4 = ctx.request.body, id = _ctx$request$body4.id, cid = _ctx$request$body4.cid, name = _ctx$request$body4.name, img = _ctx$request$body4.img, img_small = _ctx$request$body4.img_small, title = _ctx$request$body4.title, content = _ctx$request$body4.content, sort = _ctx$request$body4.sort;
              sql = ['update article set cid=?, name=?,title=?, img=?,img_small=?,content=?, sort=? where id=?'];
              arg = [cid, name, title, img, img_small, content, sort, id];
              _context11.next = 6;
              return mysql.query(MYSQL.XIONGAN, sql, arg);

            case 6:
              sheet[0].message = '更新成功';
              ctx.body = sheet[0];

            case 8:
            case 'end':
              return _context11.stop();
          }
        }
      }, _callee11, undefined);
    }));

    return function articleUpdate(_x21, _x22) {
      return _ref11.apply(this, arguments);
    };
  }()
};

exports.delete = {
  '/article/remove/:ids': function () {
    var _ref12 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee12(ctx, next) {
      var ids, sql, arg;
      return _regenerator2.default.wrap(function _callee12$(_context12) {
        while (1) {
          switch (_context12.prev = _context12.next) {
            case 0:
              ids = ctx.params.ids;

              ids = ids.replace(/[|]/g, ',');
              sql = ['delete from article where id in (' + ids + ')'];
              arg = null;
              _context12.next = 6;
              return mysql.query(MYSQL.XIONGAN, sql, arg);

            case 6:
              sheet[0].message = '删除成功';
              ctx.body = sheet[0];

            case 8:
            case 'end':
              return _context12.stop();
          }
        }
      }, _callee12, undefined);
    }));

    return function articleRemoveIds(_x23, _x24) {
      return _ref12.apply(this, arguments);
    };
  }(),

  '/cat/remove/:ids': function () {
    var _ref13 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee13(ctx, next) {
      var ids, data, sql, arg;
      return _regenerator2.default.wrap(function _callee13$(_context13) {
        while (1) {
          switch (_context13.prev = _context13.next) {
            case 0:
              ids = ctx.params.ids;

              ids = ids.replace(/[|]/g, ',');
              _context13.next = 4;
              return mysql.query(MYSQL.XIONGAN, ['select * from article where cid in (' + ids + ')'], null);

            case 4:
              data = _context13.sent;

              if (!(data[0].length > 0)) {
                _context13.next = 11;
                break;
              }

              sheet[20001].message = '该类别下存在服务, 不能删除';
              ctx.body = sheet[20001];
              return _context13.abrupt('return');

            case 11:
              sql = ['delete from article_cat where id in (' + ids + ')'];
              arg = null;
              _context13.next = 15;
              return mysql.query(MYSQL.XIONGAN, sql, arg);

            case 15:
              sheet[0].message = '删除成功';
              ctx.body = sheet[0];

            case 17:
            case 'end':
              return _context13.stop();
          }
        }
      }, _callee13, undefined);
    }));

    return function catRemoveIds(_x25, _x26) {
      return _ref13.apply(this, arguments);
    };
  }(),

  '/swiper/remove/:ids': function () {
    var _ref14 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee14(ctx, next) {
      var ids, sql, arg;
      return _regenerator2.default.wrap(function _callee14$(_context14) {
        while (1) {
          switch (_context14.prev = _context14.next) {
            case 0:
              ids = ctx.params.ids;

              ids = ids.replace(/[|]/g, ',');
              sql = ['delete from swiper where id in (' + ids + ')'];
              arg = null;
              _context14.next = 6;
              return mysql.query(MYSQL.XIONGAN, sql, arg);

            case 6:
              sheet[0].message = '删除成功';
              ctx.body = sheet[0];

            case 8:
            case 'end':
              return _context14.stop();
          }
        }
      }, _callee14, undefined);
    }));

    return function swiperRemoveIds(_x27, _x28) {
      return _ref14.apply(this, arguments);
    };
  }()
};