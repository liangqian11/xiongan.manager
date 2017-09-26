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
  '/banner/list': function () {
    var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(ctx, next) {
      var arg, where, limit, data;
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              arg = [];
              where = '';
              limit = ' limit 0,10';

              if (ctx.query.aid > 0) {
                where = where == '' ? ' where aid = ?' : where + ' and aid = ?';
                arg.push(ctx.query.aid);
              }
              if (ctx.query.page > 0) {
                limit = ' limit ' + (ctx.query.page - 1) * 10 + ',10';
              }
              _context.next = 7;
              return mysql.query(MYSQL.SHOP, ['select * from banner ' + where + ' order by sort' + limit], arg);

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

    return function bannerList(_x, _x2) {
      return _ref.apply(this, arguments);
    };
  }(),

  '/banner/detail/:id': function () {
    var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(ctx, next) {
      var data;
      return _regenerator2.default.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return mysql.query(MYSQL.SHOP, ['select * from banner where id=?'], [ctx.params.id]);

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

    return function bannerDetailId(_x3, _x4) {
      return _ref2.apply(this, arguments);
    };
  }(),

  '/banner/middle/list': function () {
    var _ref3 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3(ctx, next) {
      var arg, where, limit, data;
      return _regenerator2.default.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              arg = [];
              where = '';
              limit = ' limit 0,14';

              if (ctx.query.aid > 0) {
                where = where == '' ? ' where aid = ?' : where + ' and aid = ?';
                arg.push(ctx.query.aid);
              }
              if (ctx.query.page > 0) {
                limit = ' limit ' + (ctx.query.page - 1) * 14 + ',14';
              }
              _context3.next = 7;
              return mysql.query(MYSQL.SHOP, ['select * from banner_middle ' + where + ' order by sort' + limit], arg);

            case 7:
              data = _context3.sent;

              sheet[0].data = data[0];
              ctx.body = sheet[0];

            case 10:
            case 'end':
              return _context3.stop();
          }
        }
      }, _callee3, undefined);
    }));

    return function bannerMiddleList(_x5, _x6) {
      return _ref3.apply(this, arguments);
    };
  }(),

  '/banner/middle/detail/:id': function () {
    var _ref4 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee4(ctx, next) {
      var data;
      return _regenerator2.default.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.next = 2;
              return mysql.query(MYSQL.SHOP, ['select * from banner_middle where id=?'], [ctx.params.id]);

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

    return function bannerMiddleDetailId(_x7, _x8) {
      return _ref4.apply(this, arguments);
    };
  }(),

  '/active/img/list': function () {
    var _ref5 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee5(ctx, next) {
      var arg, where, limit, data;
      return _regenerator2.default.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              arg = [];
              where = '';
              limit = ' limit 0,12';

              if (ctx.query.aid > 0) {
                where = where == '' ? ' where aid = ?' : where + ' and aid = ?';
                arg.push(ctx.query.aid);
              }
              if (ctx.query.page > 0) {
                limit = ' limit ' + (ctx.query.page - 1) * 12 + ',12';
              }
              _context5.next = 7;
              return mysql.query(MYSQL.SHOP, ['select * from active_img ' + where + ' order by id desc' + limit], arg);

            case 7:
              data = _context5.sent;

              sheet[0].data = data[0];
              ctx.body = sheet[0];

            case 10:
            case 'end':
              return _context5.stop();
          }
        }
      }, _callee5, undefined);
    }));

    return function activeImgList(_x9, _x10) {
      return _ref5.apply(this, arguments);
    };
  }(),

  '/active/img/detail/:id': function () {
    var _ref6 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee6(ctx, next) {
      var data;
      return _regenerator2.default.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              _context6.next = 2;
              return mysql.query(MYSQL.SHOP, ['select * from active_img where id=?'], [ctx.params.id]);

            case 2:
              data = _context6.sent;

              sheet[0].data = data[0][0];
              ctx.body = sheet[0];

            case 5:
            case 'end':
              return _context6.stop();
          }
        }
      }, _callee6, undefined);
    }));

    return function activeImgDetailId(_x11, _x12) {
      return _ref6.apply(this, arguments);
    };
  }(),

  '/active/ninegrid/list': function () {
    var _ref7 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee7(ctx, next) {
      var arg, where, limit, data;
      return _regenerator2.default.wrap(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              arg = [];
              where = '';
              limit = ' limit 0,12';

              if (ctx.query.aid > 0) {
                where = where == '' ? ' where aid = ?' : where + ' and aid = ?';
                arg.push(ctx.query.aid);
              }
              if (ctx.query.page > 0) {
                limit = ' limit ' + (ctx.query.page - 1) * 12 + ',12';
              }
              _context7.next = 7;
              return mysql.query(MYSQL.SHOP, ['select * from active_ninegrid ' + where + ' order by id' + limit], arg);

            case 7:
              data = _context7.sent;

              sheet[0].data = data[0];
              ctx.body = sheet[0];

            case 10:
            case 'end':
              return _context7.stop();
          }
        }
      }, _callee7, undefined);
    }));

    return function activeNinegridList(_x13, _x14) {
      return _ref7.apply(this, arguments);
    };
  }(),

  '/active/ninegrid/detail/:id': function () {
    var _ref8 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee8(ctx, next) {
      var data;
      return _regenerator2.default.wrap(function _callee8$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              _context8.next = 2;
              return mysql.query(MYSQL.SHOP, ['select * from active_ninegrid where id=?'], [ctx.params.id]);

            case 2:
              data = _context8.sent;

              sheet[0].data = data[0][0];
              ctx.body = sheet[0];

            case 5:
            case 'end':
              return _context8.stop();
          }
        }
      }, _callee8, undefined);
    }));

    return function activeNinegridDetailId(_x15, _x16) {
      return _ref8.apply(this, arguments);
    };
  }(),

  '/active/notice/list': function () {
    var _ref9 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee9(ctx, next) {
      var data;
      return _regenerator2.default.wrap(function _callee9$(_context9) {
        while (1) {
          switch (_context9.prev = _context9.next) {
            case 0:
              _context9.next = 2;
              return mysql.query(MYSQL.SHOP, ['select * from active_notice'], null);

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

    return function activeNoticeList(_x17, _x18) {
      return _ref9.apply(this, arguments);
    };
  }(),

  '/active/notice/detail/:id': function () {
    var _ref10 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee10(ctx, next) {
      var data;
      return _regenerator2.default.wrap(function _callee10$(_context10) {
        while (1) {
          switch (_context10.prev = _context10.next) {
            case 0:
              _context10.next = 2;
              return mysql.query(MYSQL.SHOP, ['select * from active_notice where id=?'], [ctx.params.id]);

            case 2:
              data = _context10.sent;

              sheet[0].data = data[0];
              ctx.body = sheet[0];

            case 5:
            case 'end':
              return _context10.stop();
          }
        }
      }, _callee10, undefined);
    }));

    return function activeNoticeDetailId(_x19, _x20) {
      return _ref10.apply(this, arguments);
    };
  }(),

  '/advert/list': function () {
    var _ref11 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee11(ctx, next) {
      var data;
      return _regenerator2.default.wrap(function _callee11$(_context11) {
        while (1) {
          switch (_context11.prev = _context11.next) {
            case 0:
              _context11.next = 2;
              return mysql.query(MYSQL.SHOP, ['select * from advert'], null);

            case 2:
              data = _context11.sent;

              sheet[0].data = data[0];
              ctx.body = sheet[0];

            case 5:
            case 'end':
              return _context11.stop();
          }
        }
      }, _callee11, undefined);
    }));

    return function advertList(_x21, _x22) {
      return _ref11.apply(this, arguments);
    };
  }(),

  '/advert/detail/:id': function () {
    var _ref12 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee12(ctx, next) {
      var data;
      return _regenerator2.default.wrap(function _callee12$(_context12) {
        while (1) {
          switch (_context12.prev = _context12.next) {
            case 0:
              _context12.next = 2;
              return mysql.query(MYSQL.SHOP, ['select * from advert where id=?'], [ctx.params.id]);

            case 2:
              data = _context12.sent;

              sheet[0].data = data[0][0];
              ctx.body = sheet[0];

            case 5:
            case 'end':
              return _context12.stop();
          }
        }
      }, _callee12, undefined);
    }));

    return function advertDetailId(_x23, _x24) {
      return _ref12.apply(this, arguments);
    };
  }(),

  '/search/recommend/list': function () {
    var _ref13 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee13(ctx, next) {
      var data;
      return _regenerator2.default.wrap(function _callee13$(_context13) {
        while (1) {
          switch (_context13.prev = _context13.next) {
            case 0:
              _context13.next = 2;
              return mysql.query(MYSQL.SHOP, ['select * from search_recommend order by sort'], null);

            case 2:
              data = _context13.sent;

              sheet[0].data = data[0];
              ctx.body = sheet[0];

            case 5:
            case 'end':
              return _context13.stop();
          }
        }
      }, _callee13, undefined);
    }));

    return function searchRecommendList(_x25, _x26) {
      return _ref13.apply(this, arguments);
    };
  }()
};

