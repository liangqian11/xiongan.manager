'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.get = {
  '/cultivate/list': function () {
    var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(ctx, next) {
      var where, arg, data, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, cultivate, sum;

      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              where = '';
              arg = [];

              if (ctx.get.type) {
                where = where == '' ? 'where type = ? ' : where + ' and type = ? ';
                arg.push(ctx.get.type);
              }
              if (ctx.get.name) {
                where = where == '' ? 'where name = ? ' : where + ' and name = ? ';
                arg.push(ctx.get.name);
              }
              _context.next = 6;
              return $.mysql.query($.conf.mysql.main, 'select * from cultivate ' + where, arg);

            case 6:
              data = _context.sent;
              _iteratorNormalCompletion = true;
              _didIteratorError = false;
              _iteratorError = undefined;
              _context.prev = 10;
              _iterator = (0, _getIterator3.default)(data);

            case 12:
              if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                _context.next = 22;
                break;
              }

              cultivate = _step.value;
              _context.next = 16;
              return $.mysql.query($.conf.mysql.main, 'select summary, merit from school_detail where culid = ?', [cultivate.id]);

            case 16:
              sum = _context.sent;

              cultivate.summary = sum.length == 0 ? '' : sum[0].summary;
              cultivate.merit = sum.length == 0 ? '' : sum[0].merit;

            case 19:
              _iteratorNormalCompletion = true;
              _context.next = 12;
              break;

            case 22:
              _context.next = 28;
              break;

            case 24:
              _context.prev = 24;
              _context.t0 = _context['catch'](10);
              _didIteratorError = true;
              _iteratorError = _context.t0;

            case 28:
              _context.prev = 28;
              _context.prev = 29;

              if (!_iteratorNormalCompletion && _iterator.return) {
                _iterator.return();
              }

            case 31:
              _context.prev = 31;

              if (!_didIteratorError) {
                _context.next = 34;
                break;
              }

              throw _iteratorError;

            case 34:
              return _context.finish(31);

            case 35:
              return _context.finish(28);

            case 36:
              ctx.result.ok.data = data;
              $.flush(ctx, ctx.result.ok);

            case 38:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, undefined, [[10, 24, 28, 36], [29,, 31, 35]]);
    }));

    return function cultivateList(_x, _x2) {
      return _ref.apply(this, arguments);
    };
  }(),

  '/cultivate/detail/:id': function () {
    var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(ctx, next) {
      var id, cultivate;
      return _regenerator2.default.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              id = ctx.params.id;
              _context2.next = 3;
              return $.mysql.query($.conf.mysql.main, 'select A.*,B.summary,B.merit from cultivate A,school_detail B where A.id = ? and A.id = B.culid ', [id]);

            case 3:
              cultivate = _context2.sent;

              ctx.result.ok.data = cultivate;
              $.flush(ctx, ctx.result.ok);

            case 6:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, undefined);
    }));

    return function cultivateDetailId(_x3, _x4) {
      return _ref2.apply(this, arguments);
    };
  }(),

  '/cultivate/swiper/list': function () {
    var _ref3 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3(ctx, next) {
      var where, arg, swiper;
      return _regenerator2.default.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              where = '';
              arg = [];

              if (ctx.get.culid) {
                where = where == '' ? 'where culid = ? ' : where + ' and culid = ?';
                arg.push(ctx.get.name);
              }
              _context3.next = 5;
              return $.mysql.query($.conf.mysql.main, 'select * from class_swiper' + where, arg);

            case 5:
              swiper = _context3.sent;

              ctx.result.ok.data = swiper;
              $.flush(ctx, ctx.result.ok);

            case 8:
            case 'end':
              return _context3.stop();
          }
        }
      }, _callee3, undefined);
    }));

    return function cultivateSwiperList(_x5, _x6) {
      return _ref3.apply(this, arguments);
    };
  }()
};

exports.post = {
  '/cultivate/add': function () {
    var _ref4 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee4(ctx, next) {
      var _ctx$post, name, address, class_starttime, apply_endtime, mobile, img, url, content, type, keyword, summary, merit, cultivate, sum;

      return _regenerator2.default.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _ctx$post = ctx.post, name = _ctx$post.name, address = _ctx$post.address, class_starttime = _ctx$post.class_starttime, apply_endtime = _ctx$post.apply_endtime, mobile = _ctx$post.mobile, img = _ctx$post.img, url = _ctx$post.url, content = _ctx$post.content, type = _ctx$post.type, keyword = _ctx$post.keyword, summary = _ctx$post.summary, merit = _ctx$post.merit;
              _context4.next = 3;
              return $.mysql.push($.conf.mysql.main, 'insert into cultivate (name, address, class_starttime, apply_endtime, mobile, img, url, content, type, keyword) values (?,?,?,?,?,?,?,?,?,?) ', [name, address, class_starttime, apply_endtime, mobile, img, url, content, type, keyword]);

            case 3:
              cultivate = _context4.sent;
              _context4.next = 6;
              return $.mysql.push($.conf.mysql.main, 'insert into school_detail (summary, merit, culid) values (?,?,?) ', [summary, merit, cultivate.insertId]);

            case 6:
              sum = _context4.sent;

              ctx.result.ok.data = cultivate;
              $.flush(ctx, ctx.result.ok);

            case 9:
            case 'end':
              return _context4.stop();
          }
        }
      }, _callee4, undefined);
    }));

    return function cultivateAdd(_x7, _x8) {
      return _ref4.apply(this, arguments);
    };
  }(),

  '/cultivate/swiper/add': function () {
    var _ref5 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee5(ctx, next) {
      var _ctx$post2, url, culid, data;

      return _regenerator2.default.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              _ctx$post2 = ctx.post, url = _ctx$post2.url, culid = _ctx$post2.culid;
              _context5.next = 3;
              return $.mysql.push($.conf.mysql.main, 'insert into class_swiper (url, culid) values (?,?) ', [url, culid]);

            case 3:
              data = _context5.sent;

              ctx.result.ok.data = data;
              $.flush(ctx, ctx.result.ok);

            case 6:
            case 'end':
              return _context5.stop();
          }
        }
      }, _callee5, undefined);
    }));

    return function cultivateSwiperAdd(_x9, _x10) {
      return _ref5.apply(this, arguments);
    };
  }()
};

