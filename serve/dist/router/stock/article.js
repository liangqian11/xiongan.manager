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

exports.get = {
  '/article/list': function () {
    var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(ctx, next) {
      var arg, where, sql, data;
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              arg = [];
              where = '';

              if (ctx.query.bid) {
                where = where == '' ? ' where bid = ?' : where + ' and bid = ?';
                arg.push(ctx.query.bid);
              }
              if (ctx.query.sid) {
                where = where == '' ? ' where sid = ?' : where + ' and sid = ?';
                arg.push(ctx.query.sid);
              }
              if (ctx.query.name) {
                where = where == '' ? ' where name like "%' + ctx.query.name + '%"' : where + ' and name like "%' + ctx.query.name + '%"';
              }
              if (ctx.query.wid) {
                where = where == '' ? ' where wid = ?' : where + ' and wid = ?';
                arg.push(ctx.query.wid);
              }
              if (ctx.query.page) {
                limit = ' limit ' + (ctx.query.page - 1) * 10 + ',10';
              }
              sql = ['select * from article' + where + ' order by sort '];
              _context.next = 10;
              return mysql.query(MYSQL.STOCK, sql, arg);

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

    return function articleList(_x, _x2) {
      return _ref.apply(this, arguments);
    };
  }(),

  '/income': function () {
    var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(ctx, next) {
      var where, arg, depositdata, pricedata, depositprice, i, buyprice, _i, data;

      return _regenerator2.default.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              where = '';
              arg = [];

              if (ctx.query.timestart) {
                where = where == '' ? ' buy_time>= ?' : where + ' and buy_time>= ?';
                arg.push(ctx.query.timestart);
              }
              if (ctx.query.timeend) {
                where = where == '' ? ' buy_time<= ?' : where + ' and buy_time<= ?';
                arg.push(ctx.query.timeend);
              }
              _context2.next = 6;
              return mysql.query(MYSQL.STOCK, ['select * from deposit where ' + where], arg);

            case 6:
              depositdata = _context2.sent;
              _context2.next = 9;
              return mysql.query(MYSQL.STOCK, ['select * from buy_item where pay =1 and' + where], arg);

            case 9:
              pricedata = _context2.sent;
              depositprice = 0;

              for (i in depositdata[0]) {
                depositprice = depositdata[0][i].price + depositprice;
              }
              buyprice = 0;

              for (_i in pricedata[0]) {
                buyprice = pricedata[0][_i].price + buyprice;
              }
              data = {};

              data.buy = buyprice;
              data.vip = depositprice;
              sheet[0].data = data;
              ctx.body = sheet[0];

            case 19:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, undefined);
    }));

    return function income(_x3, _x4) {
      return _ref2.apply(this, arguments);
    };
  }(),

  '/article/examine/list': function () {
    var _ref3 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3(ctx, next) {
      var arg, where, sql, data;
      return _regenerator2.default.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              arg = [];
              where = ' where examine = 1 ';

              if (ctx.query.bid) {
                where = where == '' ? ' where bid = ?' : where + ' and bid = ?';
                arg.push(ctx.query.bid);
              }
              if (ctx.query.sid) {
                where = where == '' ? ' where sid = ?' : where + ' and sid = ?';
                arg.push(ctx.query.sid);
              }
              if (ctx.query.name) {
                where = where == '' ? ' where name like "%' + ctx.query.name + '%"' : where + ' and name like "%' + ctx.query.name + '%"';
              }
              if (ctx.query.wid) {
                where = where == '' ? ' where wid = ?' : where + ' and wid = ?';
                arg.push(ctx.query.wid);
              }
              if (ctx.query.page) {
                limit = ' limit ' + (ctx.query.page - 1) * 10 + ',10';
              }
              sql = ['select * from article' + where + ' order by sort '];
              _context3.next = 10;
              return mysql.query(MYSQL.STOCK, sql, arg);

            case 10:
              data = _context3.sent;

              sheet[0].data = data[0];
              ctx.body = sheet[0];

            case 13:
            case 'end':
              return _context3.stop();
          }
        }
      }, _callee3, undefined);
    }));

    return function articleExamineList(_x5, _x6) {
      return _ref3.apply(this, arguments);
    };
  }(),

  '/list/examine': function () {
    var _ref4 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee4(ctx, next) {
      var datas, item, i;
      return _regenerator2.default.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.next = 2;
              return mysql.query(MYSQL.STOCK, ['SELECT A.*, (select count(*) from article_item where aid=A.id and examine=0) as unchecked FROM article A order by A.id desc'], [null]);

            case 2:
              datas = _context4.sent;
              item = [];

              for (i in datas[0]) {
                if (datas[0][i].examine == 0 || datas[0][i].unchecked > 0) {
                  item.push(datas[0][i]);
                }
              }
              sheet[0].data = item;
              ctx.body = sheet[0];

            case 7:
            case 'end':
              return _context4.stop();
          }
        }
      }, _callee4, undefined);
    }));

    return function listExamine(_x7, _x8) {
      return _ref4.apply(this, arguments);
    };
  }(),

  '/item/detail/:id': function () {
    var _ref5 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee5(ctx, next) {
      var id, sql, arg, data;
      return _regenerator2.default.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              id = ctx.params.id;
              sql = ['select * from article where id=?', 'select * from article_item where aid=?', 'select * from manager where id=(select wid from article where id=?)'];
              arg = [[id], [id], [id]];
              _context5.next = 5;
              return mysql.query(MYSQL.STOCK, sql, arg);

            case 5:
              data = _context5.sent;

              sheet[0].data = [data[0][0], data[1], data[2][0]];
              ctx.body = sheet[0];

            case 8:
            case 'end':
              return _context5.stop();
          }
        }
      }, _callee5, undefined);
    }));

    return function itemDetailId(_x9, _x10) {
      return _ref5.apply(this, arguments);
    };
  }(),

  '/article/cat/list': function () {
    var _ref6 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee6(ctx, next) {
      var arg, where, sql, data;
      return _regenerator2.default.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              arg = [];
              where = '';

              if (ctx.query.fid) {
                arg = [ctx.query.fid];
                where = ' where fid=? ';
              }
              sql = ['select * from category ' + where + ' order by sort '];
              _context6.next = 6;
              return mysql.query(MYSQL.STOCK, sql, arg);

            case 6:
              data = _context6.sent;

              sheet[0].data = data[0];
              ctx.body = sheet[0];

            case 9:
            case 'end':
              return _context6.stop();
          }
        }
      }, _callee6, undefined);
    }));

    return function articleCatList(_x11, _x12) {
      return _ref6.apply(this, arguments);
    };
  }(),

  '/article/bigcat/list': function () {
    var _ref7 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee7(ctx, next) {
      var sql, arg, data;
      return _regenerator2.default.wrap(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              sql = ['select * from category where fid=0 order by sort '];
              arg = null;
              _context7.next = 4;
              return mysql.query(MYSQL.STOCK, sql, arg);

            case 4:
              data = _context7.sent;

              sheet[0].data = data[0];
              ctx.body = sheet[0];

            case 7:
            case 'end':
              return _context7.stop();
          }
        }
      }, _callee7, undefined);
    }));

    return function articleBigcatList(_x13, _x14) {
      return _ref7.apply(this, arguments);
    };
  }(),

  '/article/smallcat/list/:fid': function () {
    var _ref8 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee8(ctx, next) {
      var sql, arg, data;
      return _regenerator2.default.wrap(function _callee8$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              sql = ['select * from category where fid=? order by sort '];
              arg = [ctx.params.fid];
              _context8.next = 4;
              return mysql.query(MYSQL.STOCK, sql, arg);

            case 4:
              data = _context8.sent;

              sheet[0].data = data[0];
              ctx.body = sheet[0];

            case 7:
            case 'end':
              return _context8.stop();
          }
        }
      }, _callee8, undefined);
    }));

    return function articleSmallcatListFid(_x15, _x16) {
      return _ref8.apply(this, arguments);
    };
  }(),

  '/article/detail/:id': function () {
    var _ref9 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee9(ctx, next) {
      var aid, sql, arg, data;
      return _regenerator2.default.wrap(function _callee9$(_context9) {
        while (1) {
          switch (_context9.prev = _context9.next) {
            case 0:
              aid = ctx.params.id;
              sql = ['select * from article where id=?', 'select * from article_item where aid=?'];
              arg = [[aid], [aid]];
              _context9.next = 5;
              return mysql.query(MYSQL.STOCK, sql, arg);

            case 5:
              data = _context9.sent;

              sheet[0].data = data;
              ctx.body = sheet[0];

            case 8:
            case 'end':
              return _context9.stop();
          }
        }
      }, _callee9, undefined);
    }));

    return function articleDetailId(_x17, _x18) {
      return _ref9.apply(this, arguments);
    };
  }(),

  '/article/loss': function () {
    var _ref10 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee10(ctx, next) {
      var sql, arg, data;
      return _regenerator2.default.wrap(function _callee10$(_context10) {
        while (1) {
          switch (_context10.prev = _context10.next) {
            case 0:
              sql = ['select * from article where type=1 and examine=1'];
              arg = null;
              _context10.next = 4;
              return mysql.query(MYSQL.STOCK, sql, arg);

            case 4:
              data = _context10.sent;

              sheet[0].data = data[0];
              ctx.body = sheet[0];

            case 7:
            case 'end':
              return _context10.stop();
          }
        }
      }, _callee10, undefined);
    }));

    return function articleLoss(_x19, _x20) {
      return _ref10.apply(this, arguments);
    };
  }(),

  '/stock/swiper/list': function () {
    var _ref11 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee11(ctx, next) {
      var sql, data;
      return _regenerator2.default.wrap(function _callee11$(_context11) {
        while (1) {
          switch (_context11.prev = _context11.next) {
            case 0:
              sql = ['select * from swiper '];
              _context11.next = 3;
              return mysql.query(MYSQL.STOCK, sql, null);

            case 3:
              data = _context11.sent;

              sheet[0].data = data[0];
              ctx.body = sheet[0];

            case 6:
            case 'end':
              return _context11.stop();
          }
        }
      }, _callee11, undefined);
    }));

    return function stockSwiperList(_x21, _x22) {
      return _ref11.apply(this, arguments);
    };
  }(),

  '/stock/company/list': function () {
    var _ref12 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee12(ctx, next) {
      var sql, data;
      return _regenerator2.default.wrap(function _callee12$(_context12) {
        while (1) {
          switch (_context12.prev = _context12.next) {
            case 0:
              sql = ['select * from company '];
              _context12.next = 3;
              return mysql.query(MYSQL.STOCK, sql, null);

            case 3:
              data = _context12.sent;

              sheet[0].data = data[0];
              ctx.body = sheet[0];

            case 6:
            case 'end':
              return _context12.stop();
          }
        }
      }, _callee12, undefined);
    }));

    return function stockCompanyList(_x23, _x24) {
      return _ref12.apply(this, arguments);
    };
  }()
};