exports.post = {
  '/banner/add': function () {
    var _ref14 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee14(ctx, next) {
      var _ctx$request$body, aid, name, img, url, sort, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, v, sql, arg;

      return _regenerator2.default.wrap(function _callee14$(_context14) {
        while (1) {
          switch (_context14.prev = _context14.next) {
            case 0:
              _ctx$request$body = ctx.request.body, aid = _ctx$request$body.aid, name = _ctx$request$body.name, img = _ctx$request$body.img, url = _ctx$request$body.url, sort = _ctx$request$body.sort;
              _iteratorNormalCompletion = true;
              _didIteratorError = false;
              _iteratorError = undefined;
              _context14.prev = 4;
              _iterator = (0, _getIterator3.default)(aid);

            case 6:
              if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                _context14.next = 16;
                break;
              }

              v = _step.value;
              sql = ['insert into banner (aid, name, img, url, sort) values(?,?,?,?,?)'];
              arg = [v, name, img, url, sort];
              _context14.next = 12;
              return mysql.query(MYSQL.SHOP, sql, arg);

            case 12:
              ctx.body = sheet[0];

            case 13:
              _iteratorNormalCompletion = true;
              _context14.next = 6;
              break;

            case 16:
              _context14.next = 22;
              break;

            case 18:
              _context14.prev = 18;
              _context14.t0 = _context14['catch'](4);
              _didIteratorError = true;
              _iteratorError = _context14.t0;

            case 22:
              _context14.prev = 22;
              _context14.prev = 23;

              if (!_iteratorNormalCompletion && _iterator.return) {
                _iterator.return();
              }

            case 25:
              _context14.prev = 25;

              if (!_didIteratorError) {
                _context14.next = 28;
                break;
              }

              throw _iteratorError;

            case 28:
              return _context14.finish(25);

            case 29:
              return _context14.finish(22);

            case 30:
            case 'end':
              return _context14.stop();
          }
        }
      }, _callee14, undefined, [[4, 18, 22, 30], [23,, 25, 29]]);
    }));

    return function bannerAdd(_x27, _x28) {
      return _ref14.apply(this, arguments);
    };
  }(),

  '/banner/middle/add': function () {
    var _ref15 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee15(ctx, next) {
      var _ctx$request$body2, aid, name, img, url, sort, _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, v, sql, arg;

      return _regenerator2.default.wrap(function _callee15$(_context15) {
        while (1) {
          switch (_context15.prev = _context15.next) {
            case 0:
              _ctx$request$body2 = ctx.request.body, aid = _ctx$request$body2.aid, name = _ctx$request$body2.name, img = _ctx$request$body2.img, url = _ctx$request$body2.url, sort = _ctx$request$body2.sort;
              _iteratorNormalCompletion2 = true;
              _didIteratorError2 = false;
              _iteratorError2 = undefined;
              _context15.prev = 4;
              _iterator2 = (0, _getIterator3.default)(aid);

            case 6:
              if (_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done) {
                _context15.next = 16;
                break;
              }

              v = _step2.value;
              sql = ['insert into banner_middle (aid, name, img, url, sort) values(?,?,?,?,?)'];
              arg = [v, name, img, url, sort];
              _context15.next = 12;
              return mysql.query(MYSQL.SHOP, sql, arg);

            case 12:
              ctx.body = sheet[0];

            case 13:
              _iteratorNormalCompletion2 = true;
              _context15.next = 6;
              break;

            case 16:
              _context15.next = 22;
              break;

            case 18:
              _context15.prev = 18;
              _context15.t0 = _context15['catch'](4);
              _didIteratorError2 = true;
              _iteratorError2 = _context15.t0;

            case 22:
              _context15.prev = 22;
              _context15.prev = 23;

              if (!_iteratorNormalCompletion2 && _iterator2.return) {
                _iterator2.return();
              }

            case 25:
              _context15.prev = 25;

              if (!_didIteratorError2) {
                _context15.next = 28;
                break;
              }

              throw _iteratorError2;

            case 28:
              return _context15.finish(25);

            case 29:
              return _context15.finish(22);

            case 30:
            case 'end':
              return _context15.stop();
          }
        }
      }, _callee15, undefined, [[4, 18, 22, 30], [23,, 25, 29]]);
    }));

    return function bannerMiddleAdd(_x29, _x30) {
      return _ref15.apply(this, arguments);
    };
  }(),

  '/search/recommend/add': function () {
    var _ref16 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee16(ctx, next) {
      var _ctx$request$body3, keyword, sort, sql, arg;

      return _regenerator2.default.wrap(function _callee16$(_context16) {
        while (1) {
          switch (_context16.prev = _context16.next) {
            case 0:
              _ctx$request$body3 = ctx.request.body, keyword = _ctx$request$body3.keyword, sort = _ctx$request$body3.sort;
              sql = ['insert into search_recommend (keyword, sort) values(?,?)'];
              arg = [keyword, sort];
              _context16.next = 5;
              return mysql.query(MYSQL.SHOP, sql, arg);

            case 5:
              ctx.body = sheet[0];

            case 6:
            case 'end':
              return _context16.stop();
          }
        }
      }, _callee16, undefined);
    }));

    return function searchRecommendAdd(_x31, _x32) {
      return _ref16.apply(this, arguments);
    };
  }()
};