exports.put = {
  '/cultivate/uprow': function () {
    var _ref6 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee6(ctx, next) {
      var sql, arg, _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, item, id, name, mobile, data;

      return _regenerator2.default.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              if (!(ctx.put instanceof Array)) {
                ctx.put = [ctx.put];
              }
              sql = [];
              arg = [];
              _iteratorNormalCompletion2 = true;
              _didIteratorError2 = false;
              _iteratorError2 = undefined;
              _context6.prev = 6;

              for (_iterator2 = (0, _getIterator3.default)(ctx.put); !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                item = _step2.value;
                id = item.id, name = item.name, mobile = item.mobile;

                sql.push('update cultivate set name=?, mobile=? where id=?');
                arg.push([name, mobile, id]);
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
              data = $.mysql.push($.conf.mysql.main, sql, arg);

              ctx.result.ok.data = data;
              $.flush(ctx, ctx.result.ok);

            case 25:
            case 'end':
              return _context6.stop();
          }
        }
      }, _callee6, undefined, [[6, 10, 14, 22], [15,, 17, 21]]);
    }));

    return function cultivateUprow(_x11, _x12) {
      return _ref6.apply(this, arguments);
    };
  }(),

  '/cultivate/edit': function () {
    var _ref7 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee7(ctx, next) {
      var _ctx$put, id, name, address, class_starttime, apply_endtime, mobile, img, url, content, type, keyword, summary, merit, data;

      return _regenerator2.default.wrap(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              _ctx$put = ctx.put, id = _ctx$put.id, name = _ctx$put.name, address = _ctx$put.address, class_starttime = _ctx$put.class_starttime, apply_endtime = _ctx$put.apply_endtime, mobile = _ctx$put.mobile, img = _ctx$put.img, url = _ctx$put.url, content = _ctx$put.content, type = _ctx$put.type, keyword = _ctx$put.keyword, summary = _ctx$put.summary, merit = _ctx$put.merit;
              _context7.next = 3;
              return $.mysql.push($.conf.mysql.main, ['update cultivate set name = ?, address = ?, class_starttime = ?, apply_endtime = ?, mobile = ?, img = ?, url = ?, content = ?, type = ?, keyword = ? where id = ?', 'update school_detail set summary = ?, merit = ? where culid = ?'], [[name, address, class_starttime, apply_endtime, mobile, img, url, content, type, keyword, id], [summary, merit, id]]);

            case 3:
              data = _context7.sent;

              ctx.result.ok.data = data;
              $.flush(ctx, ctx.result.ok);

            case 6:
            case 'end':
              return _context7.stop();
          }
        }
      }, _callee7, undefined);
    }));

    return function cultivateEdit(_x13, _x14) {
      return _ref7.apply(this, arguments);
    };
  }()
};

exports.delete = {
  '/cultivate/delete/:id': function () {
    var _ref8 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee8(ctx, next) {
      var id, data;
      return _regenerator2.default.wrap(function _callee8$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              id = ctx.params.id;
              _context8.next = 3;
              return $.mysql.push($.conf.mysql.main, ['delete from cultivate where id =?', 'delete from school_detail where culid =?', 'delete from class_swiper where culid =?'], [[id], [id], [id]]);

            case 3:
              data = _context8.sent;

              ctx.result.ok.data = data;
              $.flush(ctx, ctx.result.ok);

            case 6:
            case 'end':
              return _context8.stop();
          }
        }
      }, _callee8, undefined);
    }));

    return function cultivateDeleteId(_x15, _x16) {
      return _ref8.apply(this, arguments);
    };
  }(),

  '/cultivate/swiper/delete/:id': function () {
    var _ref9 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee9(ctx, next) {
      var id, data;
      return _regenerator2.default.wrap(function _callee9$(_context9) {
        while (1) {
          switch (_context9.prev = _context9.next) {
            case 0:
              id = ctx.params.id;
              _context9.next = 3;
              return $.mysql.push($.conf.mysql.main, 'delete from class_swiper where id =?', [id]);

            case 3:
              data = _context9.sent;

              ctx.result.ok.data = data;
              $.flush(ctx, ctx.result.ok);

            case 6:
            case 'end':
              return _context9.stop();
          }
        }
      }, _callee9, undefined);
    }));

    return function cultivateSwiperDeleteId(_x17, _x18) {
      return _ref9.apply(this, arguments);
    };
  }()
};