exports.put = {
  '/article/examine/:id': function () {
    var _ref13 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee13(ctx, next) {
      var id, examine, sql, arg, result;
      return _regenerator2.default.wrap(function _callee13$(_context13) {
        while (1) {
          switch (_context13.prev = _context13.next) {
            case 0:
              id = ctx.params.id;
              examine = ctx.request.body.examine;
              sql = ['update article set examine=? where id=?'];
              arg = [examine, id];
              _context13.next = 6;
              return mysql.query(MYSQL.STOCK, sql, arg);

            case 6:
              result = _context13.sent;

              ctx.body = sheet[0];

            case 8:
            case 'end':
              return _context13.stop();
          }
        }
      }, _callee13, undefined);
    }));

    return function articleExamineId(_x25, _x26) {
      return _ref13.apply(this, arguments);
    };
  }(),

  '/article_item/examine/:id': function () {
    var _ref14 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee14(ctx, next) {
      var id, examine, sql, arg, result;
      return _regenerator2.default.wrap(function _callee14$(_context14) {
        while (1) {
          switch (_context14.prev = _context14.next) {
            case 0:
              id = ctx.params.id;
              examine = ctx.request.body.examine;
              sql = ['update article_item set examine=? where id=?'];
              arg = [examine, id];
              _context14.next = 6;
              return mysql.query(MYSQL.STOCK, sql, arg);

            case 6:
              result = _context14.sent;

              ctx.body = sheet[0];

            case 8:
            case 'end':
              return _context14.stop();
          }
        }
      }, _callee14, undefined);
    }));

    return function article_itemExamineId(_x27, _x28) {
      return _ref14.apply(this, arguments);
    };
  }(),

  '/stock/swiper/update': function () {
    var _ref15 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee15(ctx, next) {
      var _ctx$request$body, img, sort, url, id, sql, data;

      return _regenerator2.default.wrap(function _callee15$(_context15) {
        while (1) {
          switch (_context15.prev = _context15.next) {
            case 0:
              _ctx$request$body = ctx.request.body, img = _ctx$request$body.img, sort = _ctx$request$body.sort, url = _ctx$request$body.url, id = _ctx$request$body.id;
              sql = ['update swiper set img=?,sort=?,url=? where id=? '];
              _context15.next = 4;
              return mysql.query(MYSQL.STOCK, sql, [img, sort, url, id]);

            case 4:
              data = _context15.sent;

              sheet[0].data = data[0];
              ctx.body = sheet[0];

            case 7:
            case 'end':
              return _context15.stop();
          }
        }
      }, _callee15, undefined);
    }));

    return function stockSwiperUpdate(_x29, _x30) {
      return _ref15.apply(this, arguments);
    };
  }(),

  '/stock/conpany/update': function () {
    var _ref16 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee16(ctx, next) {
      var _ctx$request$body2, id, name, adviser, address, number, img, sort, sql, data;

      return _regenerator2.default.wrap(function _callee16$(_context16) {
        while (1) {
          switch (_context16.prev = _context16.next) {
            case 0:
              _ctx$request$body2 = ctx.request.body, id = _ctx$request$body2.id, name = _ctx$request$body2.name, adviser = _ctx$request$body2.adviser, address = _ctx$request$body2.address, number = _ctx$request$body2.number, img = _ctx$request$body2.img, sort = _ctx$request$body2.sort;
              sql = ['update company set name=?,adviser=?,address=?,number=?,img=?,sort=? where id=? '];
              _context16.next = 4;
              return mysql.query(MYSQL.STOCK, sql, [name, adviser, address, number, img, sort, id]);

            case 4:
              data = _context16.sent;

              sheet[0].data = data[0];
              ctx.body = sheet[0];

            case 7:
            case 'end':
              return _context16.stop();
          }
        }
      }, _callee16, undefined);
    }));

    return function stockConpanyUpdate(_x31, _x32) {
      return _ref16.apply(this, arguments);
    };
  }(),

  '/cat/eidt': function () {
    var _ref17 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee17(ctx, next) {
      var _ctx$request$body3, id, fid, name, sort, sql, arg, result;

      return _regenerator2.default.wrap(function _callee17$(_context17) {
        while (1) {
          switch (_context17.prev = _context17.next) {
            case 0:
              _ctx$request$body3 = ctx.request.body, id = _ctx$request$body3.id, fid = _ctx$request$body3.fid, name = _ctx$request$body3.name, sort = _ctx$request$body3.sort;
              sql = ['update category set fid=?, name=?, sort=? where id=?'];
              arg = [fid, name, sort, id];
              _context17.next = 5;
              return mysql.query(MYSQL.STOCK, sql, arg);

            case 5:
              result = _context17.sent;

              ctx.body = sheet[0];

            case 7:
            case 'end':
              return _context17.stop();
          }
        }
      }, _callee17, undefined);
    }));

    return function catEidt(_x33, _x34) {
      return _ref17.apply(this, arguments);
    };
  }(),

  '/cat/uprow': function () {
    var _ref18 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee18(ctx, next) {
      var _ctx$request$body4, id, name, sort, sql, arg, result;

      return _regenerator2.default.wrap(function _callee18$(_context18) {
        while (1) {
          switch (_context18.prev = _context18.next) {
            case 0:
              _ctx$request$body4 = ctx.request.body, id = _ctx$request$body4.id, name = _ctx$request$body4.name, sort = _ctx$request$body4.sort;
              sql = ['update category set name=?, sort=? where id=?'];
              arg = [name, sort, id];
              _context18.next = 5;
              return mysql.query(MYSQL.STOCK, sql, arg);

            case 5:
              result = _context18.sent;

              ctx.body = sheet[0];

            case 7:
            case 'end':
              return _context18.stop();
          }
        }
      }, _callee18, undefined);
    }));

    return function catUprow(_x35, _x36) {
      return _ref18.apply(this, arguments);
    };
  }(),

  '/article/type/:id': function () {
    var _ref19 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee19(ctx, next) {
      var id, type, isdone, sql, arg, result;
      return _regenerator2.default.wrap(function _callee19$(_context19) {
        while (1) {
          switch (_context19.prev = _context19.next) {
            case 0:
              id = ctx.params.id;
              type = ctx.request.body.type;
              _context19.next = 4;
              return mysql.query(MYSQL.STOCK, ['select type from article where id=?'], [id]);

            case 4:
              isdone = _context19.sent;

              if (!(isdone[0][0].type > 0)) {
                _context19.next = 9;
                break;
              }

              sheet[0].message = '此文章已经定义状态,不能重复操作';
              ctx.body = sheet[0];
              return _context19.abrupt('return');

            case 9:
              sql = ['update article set type=? where id=?'];
              arg = [type, id];
              _context19.next = 13;
              return mysql.query(MYSQL.STOCK, sql, arg);

            case 13:
              result = _context19.sent;

              sheet[0].message = '';
              ctx.body = sheet[0];

            case 16:
            case 'end':
              return _context19.stop();
          }
        }
      }, _callee19, undefined);
    }));

    return function articleTypeId(_x37, _x38) {
      return _ref19.apply(this, arguments);
    };
  }()
};