exports.put = {
  '/banner/uprow': function () {
    var _ref17 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee17(ctx, next) {
      var sql, arg, _iteratorNormalCompletion3, _didIteratorError3, _iteratorError3, _iterator3, _step3, item, id, name, url, sort, enabled;

      return _regenerator2.default.wrap(function _callee17$(_context17) {
        while (1) {
          switch (_context17.prev = _context17.next) {
            case 0:
              if (!_.isArray(ctx.request.body)) {
                ctx.request.body = [ctx.request.body];
              }
              sql = [];
              arg = [];
              _iteratorNormalCompletion3 = true;
              _didIteratorError3 = false;
              _iteratorError3 = undefined;
              _context17.prev = 6;

              for (_iterator3 = (0, _getIterator3.default)(ctx.request.body); !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                item = _step3.value;
                id = item.id, name = item.name, url = item.url, sort = item.sort, enabled = item.enabled;

                sql.push('update banner set name=?, url=?, sort=?, enabled=? where id=?');
                arg.push([name, url, sort, enabled, id]);
              }
              _context17.next = 14;
              break;

            case 10:
              _context17.prev = 10;
              _context17.t0 = _context17['catch'](6);
              _didIteratorError3 = true;
              _iteratorError3 = _context17.t0;

            case 14:
              _context17.prev = 14;
              _context17.prev = 15;

              if (!_iteratorNormalCompletion3 && _iterator3.return) {
                _iterator3.return();
              }

            case 17:
              _context17.prev = 17;

              if (!_didIteratorError3) {
                _context17.next = 20;
                break;
              }

              throw _iteratorError3;

            case 20:
              return _context17.finish(17);

            case 21:
              return _context17.finish(14);

            case 22:
              _context17.next = 24;
              return mysql.query(MYSQL.SHOP, sql, arg);

            case 24:
              ctx.body = sheet[0];
              sheet[0].message = '更新成功!';

            case 26:
            case 'end':
              return _context17.stop();
          }
        }
      }, _callee17, undefined, [[6, 10, 14, 22], [15,, 17, 21]]);
    }));

    return function bannerUprow(_x33, _x34) {
      return _ref17.apply(this, arguments);
    };
  }(),

  '/banner/update': function () {
    var _ref18 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee18(ctx, next) {
      var _ctx$request$body4, id, name, img, url, sort, sql, arg;

      return _regenerator2.default.wrap(function _callee18$(_context18) {
        while (1) {
          switch (_context18.prev = _context18.next) {
            case 0:
              _ctx$request$body4 = ctx.request.body, id = _ctx$request$body4.id, name = _ctx$request$body4.name, img = _ctx$request$body4.img, url = _ctx$request$body4.url, sort = _ctx$request$body4.sort;
              sql = ['update banner set name=?, img=?, url=?, sort=? where id=?'];
              arg = [name, img, url, sort, id];
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

    return function bannerUpdate(_x35, _x36) {
      return _ref18.apply(this, arguments);
    };
  }(),

  '/banner/middle/uprow': function () {
    var _ref19 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee19(ctx, next) {
      var sql, arg, _iteratorNormalCompletion4, _didIteratorError4, _iteratorError4, _iterator4, _step4, item, id, name, url, sort, enabled;

      return _regenerator2.default.wrap(function _callee19$(_context19) {
        while (1) {
          switch (_context19.prev = _context19.next) {
            case 0:
              if (!_.isArray(ctx.request.body)) {
                ctx.request.body = [ctx.request.body];
              }
              sql = [];
              arg = [];
              _iteratorNormalCompletion4 = true;
              _didIteratorError4 = false;
              _iteratorError4 = undefined;
              _context19.prev = 6;

              for (_iterator4 = (0, _getIterator3.default)(ctx.request.body); !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
                item = _step4.value;
                id = item.id, name = item.name, url = item.url, sort = item.sort, enabled = item.enabled;

                sql.push('update banner_middle set name=?, url=?, sort=?, enabled=? where id=?');
                arg.push([name, url, sort, enabled, id]);
              }
              _context19.next = 14;
              break;

            case 10:
              _context19.prev = 10;
              _context19.t0 = _context19['catch'](6);
              _didIteratorError4 = true;
              _iteratorError4 = _context19.t0;

            case 14:
              _context19.prev = 14;
              _context19.prev = 15;

              if (!_iteratorNormalCompletion4 && _iterator4.return) {
                _iterator4.return();
              }

            case 17:
              _context19.prev = 17;

              if (!_didIteratorError4) {
                _context19.next = 20;
                break;
              }

              throw _iteratorError4;

            case 20:
              return _context19.finish(17);

            case 21:
              return _context19.finish(14);

            case 22:
              _context19.next = 24;
              return mysql.query(MYSQL.SHOP, sql, arg);

            case 24:
              ctx.body = sheet[0];
              sheet[0].message = '更新成功!';

            case 26:
            case 'end':
              return _context19.stop();
          }
        }
      }, _callee19, undefined, [[6, 10, 14, 22], [15,, 17, 21]]);
    }));

    return function bannerMiddleUprow(_x37, _x38) {
      return _ref19.apply(this, arguments);
    };
  }(),

  '/banner/middle/update': function () {
    var _ref20 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee20(ctx, next) {
      var _ctx$request$body5, id, name, img, url, sort, sql, arg;

      return _regenerator2.default.wrap(function _callee20$(_context20) {
        while (1) {
          switch (_context20.prev = _context20.next) {
            case 0:
              _ctx$request$body5 = ctx.request.body, id = _ctx$request$body5.id, name = _ctx$request$body5.name, img = _ctx$request$body5.img, url = _ctx$request$body5.url, sort = _ctx$request$body5.sort;
              sql = ['update banner_middle set name=?, img=?, url=?, sort=? where id=?'];
              arg = [name, img, url, sort, id];
              _context20.next = 5;
              return mysql.query(MYSQL.SHOP, sql, arg);

            case 5:
              ctx.body = sheet[0];

            case 6:
            case 'end':
              return _context20.stop();
          }
        }
      }, _callee20, undefined);
    }));

    return function bannerMiddleUpdate(_x39, _x40) {
      return _ref20.apply(this, arguments);
    };
  }(),

  '/active/img/uprow': function () {
    var _ref21 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee21(ctx, next) {
      var sql, arg, _iteratorNormalCompletion5, _didIteratorError5, _iteratorError5, _iterator5, _step5, item, id, url1, url2;

      return _regenerator2.default.wrap(function _callee21$(_context21) {
        while (1) {
          switch (_context21.prev = _context21.next) {
            case 0:
              if (!_.isArray(ctx.request.body)) {
                ctx.request.body = [ctx.request.body];
              }
              sql = [];
              arg = [];
              _iteratorNormalCompletion5 = true;
              _didIteratorError5 = false;
              _iteratorError5 = undefined;
              _context21.prev = 6;

              for (_iterator5 = (0, _getIterator3.default)(ctx.request.body); !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
                item = _step5.value;
                id = item.id, url1 = item.url1, url2 = item.url2;

                sql.push('update active_img set url1=?, url2=? where id=?');
                arg.push([url1, url2, id]);
              }
              _context21.next = 14;
              break;

            case 10:
              _context21.prev = 10;
              _context21.t0 = _context21['catch'](6);
              _didIteratorError5 = true;
              _iteratorError5 = _context21.t0;

            case 14:
              _context21.prev = 14;
              _context21.prev = 15;

              if (!_iteratorNormalCompletion5 && _iterator5.return) {
                _iterator5.return();
              }

            case 17:
              _context21.prev = 17;

              if (!_didIteratorError5) {
                _context21.next = 20;
                break;
              }

              throw _iteratorError5;

            case 20:
              return _context21.finish(17);

            case 21:
              return _context21.finish(14);

            case 22:
              _context21.next = 24;
              return mysql.query(MYSQL.SHOP, sql, arg);

            case 24:
              ctx.body = sheet[0];
              sheet[0].message = '更新成功!';

            case 26:
            case 'end':
              return _context21.stop();
          }
        }
      }, _callee21, undefined, [[6, 10, 14, 22], [15,, 17, 21]]);
    }));

    return function activeImgUprow(_x41, _x42) {
      return _ref21.apply(this, arguments);
    };
  }(),

  '/active/img/update': function () {
    var _ref22 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee22(ctx, next) {
      var _ctx$request$body6, id, img1, url1, img2, url2, sql, arg;

      return _regenerator2.default.wrap(function _callee22$(_context22) {
        while (1) {
          switch (_context22.prev = _context22.next) {
            case 0:
              _ctx$request$body6 = ctx.request.body, id = _ctx$request$body6.id, img1 = _ctx$request$body6.img1, url1 = _ctx$request$body6.url1, img2 = _ctx$request$body6.img2, url2 = _ctx$request$body6.url2;
              sql = ['update active_img set url1=?,img1=?,url2=?,img2=? where id=?'];
              arg = [url1, img1, url2, img2, id];
              _context22.next = 5;
              return mysql.query(MYSQL.SHOP, sql, arg);

            case 5:
              ctx.body = sheet[0];
              sheet[0].message = '更新成功!';

            case 7:
            case 'end':
              return _context22.stop();
          }
        }
      }, _callee22, undefined);
    }));

    return function activeImgUpdate(_x43, _x44) {
      return _ref22.apply(this, arguments);
    };
  }(),

  '/active/ninegrid/uprow': function () {
    var _ref23 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee23(ctx, next) {
      var sql, arg, _iteratorNormalCompletion6, _didIteratorError6, _iteratorError6, _iterator6, _step6, item, id, aid, url1, url2, url3, url4, url5, url6, url7, url8, url9;

      return _regenerator2.default.wrap(function _callee23$(_context23) {
        while (1) {
          switch (_context23.prev = _context23.next) {
            case 0:
              if (!_.isArray(ctx.request.body)) {
                ctx.request.body = [ctx.request.body];
              }
              sql = [];
              arg = [];
              _iteratorNormalCompletion6 = true;
              _didIteratorError6 = false;
              _iteratorError6 = undefined;
              _context23.prev = 6;

              for (_iterator6 = (0, _getIterator3.default)(ctx.request.body); !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
                item = _step6.value;
                id = item.id, aid = item.aid, url1 = item.url1, url2 = item.url2, url3 = item.url3, url4 = item.url4, url5 = item.url5, url6 = item.url6, url7 = item.url7, url8 = item.url8, url9 = item.url9;

                sql.push('update active_ninegrid set aid=?, url1=?, url2=?, url3=?, url4=?, url5=?, url6=?, url7=?, url8=?, url9=? where id=?');
                arg.push([aid, url1, url2, url3, url4, url5, url6, url7, url8, url9, id]);
              }
              _context23.next = 14;
              break;

            case 10:
              _context23.prev = 10;
              _context23.t0 = _context23['catch'](6);
              _didIteratorError6 = true;
              _iteratorError6 = _context23.t0;

            case 14:
              _context23.prev = 14;
              _context23.prev = 15;

              if (!_iteratorNormalCompletion6 && _iterator6.return) {
                _iterator6.return();
              }

            case 17:
              _context23.prev = 17;

              if (!_didIteratorError6) {
                _context23.next = 20;
                break;
              }

              throw _iteratorError6;

            case 20:
              return _context23.finish(17);

            case 21:
              return _context23.finish(14);

            case 22:
              _context23.next = 24;
              return mysql.query(MYSQL.SHOP, sql, arg);

            case 24:
              ctx.body = sheet[0];
              sheet[0].message = '更新成功!';

            case 26:
            case 'end':
              return _context23.stop();
          }
        }
      }, _callee23, undefined, [[6, 10, 14, 22], [15,, 17, 21]]);
    }));

    return function activeNinegridUprow(_x45, _x46) {
      return _ref23.apply(this, arguments);
    };
  }(),

  '/active/ninegrid/update': function () {
    var _ref24 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee24(ctx, next) {
      var _ctx$request$body7, id, aid, img1, url1, img2, url2, img3, url3, img4, url4, img5, url5, img6, url6, img7, url7, img8, url8, img9, url9, sql, arg;

      return _regenerator2.default.wrap(function _callee24$(_context24) {
        while (1) {
          switch (_context24.prev = _context24.next) {
            case 0:
              _ctx$request$body7 = ctx.request.body, id = _ctx$request$body7.id, aid = _ctx$request$body7.aid, img1 = _ctx$request$body7.img1, url1 = _ctx$request$body7.url1, img2 = _ctx$request$body7.img2, url2 = _ctx$request$body7.url2, img3 = _ctx$request$body7.img3, url3 = _ctx$request$body7.url3, img4 = _ctx$request$body7.img4, url4 = _ctx$request$body7.url4, img5 = _ctx$request$body7.img5, url5 = _ctx$request$body7.url5, img6 = _ctx$request$body7.img6, url6 = _ctx$request$body7.url6, img7 = _ctx$request$body7.img7, url7 = _ctx$request$body7.url7, img8 = _ctx$request$body7.img8, url8 = _ctx$request$body7.url8, img9 = _ctx$request$body7.img9, url9 = _ctx$request$body7.url9;
              sql = ['update active_ninegrid set aid=?, url1=?,img1=?, img2=?, url2=?, img3=?, url3=?, img4=?, url4=?, img5=?, url5=?, img6=?, url6=?, img7=?, url7=?, img8=?, url8=?, img9=?, url9=? where id=?'];
              arg = [aid, url1, img1, img2, url2, img3, url3, img4, url4, img5, url5, img6, url6, img7, url7, img8, url8, img9, url9, id];
              _context24.next = 5;
              return mysql.query(MYSQL.SHOP, sql, arg);

            case 5:
              ctx.body = sheet[0];

            case 6:
            case 'end':
              return _context24.stop();
          }
        }
      }, _callee24, undefined);
    }));

    return function activeNinegridUpdate(_x47, _x48) {
      return _ref24.apply(this, arguments);
    };
  }(),

  '/active/notice/update': function () {
    var _ref25 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee25(ctx, next) {
      var _ctx$request$body8, id, tittle, url, sql, arg;

      return _regenerator2.default.wrap(function _callee25$(_context25) {
        while (1) {
          switch (_context25.prev = _context25.next) {
            case 0:
              _ctx$request$body8 = ctx.request.body, id = _ctx$request$body8.id, tittle = _ctx$request$body8.tittle, url = _ctx$request$body8.url;
              sql = ['update active_notice set tittle=?, url=? where id=?'];
              arg = [tittle, url, id];
              _context25.next = 5;
              return mysql.query(MYSQL.SHOP, sql, arg);

            case 5:
              ctx.body = sheet[0];

            case 6:
            case 'end':
              return _context25.stop();
          }
        }
      }, _callee25, undefined);
    }));

    return function activeNoticeUpdate(_x49, _x50) {
      return _ref25.apply(this, arguments);
    };
  }(),

  '/search/recommend/uprow': function () {
    var _ref26 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee26(ctx, next) {
      var sql, arg, _iteratorNormalCompletion7, _didIteratorError7, _iteratorError7, _iterator7, _step7, item, keyword, sort, id;

      return _regenerator2.default.wrap(function _callee26$(_context26) {
        while (1) {
          switch (_context26.prev = _context26.next) {
            case 0:
              if (!_.isArray(ctx.request.body)) {
                ctx.request.body = [ctx.request.body];
              }
              sql = [];
              arg = [];
              _iteratorNormalCompletion7 = true;
              _didIteratorError7 = false;
              _iteratorError7 = undefined;
              _context26.prev = 6;

              for (_iterator7 = (0, _getIterator3.default)(ctx.request.body); !(_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done); _iteratorNormalCompletion7 = true) {
                item = _step7.value;
                keyword = item.keyword, sort = item.sort, id = item.id;

                sql.push('update search_recommend set keyword=?, sort=? where id=?');
                arg.push([keyword, sort, id]);
              }
              _context26.next = 14;
              break;

            case 10:
              _context26.prev = 10;
              _context26.t0 = _context26['catch'](6);
              _didIteratorError7 = true;
              _iteratorError7 = _context26.t0;

            case 14:
              _context26.prev = 14;
              _context26.prev = 15;

              if (!_iteratorNormalCompletion7 && _iterator7.return) {
                _iterator7.return();
              }

            case 17:
              _context26.prev = 17;

              if (!_didIteratorError7) {
                _context26.next = 20;
                break;
              }

              throw _iteratorError7;

            case 20:
              return _context26.finish(17);

            case 21:
              return _context26.finish(14);

            case 22:
              _context26.next = 24;
              return mysql.query(MYSQL.SHOP, sql, arg);

            case 24:
              ctx.body = sheet[0];
              sheet[0].message = '更新成功!';

            case 26:
            case 'end':
              return _context26.stop();
          }
        }
      }, _callee26, undefined, [[6, 10, 14, 22], [15,, 17, 21]]);
    }));

    return function searchRecommendUprow(_x51, _x52) {
      return _ref26.apply(this, arguments);
    };
  }()
};

