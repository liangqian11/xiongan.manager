'use strict';

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _ = require('lodash');
exports.get = {
  '/area/list': function () {
    var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(ctx, next) {
      var area;
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return $.mysql.query($.conf.mysql.main, 'select * from area', [null]);

            case 2:
              area = _context.sent;

              ctx.result.ok.data = area;
              $.flush(ctx, ctx.result.ok);

            case 5:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, undefined);
    }));

    return function areaList(_x, _x2) {
      return _ref.apply(this, arguments);
    };
  }(),

  '/swiper/list': function () {
    var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(ctx, next) {
      var swiper;
      return _regenerator2.default.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return $.mysql.query($.conf.mysql.main, 'select * from swiper', [null]);

            case 2:
              swiper = _context2.sent;

              ctx.result.ok.data = swiper;
              $.flush(ctx, ctx.result.ok);

            case 5:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, undefined);
    }));

    return function swiperList(_x3, _x4) {
      return _ref2.apply(this, arguments);
    };
  }(),

  '/user/login/:username/:password': function () {
    var _ref3 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3(ctx, next) {
      var username, password, data;
      return _regenerator2.default.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              username = ctx.params.username;
              password = ctx.params.password;
              _context3.next = 4;
              return $.mysql.query($.conf.mysql.main, 'select * from admin where username=? and password=? ', [username, password]);

            case 4:
              data = _context3.sent;

              if (data.length > 0) {
                ctx.result.ok.data = data;
                $.flush(ctx, ctx.result.ok);
              } else {
                ctx.result.e4001.errmsg = '账号或密码错误';
                $.flush(ctx, ctx.result.e4001);
              }

            case 6:
            case 'end':
              return _context3.stop();
          }
        }
      }, _callee3, undefined);
    }));

    return function userLoginUsernamePassword(_x5, _x6) {
      return _ref3.apply(this, arguments);
    };
  }()
};

exports.post = {
  '/add/area': function () {
    var _ref4 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee4(ctx, next) {
      var name, data;
      return _regenerator2.default.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              name = ctx.post.name;
              _context4.next = 3;
              return $.mysql.push($.conf.mysql.main, 'insert into area (name) values (?) ', [name]);

            case 3:
              data = _context4.sent;

              ctx.result.ok.data = data;
              $.flush(ctx, ctx.result.ok);

            case 6:
            case 'end':
              return _context4.stop();
          }
        }
      }, _callee4, undefined);
    }));

    return function addArea(_x7, _x8) {
      return _ref4.apply(this, arguments);
    };
  }(),

  '/add/swiper': function () {
    var _ref5 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee5(ctx, next) {
      var _ctx$post, url, sort, data;

      return _regenerator2.default.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              _ctx$post = ctx.post, url = _ctx$post.url, sort = _ctx$post.sort;
              _context5.next = 3;
              return $.mysql.push($.conf.mysql.main, 'insert into swiper (url,sort) values (?,?) ', [url, sort]);

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

    return function addSwiper(_x9, _x10) {
      return _ref5.apply(this, arguments);
    };
  }()
};

exports.put = {
  '/edit/area': function () {
    var _ref6 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee6(ctx, next) {
      var _ctx$put, name, id, data;

      return _regenerator2.default.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              _ctx$put = ctx.put, name = _ctx$put.name, id = _ctx$put.id;
              _context6.next = 3;
              return $.mysql.push($.conf.mysql.main, 'update area set name=? where id =?', [name, id]);

            case 3:
              data = _context6.sent;

              ctx.result.ok.data = data;
              $.flush(ctx, ctx.result.ok);

            case 6:
            case 'end':
              return _context6.stop();
          }
        }
      }, _callee6, undefined);
    }));

    return function editArea(_x11, _x12) {
      return _ref6.apply(this, arguments);
    };
  }(),

  '/edit/swiper': function () {
    var _ref7 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee7(ctx, next) {
      var _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, item;

      return _regenerator2.default.wrap(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              if (!_.isArray(ctx.put)) {
                ctx.put = [ctx.put];
              }
              _iteratorNormalCompletion = true;
              _didIteratorError = false;
              _iteratorError = undefined;
              _context7.prev = 4;
              _iterator = (0, _getIterator3.default)(ctx.put);

            case 6:
              if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                _context7.next = 14;
                break;
              }

              item = _step.value;

              console.log(item.id);
              _context7.next = 11;
              return $.mysql.push($.conf.mysql.main, 'update swiper set sort=?,url=? where id =?', [item.sort, item.url, item.id]);

            case 11:
              _iteratorNormalCompletion = true;
              _context7.next = 6;
              break;

            case 14:
              _context7.next = 20;
              break;

            case 16:
              _context7.prev = 16;
              _context7.t0 = _context7['catch'](4);
              _didIteratorError = true;
              _iteratorError = _context7.t0;

            case 20:
              _context7.prev = 20;
              _context7.prev = 21;

              if (!_iteratorNormalCompletion && _iterator.return) {
                _iterator.return();
              }

            case 23:
              _context7.prev = 23;

              if (!_didIteratorError) {
                _context7.next = 26;
                break;
              }

              throw _iteratorError;

            case 26:
              return _context7.finish(23);

            case 27:
              return _context7.finish(20);

            case 28:
              $.flush(ctx, ctx.result.ok);

            case 29:
            case 'end':
              return _context7.stop();
          }
        }
      }, _callee7, undefined, [[4, 16, 20, 28], [21,, 23, 27]]);
    }));

    return function editSwiper(_x13, _x14) {
      return _ref7.apply(this, arguments);
    };
  }()

};

exports.delete = {
  '/delete/swiper': function () {
    var _ref8 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee8(ctx, next) {
      var id, data;
      return _regenerator2.default.wrap(function _callee8$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              id = ctx.delete;
              _context8.next = 3;
              return $.mysql.push($.conf.mysql.main, 'delete from swiper where id =? ', [id]);

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

    return function deleteSwiper(_x15, _x16) {
      return _ref8.apply(this, arguments);
    };
  }()
};