exports.post = {
  '/article/add': function () {
    var _ref20 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee20(ctx, next) {
      var time, _ctx$request$body5, bid, sid, stock_code, img, name, wid, price, content, sort, sql, arg, result;

      return _regenerator2.default.wrap(function _callee20$(_context20) {
        while (1) {
          switch (_context20.prev = _context20.next) {
            case 0:
              time = _.now().toString().substr(0, 10);
              _ctx$request$body5 = ctx.request.body, bid = _ctx$request$body5.bid, sid = _ctx$request$body5.sid, stock_code = _ctx$request$body5.stock_code, img = _ctx$request$body5.img, name = _ctx$request$body5.name, wid = _ctx$request$body5.wid, price = _ctx$request$body5.price, content = _ctx$request$body5.content, sort = _ctx$request$body5.sort;
              sql = ['insert into article (bid, sid, stock_code, img, name, wid, price, content, time, sort) values(?,?,?,?,?,?,?,?,?,?)'];
              arg = [bid, sid, stock_code, img, name, wid, price, content, time, sort];
              _context20.next = 6;
              return mysql.query(MYSQL.STOCK, sql, arg);

            case 6:
              result = _context20.sent;

              ctx.body = sheet[0];

            case 8:
            case 'end':
              return _context20.stop();
          }
        }
      }, _callee20, undefined);
    }));

    return function articleAdd(_x39, _x40) {
      return _ref20.apply(this, arguments);
    };
  }(),

  '/cat/add': function () {
    var _ref21 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee21(ctx, next) {
      var _ctx$request$body6, fid, name, sort, sql, arg, result;

      return _regenerator2.default.wrap(function _callee21$(_context21) {
        while (1) {
          switch (_context21.prev = _context21.next) {
            case 0:
              _ctx$request$body6 = ctx.request.body, fid = _ctx$request$body6.fid, name = _ctx$request$body6.name, sort = _ctx$request$body6.sort;
              sql = ['insert into category (fid, name, sort) values(?,?,?)'];
              arg = [fid, name, sort];
              _context21.next = 5;
              return mysql.query(MYSQL.STOCK, sql, arg);

            case 5:
              result = _context21.sent;

              ctx.body = sheet[0];

            case 7:
            case 'end':
              return _context21.stop();
          }
        }
      }, _callee21, undefined);
    }));

    return function catAdd(_x41, _x42) {
      return _ref21.apply(this, arguments);
    };
  }(),

  '/article_item/add': function () {
    var _ref22 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee22(ctx, next) {
      var time, _ctx$request$body7, aid, img, content, sql, arg, result;

      return _regenerator2.default.wrap(function _callee22$(_context22) {
        while (1) {
          switch (_context22.prev = _context22.next) {
            case 0:
              time = _.now().toString().substr(0, 10);
              _ctx$request$body7 = ctx.request.body, aid = _ctx$request$body7.aid, img = _ctx$request$body7.img, content = _ctx$request$body7.content;
              sql = ['insert into article_item (aid, time, img, content) values(?,?,?,?)'];
              arg = [aid, time, img, content];
              _context22.next = 6;
              return mysql.query(MYSQL.STOCK, sql, arg);

            case 6:
              result = _context22.sent;

              ctx.body = sheet[0];

            case 8:
            case 'end':
              return _context22.stop();
          }
        }
      }, _callee22, undefined);
    }));

    return function article_itemAdd(_x43, _x44) {
      return _ref22.apply(this, arguments);
    };
  }(),

  '/stock/swiper/add': function () {
    var _ref23 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee23(ctx, next) {
      var _ctx$request$body8, img, sort, url, sql, data;

      return _regenerator2.default.wrap(function _callee23$(_context23) {
        while (1) {
          switch (_context23.prev = _context23.next) {
            case 0:
              _ctx$request$body8 = ctx.request.body, img = _ctx$request$body8.img, sort = _ctx$request$body8.sort, url = _ctx$request$body8.url;
              sql = ['insert into swiper (img,sort,url) values (?,?,?) '];
              _context23.next = 4;
              return mysql.query(MYSQL.STOCK, sql, [img, sort, url]);

            case 4:
              data = _context23.sent;

              sheet[0].data = data[0];
              ctx.body = sheet[0];

            case 7:
            case 'end':
              return _context23.stop();
          }
        }
      }, _callee23, undefined);
    }));

    return function stockSwiperAdd(_x45, _x46) {
      return _ref23.apply(this, arguments);
    };
  }(),

  '/stock/company/add': function () {
    var _ref24 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee24(ctx, next) {
      var _ctx$request$body9, name, adviser, address, number, img, sort, sql, data;

      return _regenerator2.default.wrap(function _callee24$(_context24) {
        while (1) {
          switch (_context24.prev = _context24.next) {
            case 0:
              _ctx$request$body9 = ctx.request.body, name = _ctx$request$body9.name, adviser = _ctx$request$body9.adviser, address = _ctx$request$body9.address, number = _ctx$request$body9.number, img = _ctx$request$body9.img, sort = _ctx$request$body9.sort;
              sql = ['insert into company ( name,adviser,address,number,img,sort) values (?,?,?,?,?,?) '];
              _context24.next = 4;
              return mysql.query(MYSQL.STOCK, sql, [name, adviser, address, number, img, sort]);

            case 4:
              data = _context24.sent;

              sheet[0].data = data[0];
              ctx.body = sheet[0];

            case 7:
            case 'end':
              return _context24.stop();
          }
        }
      }, _callee24, undefined);
    }));

    return function stockCompanyAdd(_x47, _x48) {
      return _ref24.apply(this, arguments);
    };
  }()
};
exports.delete = {
  '/stock/swiper/del/:id': function () {
    var _ref25 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee25(ctx, next) {
      var sql, data;
      return _regenerator2.default.wrap(function _callee25$(_context25) {
        while (1) {
          switch (_context25.prev = _context25.next) {
            case 0:
              sql = ['delete  from swiper where id=?'];
              _context25.next = 3;
              return mysql.query(MYSQL.STOCK, sql, [ctx.params.id]);

            case 3:
              data = _context25.sent;

              sheet[0].data = data[0];
              ctx.body = sheet[0];

            case 6:
            case 'end':
              return _context25.stop();
          }
        }
      }, _callee25, undefined);
    }));

    return function stockSwiperDelId(_x49, _x50) {
      return _ref25.apply(this, arguments);
    };
  }(),

  '/stock/company/del/:id': function () {
    var _ref26 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee26(ctx, next) {
      var sql, data;
      return _regenerator2.default.wrap(function _callee26$(_context26) {
        while (1) {
          switch (_context26.prev = _context26.next) {
            case 0:
              sql = ['delete  from company where id=?'];
              _context26.next = 3;
              return mysql.query(MYSQL.STOCK, sql, [ctx.params.id]);

            case 3:
              data = _context26.sent;

              sheet[0].data = data[0];
              ctx.body = sheet[0];

            case 6:
            case 'end':
              return _context26.stop();
          }
        }
      }, _callee26, undefined);
    }));

    return function stockCompanyDelId(_x51, _x52) {
      return _ref26.apply(this, arguments);
    };
  }(),

  '/cat/del/:id': function () {
    var _ref27 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee27(ctx, next) {
      var id, article, sql, arg, result;
      return _regenerator2.default.wrap(function _callee27$(_context27) {
        while (1) {
          switch (_context27.prev = _context27.next) {
            case 0:
              id = ctx.params.body;
              _context27.next = 3;
              return mysql.query(MYSQL.STOCK, ['select * from article where bid=? or sid=?'], [id, id]);

            case 3:
              article = _context27.sent;

              if (!(article[0].length == 0)) {
                _context27.next = 13;
                break;
              }

              sql = ['delete from category where id=?'];
              arg = [id];
              _context27.next = 9;
              return mysql.query(MYSQL.STOCK, sql, arg);

            case 9:
              result = _context27.sent;

              ctx.body = sheet[0];
              _context27.next = 16;
              break;

            case 13:
              sheet[20002].message = '该类别下有文章不允许删除';
              ctx.body = sheet[20002];
              return _context27.abrupt('return');

            case 16:
            case 'end':
              return _context27.stop();
          }
        }
      }, _callee27, undefined);
    }));

    return function catDelId(_x53, _x54) {
      return _ref27.apply(this, arguments);
    };
  }()
};