exports.delete = {
  '/banner/remove/:ids': function () {
    var _ref27 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee27(ctx, next) {
      var ids, sql, arg;
      return _regenerator2.default.wrap(function _callee27$(_context27) {
        while (1) {
          switch (_context27.prev = _context27.next) {
            case 0:
              ids = ctx.params.ids;

              ids = ids.replace(/[|]/g, ',');
              sql = ['delete from banner where id in(' + ids + ')'];
              arg = null;
              _context27.next = 6;
              return mysql.query(MYSQL.SHOP, sql, arg);

            case 6:
              ctx.body = sheet[0];

            case 7:
            case 'end':
              return _context27.stop();
          }
        }
      }, _callee27, undefined);
    }));

    return function bannerRemoveIds(_x53, _x54) {
      return _ref27.apply(this, arguments);
    };
  }(),

  '/banner/middle/remove/:ids': function () {
    var _ref28 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee28(ctx, next) {
      var ids, sql, arg;
      return _regenerator2.default.wrap(function _callee28$(_context28) {
        while (1) {
          switch (_context28.prev = _context28.next) {
            case 0:
              ids = ctx.params.ids;

              ids = ids.replace(/[|]/g, ',');
              sql = ['delete from banner_middle where id in(' + ids + ')'];
              arg = null;
              _context28.next = 6;
              return mysql.query(MYSQL.SHOP, sql, arg);

            case 6:
              ctx.body = sheet[0];

            case 7:
            case 'end':
              return _context28.stop();
          }
        }
      }, _callee28, undefined);
    }));

    return function bannerMiddleRemoveIds(_x55, _x56) {
      return _ref28.apply(this, arguments);
    };
  }(),

  '/search/recommend/remove/:ids': function () {
    var _ref29 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee29(ctx, next) {
      var ids, sql, arg;
      return _regenerator2.default.wrap(function _callee29$(_context29) {
        while (1) {
          switch (_context29.prev = _context29.next) {
            case 0:
              ids = ctx.params.ids;

              ids = ids.replace(/[|]/g, ',');
              sql = ['delete from search_recommend where id in(' + ids + ')'];
              arg = null;
              _context29.next = 6;
              return mysql.query(MYSQL.SHOP, sql, arg);

            case 6:
              ctx.body = sheet[0];

            case 7:
            case 'end':
              return _context29.stop();
          }
        }
      }, _callee29, undefined);
    }));

    return function searchRecommendRemoveIds(_x57, _x58) {
      return _ref29.apply(this, arguments);
    };
  }()
};