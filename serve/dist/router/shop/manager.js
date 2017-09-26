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
  '/manager/all': function () {
    var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(ctx, next) {
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              sheet[0].data = ctx.manager;
              ctx.body = sheet[0];

            case 2:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, undefined);
    }));

    return function managerAll(_x, _x2) {
      return _ref.apply(this, arguments);
    };
  }(),

  '/manager/list': function () {
    var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(ctx, next) {
      var arg, where, data;
      return _regenerator2.default.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              arg = [];
              where = '';

              if (ctx.query.name) {
                where = ' where name like "%' + ctx.query.name + '%"';
                arg.push(ctx.query.name);
              }
              _context2.next = 5;
              return mysql.query(MYSQL.LIMIT, ['select * from admin' + where], arg);

            case 5:
              data = _context2.sent;

              sheet[0].data = data[0];
              ctx.body = sheet[0];

            case 8:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, undefined);
    }));

    return function managerList(_x3, _x4) {
      return _ref2.apply(this, arguments);
    };
  }(),

  '/menu/list': function () {
    var _ref3 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3(ctx, next) {
      var arg, where, sql, data;
      return _regenerator2.default.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              arg = [];
              where = '';

              if (ctx.query.pid) {
                where = ' where pid = ?';
                arg.push(ctx.query.pid);
                if (ctx.query.mid) {
                  where = where + ' and mid = ?';
                  arg.push(ctx.query.mid);
                }
              }
              sql = ['select * from menu ' + where + ' order by pid asc, mid desc '];
              _context3.next = 6;
              return mysql.query(MYSQL.LIMIT, sql, arg);

            case 6:
              data = _context3.sent;

              sheet[0].data = data[0];
              ctx.body = sheet[0];

            case 9:
            case 'end':
              return _context3.stop();
          }
        }
      }, _callee3, undefined);
    }));

    return function menuList(_x5, _x6) {
      return _ref3.apply(this, arguments);
    };
  }(),

  '/manager/menu/:id': function () {
    var _ref4 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee4(ctx, next) {
      var datas, data, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, v;

      return _regenerator2.default.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.next = 2;
              return mysql.query(MYSQL.LIMIT, ['select * from limit_menu where aid =? and mid2 > 0'], [ctx.params.id]);

            case 2:
              datas = _context4.sent;
              data = [];
              _iteratorNormalCompletion = true;
              _didIteratorError = false;
              _iteratorError = undefined;
              _context4.prev = 7;

              for (_iterator = (0, _getIterator3.default)(datas[0]); !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                v = _step.value;

                data.push(v.mid2);
              }
              _context4.next = 15;
              break;

            case 11:
              _context4.prev = 11;
              _context4.t0 = _context4['catch'](7);
              _didIteratorError = true;
              _iteratorError = _context4.t0;

            case 15:
              _context4.prev = 15;
              _context4.prev = 16;

              if (!_iteratorNormalCompletion && _iterator.return) {
                _iterator.return();
              }

            case 18:
              _context4.prev = 18;

              if (!_didIteratorError) {
                _context4.next = 21;
                break;
              }

              throw _iteratorError;

            case 21:
              return _context4.finish(18);

            case 22:
              return _context4.finish(15);

            case 23:
              sheet[0].data = data;
              ctx.body = sheet[0];

            case 25:
            case 'end':
              return _context4.stop();
          }
        }
      }, _callee4, undefined, [[7, 11, 15, 23], [16,, 18, 22]]);
    }));

    return function managerMenuId(_x7, _x8) {
      return _ref4.apply(this, arguments);
    };
  }(),

  '/manager/login/:username/:password': function () {
    var _ref5 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee5(ctx, next) {
      var data;
      return _regenerator2.default.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              _context5.next = 2;
              return mysql.query(MYSQL.LIMIT, ['select * from admin where username=? and password=?'], [ctx.params.username, ctx.params.password]);

            case 2:
              data = _context5.sent;

              if (data[0].length > 0) {
                ctx.session.username = ctx.params.username;
                sheet[0].data = data[0][0];
                ctx.body = sheet[0];
              } else {
                sheet[20002].message = '用户名或密码错误';
                ctx.body = sheet[20002];
              }

            case 4:
            case 'end':
              return _context5.stop();
          }
        }
      }, _callee5, undefined);
    }));

    return function managerLoginUsernamePassword(_x9, _x10) {
      return _ref5.apply(this, arguments);
    };
  }(),

  '/manager/limit': function () {
    var _ref6 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee6(ctx, next) {
      var datas, menus, my_menus, _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, v, show, _iteratorNormalCompletion5, _didIteratorError5, _iteratorError5, _iterator5, _step5, my, platform, _iteratorNormalCompletion3, _didIteratorError3, _iteratorError3, _iterator3, _step3, _v, i, _show, _iteratorNormalCompletion6, _didIteratorError6, _iteratorError6, _iterator6, _step6, _my, menu1, _iteratorNormalCompletion4, _didIteratorError4, _iteratorError4, _iterator4, _step4, _v2, _i, ii, _show2, _iteratorNormalCompletion7, _didIteratorError7, _iteratorError7, _iterator7, _step7, _my2, menu2;

      return _regenerator2.default.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              _context6.next = 2;
              return mysql.query(MYSQL.LIMIT, ['select * from limit_menu where aid=? order by pid,mid1', 'select * from menu'], [[ctx.manager.id], null]);

            case 2:
              datas = _context6.sent;
              menus = [];
              my_menus = datas[0];
              _iteratorNormalCompletion2 = true;
              _didIteratorError2 = false;
              _iteratorError2 = undefined;
              _context6.prev = 8;
              _iterator2 = (0, _getIterator3.default)(datas[1]);

            case 10:
              if (_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done) {
                _context6.next = 46;
                break;
              }

              v = _step2.value;

              if (!(v.pid == 0)) {
                _context6.next = 43;
                break;
              }

              show = false;
              _iteratorNormalCompletion5 = true;
              _didIteratorError5 = false;
              _iteratorError5 = undefined;
              _context6.prev = 17;
              _iterator5 = (0, _getIterator3.default)(my_menus);

            case 19:
              if (_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done) {
                _context6.next = 27;
                break;
              }

              my = _step5.value;

              if (!(v.id == my.pid)) {
                _context6.next = 24;
                break;
              }

              show = true;
              return _context6.abrupt('break', 27);

            case 24:
              _iteratorNormalCompletion5 = true;
              _context6.next = 19;
              break;

            case 27:
              _context6.next = 33;
              break;

            case 29:
              _context6.prev = 29;
              _context6.t0 = _context6['catch'](17);
              _didIteratorError5 = true;
              _iteratorError5 = _context6.t0;

            case 33:
              _context6.prev = 33;
              _context6.prev = 34;

              if (!_iteratorNormalCompletion5 && _iterator5.return) {
                _iterator5.return();
              }

            case 36:
              _context6.prev = 36;

              if (!_didIteratorError5) {
                _context6.next = 39;
                break;
              }

              throw _iteratorError5;

            case 39:
              return _context6.finish(36);

            case 40:
              return _context6.finish(33);

            case 41:
              platform = { show: show, id: v.id, name: v.name, url: v.url, menu1: [] };

              menus.push(platform);

            case 43:
              _iteratorNormalCompletion2 = true;
              _context6.next = 10;
              break;

            case 46:
              _context6.next = 52;
              break;

            case 48:
              _context6.prev = 48;
              _context6.t1 = _context6['catch'](8);
              _didIteratorError2 = true;
              _iteratorError2 = _context6.t1;

            case 52:
              _context6.prev = 52;
              _context6.prev = 53;

              if (!_iteratorNormalCompletion2 && _iterator2.return) {
                _iterator2.return();
              }

            case 55:
              _context6.prev = 55;

              if (!_didIteratorError2) {
                _context6.next = 58;
                break;
              }

              throw _iteratorError2;

            case 58:
              return _context6.finish(55);

            case 59:
              return _context6.finish(52);

            case 60:
              _iteratorNormalCompletion3 = true;
              _didIteratorError3 = false;
              _iteratorError3 = undefined;
              _context6.prev = 63;
              _iterator3 = (0, _getIterator3.default)(datas[1]);

            case 65:
              if (_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done) {
                _context6.next = 106;
                break;
              }

              _v = _step3.value;
              _context6.t2 = _regenerator2.default.keys(menus);

            case 68:
              if ((_context6.t3 = _context6.t2()).done) {
                _context6.next = 103;
                break;
              }

              i = _context6.t3.value;

              if (!(_v.pid == menus[i].id && _v.mid == 0)) {
                _context6.next = 101;
                break;
              }

              _show = false;
              _iteratorNormalCompletion6 = true;
              _didIteratorError6 = false;
              _iteratorError6 = undefined;
              _context6.prev = 75;
              _iterator6 = (0, _getIterator3.default)(my_menus);

            case 77:
              if (_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done) {
                _context6.next = 85;
                break;
              }

              _my = _step6.value;

              if (!(_v.id == _my.mid1)) {
                _context6.next = 82;
                break;
              }

              _show = true;
              return _context6.abrupt('break', 85);

            case 82:
              _iteratorNormalCompletion6 = true;
              _context6.next = 77;
              break;

            case 85:
              _context6.next = 91;
              break;

            case 87:
              _context6.prev = 87;
              _context6.t4 = _context6['catch'](75);
              _didIteratorError6 = true;
              _iteratorError6 = _context6.t4;

            case 91:
              _context6.prev = 91;
              _context6.prev = 92;

              if (!_iteratorNormalCompletion6 && _iterator6.return) {
                _iterator6.return();
              }

            case 94:
              _context6.prev = 94;

              if (!_didIteratorError6) {
                _context6.next = 97;
                break;
              }

              throw _iteratorError6;

            case 97:
              return _context6.finish(94);

            case 98:
              return _context6.finish(91);

            case 99:
              menu1 = { show: _show, id: _v.id, name: _v.name, url: _v.url, menu2: [] };

              menus[i].menu1.push(menu1);

            case 101:
              _context6.next = 68;
              break;

            case 103:
              _iteratorNormalCompletion3 = true;
              _context6.next = 65;
              break;

            case 106:
              _context6.next = 112;
              break;

            case 108:
              _context6.prev = 108;
              _context6.t5 = _context6['catch'](63);
              _didIteratorError3 = true;
              _iteratorError3 = _context6.t5;

            case 112:
              _context6.prev = 112;
              _context6.prev = 113;

              if (!_iteratorNormalCompletion3 && _iterator3.return) {
                _iterator3.return();
              }

            case 115:
              _context6.prev = 115;

              if (!_didIteratorError3) {
                _context6.next = 118;
                break;
              }

              throw _iteratorError3;

            case 118:
              return _context6.finish(115);

            case 119:
              return _context6.finish(112);

            case 120:
              _iteratorNormalCompletion4 = true;
              _didIteratorError4 = false;
              _iteratorError4 = undefined;
              _context6.prev = 123;
              _iterator4 = (0, _getIterator3.default)(datas[1]);

            case 125:
              if (_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done) {
                _context6.next = 171;
                break;
              }

              _v2 = _step4.value;
              _context6.t6 = _regenerator2.default.keys(menus);

            case 128:
              if ((_context6.t7 = _context6.t6()).done) {
                _context6.next = 168;
                break;
              }

              _i = _context6.t7.value;
              _context6.t8 = _regenerator2.default.keys(menus[_i].menu1);

            case 131:
              if ((_context6.t9 = _context6.t8()).done) {
                _context6.next = 166;
                break;
              }

              ii = _context6.t9.value;

              if (!(_v2.mid == menus[_i].menu1[ii].id)) {
                _context6.next = 164;
                break;
              }

              _show2 = false;
              _iteratorNormalCompletion7 = true;
              _didIteratorError7 = false;
              _iteratorError7 = undefined;
              _context6.prev = 138;
              _iterator7 = (0, _getIterator3.default)(my_menus);

            case 140:
              if (_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done) {
                _context6.next = 148;
                break;
              }

              _my2 = _step7.value;

              if (!(_v2.id == _my2.mid2)) {
                _context6.next = 145;
                break;
              }

              _show2 = true;
              return _context6.abrupt('break', 148);

            case 145:
              _iteratorNormalCompletion7 = true;
              _context6.next = 140;
              break;

            case 148:
              _context6.next = 154;
              break;

            case 150:
              _context6.prev = 150;
              _context6.t10 = _context6['catch'](138);
              _didIteratorError7 = true;
              _iteratorError7 = _context6.t10;

            case 154:
              _context6.prev = 154;
              _context6.prev = 155;

              if (!_iteratorNormalCompletion7 && _iterator7.return) {
                _iterator7.return();
              }

            case 157:
              _context6.prev = 157;

              if (!_didIteratorError7) {
                _context6.next = 160;
                break;
              }

              throw _iteratorError7;

            case 160:
              return _context6.finish(157);

            case 161:
              return _context6.finish(154);

            case 162:
              menu2 = { show: _show2, id: _v2.id, name: _v2.name, url: _v2.url };

              menus[_i].menu1[ii].menu2.push(menu2);

            case 164:
              _context6.next = 131;
              break;

            case 166:
              _context6.next = 128;
              break;

            case 168:
              _iteratorNormalCompletion4 = true;
              _context6.next = 125;
              break;

            case 171:
              _context6.next = 177;
              break;

            case 173:
              _context6.prev = 173;
              _context6.t11 = _context6['catch'](123);
              _didIteratorError4 = true;
              _iteratorError4 = _context6.t11;

            case 177:
              _context6.prev = 177;
              _context6.prev = 178;

              if (!_iteratorNormalCompletion4 && _iterator4.return) {
                _iterator4.return();
              }

            case 180:
              _context6.prev = 180;

              if (!_didIteratorError4) {
                _context6.next = 183;
                break;
              }

              throw _iteratorError4;

            case 183:
              return _context6.finish(180);

            case 184:
              return _context6.finish(177);

            case 185:
              sheet[0].data = menus;
              ctx.body = sheet[0];

            case 187:
            case 'end':
              return _context6.stop();
          }
        }
      }, _callee6, undefined, [[8, 48, 52, 60], [17, 29, 33, 41], [34,, 36, 40], [53,, 55, 59], [63, 108, 112, 120], [75, 87, 91, 99], [92,, 94, 98], [113,, 115, 119], [123, 173, 177, 185], [138, 150, 154, 162], [155,, 157, 161], [178,, 180, 184]]);
    }));

    return function managerLimit(_x11, _x12) {
      return _ref6.apply(this, arguments);
    };
  }(),

  '/manager/limit/list/:id': function () {
    var _ref7 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee7(ctx, next) {
      var menudata, userdata, ii, limitdata, _iteratorNormalCompletion8, _didIteratorError8, _iteratorError8, _iterator8, _step8, v, _iteratorNormalCompletion9, _didIteratorError9, _iteratorError9, _iterator9, _step9, i, _ii, _limitdata, _iteratorNormalCompletion10, _didIteratorError10, _iteratorError10, _iterator10, _step10, _v3, _iteratorNormalCompletion11, _didIteratorError11, _iteratorError11, _iterator11, _step11, _i2, _ii2, _limitdata2, _iteratorNormalCompletion12, _didIteratorError12, _iteratorError12, _iterator12, _step12, _v4, _iteratorNormalCompletion13, _didIteratorError13, _iteratorError13, _iterator13, _step13, _i3;

      return _regenerator2.default.wrap(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              _context7.next = 2;
              return mysql.query(MYSQL.LIMIT, ['select * from menu where id = ?'], [ctx.params.id]);

            case 2:
              menudata = _context7.sent;
              _context7.next = 5;
              return mysql.query(MYSQL.LIMIT, ['select * from admin'], [null]);

            case 5:
              userdata = _context7.sent;

              if (!(menudata[0][0].pid == 0)) {
                _context7.next = 58;
                break;
              }

              ii = 0;
              _context7.next = 10;
              return mysql.query(MYSQL.LIMIT, ['select * from limit_menu where pid =?'], [ctx.params.id]);

            case 10:
              limitdata = _context7.sent;
              _iteratorNormalCompletion8 = true;
              _didIteratorError8 = false;
              _iteratorError8 = undefined;
              _context7.prev = 14;
              _iterator8 = (0, _getIterator3.default)(userdata[0]);

            case 16:
              if (_iteratorNormalCompletion8 = (_step8 = _iterator8.next()).done) {
                _context7.next = 42;
                break;
              }

              v = _step8.value;

              userdata[0][ii].isgive = false;
              _iteratorNormalCompletion9 = true;
              _didIteratorError9 = false;
              _iteratorError9 = undefined;
              _context7.prev = 22;
              for (_iterator9 = (0, _getIterator3.default)(limitdata[0]); !(_iteratorNormalCompletion9 = (_step9 = _iterator9.next()).done); _iteratorNormalCompletion9 = true) {
                i = _step9.value;

                if (v.id == i.aid) {
                  userdata[0][ii].isgive = true;
                }
              }
              _context7.next = 30;
              break;

            case 26:
              _context7.prev = 26;
              _context7.t0 = _context7['catch'](22);
              _didIteratorError9 = true;
              _iteratorError9 = _context7.t0;

            case 30:
              _context7.prev = 30;
              _context7.prev = 31;

              if (!_iteratorNormalCompletion9 && _iterator9.return) {
                _iterator9.return();
              }

            case 33:
              _context7.prev = 33;

              if (!_didIteratorError9) {
                _context7.next = 36;
                break;
              }

              throw _iteratorError9;

            case 36:
              return _context7.finish(33);

            case 37:
              return _context7.finish(30);

            case 38:
              ii++;

            case 39:
              _iteratorNormalCompletion8 = true;
              _context7.next = 16;
              break;

            case 42:
              _context7.next = 48;
              break;

            case 44:
              _context7.prev = 44;
              _context7.t1 = _context7['catch'](14);
              _didIteratorError8 = true;
              _iteratorError8 = _context7.t1;

            case 48:
              _context7.prev = 48;
              _context7.prev = 49;

              if (!_iteratorNormalCompletion8 && _iterator8.return) {
                _iterator8.return();
              }

            case 51:
              _context7.prev = 51;

              if (!_didIteratorError8) {
                _context7.next = 54;
                break;
              }

              throw _iteratorError8;

            case 54:
              return _context7.finish(51);

            case 55:
              return _context7.finish(48);

            case 56:
              _context7.next = 159;
              break;

            case 58:
              if (!(menudata[0][0].pid != 0 && menudata[0][0].mid == 0)) {
                _context7.next = 110;
                break;
              }

              _ii = 0;
              _context7.next = 62;
              return mysql.query(MYSQL.LIMIT, ['select * from limit_menu where pid =? and mid1=?'], [menudata[0][0].pid, ctx.params.id]);

            case 62:
              _limitdata = _context7.sent;
              _iteratorNormalCompletion10 = true;
              _didIteratorError10 = false;
              _iteratorError10 = undefined;
              _context7.prev = 66;
              _iterator10 = (0, _getIterator3.default)(userdata[0]);

            case 68:
              if (_iteratorNormalCompletion10 = (_step10 = _iterator10.next()).done) {
                _context7.next = 94;
                break;
              }

              _v3 = _step10.value;

              userdata[0][_ii].isgive = false;
              _iteratorNormalCompletion11 = true;
              _didIteratorError11 = false;
              _iteratorError11 = undefined;
              _context7.prev = 74;
              for (_iterator11 = (0, _getIterator3.default)(_limitdata[0]); !(_iteratorNormalCompletion11 = (_step11 = _iterator11.next()).done); _iteratorNormalCompletion11 = true) {
                _i2 = _step11.value;

                if (_v3.id == _i2.aid) {
                  userdata[0][_ii].isgive = true;
                }
              }
              _context7.next = 82;
              break;

            case 78:
              _context7.prev = 78;
              _context7.t2 = _context7['catch'](74);
              _didIteratorError11 = true;
              _iteratorError11 = _context7.t2;

            case 82:
              _context7.prev = 82;
              _context7.prev = 83;

              if (!_iteratorNormalCompletion11 && _iterator11.return) {
                _iterator11.return();
              }

            case 85:
              _context7.prev = 85;

              if (!_didIteratorError11) {
                _context7.next = 88;
                break;
              }

              throw _iteratorError11;

            case 88:
              return _context7.finish(85);

            case 89:
              return _context7.finish(82);

            case 90:
              _ii++;

            case 91:
              _iteratorNormalCompletion10 = true;
              _context7.next = 68;
              break;

            case 94:
              _context7.next = 100;
              break;

            case 96:
              _context7.prev = 96;
              _context7.t3 = _context7['catch'](66);
              _didIteratorError10 = true;
              _iteratorError10 = _context7.t3;

            case 100:
              _context7.prev = 100;
              _context7.prev = 101;

              if (!_iteratorNormalCompletion10 && _iterator10.return) {
                _iterator10.return();
              }

            case 103:
              _context7.prev = 103;

              if (!_didIteratorError10) {
                _context7.next = 106;
                break;
              }

              throw _iteratorError10;

            case 106:
              return _context7.finish(103);

            case 107:
              return _context7.finish(100);

            case 108:
              _context7.next = 159;
              break;

            case 110:
              _ii2 = 0;
              _context7.next = 113;
              return mysql.query(MYSQL.LIMIT, ['select * from limit_menu where pid =? and mid1=? and mid2=?'], [menudata[0][0].pid, menudata[0][0].mid, ctx.params.id]);

            case 113:
              _limitdata2 = _context7.sent;
              _iteratorNormalCompletion12 = true;
              _didIteratorError12 = false;
              _iteratorError12 = undefined;
              _context7.prev = 117;
              _iterator12 = (0, _getIterator3.default)(userdata[0]);

            case 119:
              if (_iteratorNormalCompletion12 = (_step12 = _iterator12.next()).done) {
                _context7.next = 145;
                break;
              }

              _v4 = _step12.value;

              userdata[0][_ii2].isgive = false;
              _iteratorNormalCompletion13 = true;
              _didIteratorError13 = false;
              _iteratorError13 = undefined;
              _context7.prev = 125;
              for (_iterator13 = (0, _getIterator3.default)(_limitdata2[0]); !(_iteratorNormalCompletion13 = (_step13 = _iterator13.next()).done); _iteratorNormalCompletion13 = true) {
                _i3 = _step13.value;

                if (_v4.id == _i3.aid) {
                  userdata[0][_ii2].isgive = true;
                }
              }
              _context7.next = 133;
              break;

            case 129:
              _context7.prev = 129;
              _context7.t4 = _context7['catch'](125);
              _didIteratorError13 = true;
              _iteratorError13 = _context7.t4;

            case 133:
              _context7.prev = 133;
              _context7.prev = 134;

              if (!_iteratorNormalCompletion13 && _iterator13.return) {
                _iterator13.return();
              }

            case 136:
              _context7.prev = 136;

              if (!_didIteratorError13) {
                _context7.next = 139;
                break;
              }

              throw _iteratorError13;

            case 139:
              return _context7.finish(136);

            case 140:
              return _context7.finish(133);

            case 141:
              _ii2++;

            case 142:
              _iteratorNormalCompletion12 = true;
              _context7.next = 119;
              break;

            case 145:
              _context7.next = 151;
              break;

            case 147:
              _context7.prev = 147;
              _context7.t5 = _context7['catch'](117);
              _didIteratorError12 = true;
              _iteratorError12 = _context7.t5;

            case 151:
              _context7.prev = 151;
              _context7.prev = 152;

              if (!_iteratorNormalCompletion12 && _iterator12.return) {
                _iterator12.return();
              }

            case 154:
              _context7.prev = 154;

              if (!_didIteratorError12) {
                _context7.next = 157;
                break;
              }

              throw _iteratorError12;

            case 157:
              return _context7.finish(154);

            case 158:
              return _context7.finish(151);

            case 159:
              sheet[0].data = userdata[0];
              ctx.body = sheet[0];

            case 161:
            case 'end':
              return _context7.stop();
          }
        }
      }, _callee7, undefined, [[14, 44, 48, 56], [22, 26, 30, 38], [31,, 33, 37], [49,, 51, 55], [66, 96, 100, 108], [74, 78, 82, 90], [83,, 85, 89], [101,, 103, 107], [117, 147, 151, 159], [125, 129, 133, 141], [134,, 136, 140], [152,, 154, 158]]);
    }));

    return function managerLimitListId(_x13, _x14) {
      return _ref7.apply(this, arguments);
    };
  }(),

  '/add/limit': function () {
    var _ref8 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee8(ctx, next) {
      var datas, menus, my_menus, _iteratorNormalCompletion14, _didIteratorError14, _iteratorError14, _iterator14, _step14, v, platform, _iteratorNormalCompletion15, _didIteratorError15, _iteratorError15, _iterator15, _step15, _v5, i, menu1, _iteratorNormalCompletion16, _didIteratorError16, _iteratorError16, _iterator16, _step16, _v6, _i4, ii, menu2;

      return _regenerator2.default.wrap(function _callee8$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              _context8.next = 2;
              return mysql.query(MYSQL.LIMIT, ['select * from limit_menu order by pid,mid1', 'select * from menu'], [[null], null]);

            case 2:
              datas = _context8.sent;
              menus = [];
              my_menus = datas[0];
              _iteratorNormalCompletion14 = true;
              _didIteratorError14 = false;
              _iteratorError14 = undefined;
              _context8.prev = 8;

              for (_iterator14 = (0, _getIterator3.default)(datas[1]); !(_iteratorNormalCompletion14 = (_step14 = _iterator14.next()).done); _iteratorNormalCompletion14 = true) {
                v = _step14.value;

                if (v.pid == 0) {
                  platform = { id: v.id, label: v.name, children: [] };

                  menus.push(platform);
                }
              }
              _context8.next = 16;
              break;

            case 12:
              _context8.prev = 12;
              _context8.t0 = _context8['catch'](8);
              _didIteratorError14 = true;
              _iteratorError14 = _context8.t0;

            case 16:
              _context8.prev = 16;
              _context8.prev = 17;

              if (!_iteratorNormalCompletion14 && _iterator14.return) {
                _iterator14.return();
              }

            case 19:
              _context8.prev = 19;

              if (!_didIteratorError14) {
                _context8.next = 22;
                break;
              }

              throw _iteratorError14;

            case 22:
              return _context8.finish(19);

            case 23:
              return _context8.finish(16);

            case 24:
              _iteratorNormalCompletion15 = true;
              _didIteratorError15 = false;
              _iteratorError15 = undefined;
              _context8.prev = 27;
              for (_iterator15 = (0, _getIterator3.default)(datas[1]); !(_iteratorNormalCompletion15 = (_step15 = _iterator15.next()).done); _iteratorNormalCompletion15 = true) {
                _v5 = _step15.value;

                for (i in menus) {
                  if (_v5.pid == menus[i].id && _v5.mid == 0) {
                    menu1 = { id: _v5.id, label: _v5.name, children: [] };

                    menus[i].children.push(menu1);
                  }
                }
              }
              _context8.next = 35;
              break;

            case 31:
              _context8.prev = 31;
              _context8.t1 = _context8['catch'](27);
              _didIteratorError15 = true;
              _iteratorError15 = _context8.t1;

            case 35:
              _context8.prev = 35;
              _context8.prev = 36;

              if (!_iteratorNormalCompletion15 && _iterator15.return) {
                _iterator15.return();
              }

            case 38:
              _context8.prev = 38;

              if (!_didIteratorError15) {
                _context8.next = 41;
                break;
              }

              throw _iteratorError15;

            case 41:
              return _context8.finish(38);

            case 42:
              return _context8.finish(35);

            case 43:
              _iteratorNormalCompletion16 = true;
              _didIteratorError16 = false;
              _iteratorError16 = undefined;
              _context8.prev = 46;
              for (_iterator16 = (0, _getIterator3.default)(datas[1]); !(_iteratorNormalCompletion16 = (_step16 = _iterator16.next()).done); _iteratorNormalCompletion16 = true) {
                _v6 = _step16.value;

                for (_i4 in menus) {
                  for (ii in menus[_i4].children) {
                    if (_v6.mid == menus[_i4].children[ii].id) {
                      menu2 = { id: _v6.id, label: _v6.name };

                      menus[_i4].children[ii].children.push(menu2);
                    }
                  }
                }
              }
              _context8.next = 54;
              break;

            case 50:
              _context8.prev = 50;
              _context8.t2 = _context8['catch'](46);
              _didIteratorError16 = true;
              _iteratorError16 = _context8.t2;

            case 54:
              _context8.prev = 54;
              _context8.prev = 55;

              if (!_iteratorNormalCompletion16 && _iterator16.return) {
                _iterator16.return();
              }

            case 57:
              _context8.prev = 57;

              if (!_didIteratorError16) {
                _context8.next = 60;
                break;
              }

              throw _iteratorError16;

            case 60:
              return _context8.finish(57);

            case 61:
              return _context8.finish(54);

            case 62:
              sheet[0].data = menus;
              ctx.body = sheet[0];

            case 64:
            case 'end':
              return _context8.stop();
          }
        }
      }, _callee8, undefined, [[8, 12, 16, 24], [17,, 19, 23], [27, 31, 35, 43], [36,, 38, 42], [46, 50, 54, 62], [55,, 57, 61]]);
    }));

    return function addLimit(_x15, _x16) {
      return _ref8.apply(this, arguments);
    };
  }()
};

exports.post = {
  '/menu/add': function () {
    var _ref9 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee9(ctx, next) {
      var _ctx$request$body, name, pid, mid, url, sql, arg, data;

      return _regenerator2.default.wrap(function _callee9$(_context9) {
        while (1) {
          switch (_context9.prev = _context9.next) {
            case 0:
              _ctx$request$body = ctx.request.body, name = _ctx$request$body.name, pid = _ctx$request$body.pid, mid = _ctx$request$body.mid, url = _ctx$request$body.url;
              sql = ['insert into menu (name, pid, mid, url) values(?, ?, ?, ?)'];
              arg = [name, pid, mid, url];
              _context9.next = 5;
              return mysql.query(MYSQL.LIMIT, sql, arg);

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

    return function menuAdd(_x17, _x18) {
      return _ref9.apply(this, arguments);
    };
  }(),

  '/manager/add': function () {
    var _ref10 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee10(ctx, next) {
      var _ctx$request$body2, name, username, password, limit, userdata, sql, arg, data, aid, _iteratorNormalCompletion17, _didIteratorError17, _iteratorError17, _iterator17, _step17, v, menudata;

      return _regenerator2.default.wrap(function _callee10$(_context10) {
        while (1) {
          switch (_context10.prev = _context10.next) {
            case 0:
              _ctx$request$body2 = ctx.request.body, name = _ctx$request$body2.name, username = _ctx$request$body2.username, password = _ctx$request$body2.password, limit = _ctx$request$body2.limit;
              _context10.next = 3;
              return mysql.query(MYSQL.LIMIT, [' select * from admin where username =?'], [username]);

            case 3:
              userdata = _context10.sent;

              if (!(userdata[0].length != 0)) {
                _context10.next = 10;
                break;
              }

              sheet[10004].message = '该登录号已经存在';
              ctx.body = sheet[10004];
              return _context10.abrupt('return');

            case 10:
              sql = ['insert into admin (name, username, password) values(?, ?, ?)'];
              arg = [name, username, password];
              _context10.next = 14;
              return mysql.query(MYSQL.LIMIT, sql, arg);

            case 14:
              data = _context10.sent;
              aid = data[0].insertId;
              _iteratorNormalCompletion17 = true;
              _didIteratorError17 = false;
              _iteratorError17 = undefined;
              _context10.prev = 19;
              _iterator17 = (0, _getIterator3.default)(limit);

            case 21:
              if (_iteratorNormalCompletion17 = (_step17 = _iterator17.next()).done) {
                _context10.next = 31;
                break;
              }

              v = _step17.value;
              _context10.next = 25;
              return mysql.query(MYSQL.LIMIT, [' select * from menu where id =?'], [v]);

            case 25:
              menudata = _context10.sent;
              _context10.next = 28;
              return mysql.query(MYSQL.LIMIT, ['insert into limit_menu (aid, pid, mid1, mid2) values(?, ?, ?, ?)'], [aid, menudata[0][0].pid, menudata[0][0].mid, v]);

            case 28:
              _iteratorNormalCompletion17 = true;
              _context10.next = 21;
              break;

            case 31:
              _context10.next = 37;
              break;

            case 33:
              _context10.prev = 33;
              _context10.t0 = _context10['catch'](19);
              _didIteratorError17 = true;
              _iteratorError17 = _context10.t0;

            case 37:
              _context10.prev = 37;
              _context10.prev = 38;

              if (!_iteratorNormalCompletion17 && _iterator17.return) {
                _iterator17.return();
              }

            case 40:
              _context10.prev = 40;

              if (!_didIteratorError17) {
                _context10.next = 43;
                break;
              }

              throw _iteratorError17;

            case 43:
              return _context10.finish(40);

            case 44:
              return _context10.finish(37);

            case 45:
              sheet[0].data = data;
              ctx.body = sheet[0];

            case 47:
            case 'end':
              return _context10.stop();
          }
        }
      }, _callee10, undefined, [[19, 33, 37, 45], [38,, 40, 44]]);
    }));

    return function managerAdd(_x19, _x20) {
      return _ref10.apply(this, arguments);
    };
  }()
};

exports.put = {
  '/menu/uprow': function () {
    var _ref11 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee11(ctx, next) {
      var _ctx$request$body3, id, name, url, sql, arg, data;

      return _regenerator2.default.wrap(function _callee11$(_context11) {
        while (1) {
          switch (_context11.prev = _context11.next) {
            case 0:
              _ctx$request$body3 = ctx.request.body, id = _ctx$request$body3.id, name = _ctx$request$body3.name, url = _ctx$request$body3.url;
              sql = ['update menu set name=?, url=? where id =?'];
              arg = [name, url, id];
              _context11.next = 5;
              return mysql.query(MYSQL.LIMIT, sql, arg);

            case 5:
              data = _context11.sent;

              sheet[0].data = data;
              ctx.body = sheet[0];

            case 8:
            case 'end':
              return _context11.stop();
          }
        }
      }, _callee11, undefined);
    }));

    return function menuUprow(_x21, _x22) {
      return _ref11.apply(this, arguments);
    };
  }(),

  '/limit/uprow': function () {
    var _ref12 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee12(ctx, next) {
      var _ctx$request$body4, id, type, menuid, limitdata, sql, arg, data, _sql, _arg, _data;

      return _regenerator2.default.wrap(function _callee12$(_context12) {
        while (1) {
          switch (_context12.prev = _context12.next) {
            case 0:
              _ctx$request$body4 = ctx.request.body, id = _ctx$request$body4.id, type = _ctx$request$body4.type, menuid = _ctx$request$body4.menuid;
              _context12.next = 3;
              return mysql.query(MYSQL.LIMIT, ['select * from menu where id =?'], [menuid]);

            case 3:
              limitdata = _context12.sent;

              if (!limitdata[0][0].mid) {
                _context12.next = 25;
                break;
              }

              if (!(type == '+')) {
                _context12.next = 15;
                break;
              }

              sql = ['insert into limit_menu (aid, pid, mid1, mid2) values(?, ?, ?, ?)'];
              arg = [id, limitdata[0][0].pid, limitdata[0][0].mid, menuid];
              _context12.next = 10;
              return mysql.query(MYSQL.LIMIT, sql, arg);

            case 10:
              data = _context12.sent;

              sheet[0].data = data;
              ctx.body = sheet[0];
              _context12.next = 23;
              break;

            case 15:
              if (!(type == '-')) {
                _context12.next = 23;
                break;
              }

              _sql = ['delete from limit_menu where aid =? and pid=? and mid1=? and mid2=?'];
              _arg = [id, limitdata[0][0].pid, limitdata[0][0].mid, menuid];
              _context12.next = 20;
              return mysql.query(MYSQL.LIMIT, _sql, _arg);

            case 20:
              _data = _context12.sent;

              sheet[0].data = _data;
              ctx.body = sheet[0];

            case 23:
              _context12.next = 28;
              break;

            case 25:
              sheet[10004].message = '您只能更改二级菜单权限';
              ctx.body = sheet[10004];
              return _context12.abrupt('return');

            case 28:
            case 'end':
              return _context12.stop();
          }
        }
      }, _callee12, undefined);
    }));

    return function limitUprow(_x23, _x24) {
      return _ref12.apply(this, arguments);
    };
  }(),

  '/manager/limit/eidt': function () {
    var _ref13 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee13(ctx, next) {
      var _ctx$request$body5, aid, limit, data, _iteratorNormalCompletion18, _didIteratorError18, _iteratorError18, _iterator18, _step18, v, menudata;

      return _regenerator2.default.wrap(function _callee13$(_context13) {
        while (1) {
          switch (_context13.prev = _context13.next) {
            case 0:
              _ctx$request$body5 = ctx.request.body, aid = _ctx$request$body5.aid, limit = _ctx$request$body5.limit;
              _context13.next = 3;
              return mysql.query(MYSQL.LIMIT, ['delete from limit_menu where aid =?'], [aid]);

            case 3:
              data = _context13.sent;
              _iteratorNormalCompletion18 = true;
              _didIteratorError18 = false;
              _iteratorError18 = undefined;
              _context13.prev = 7;
              _iterator18 = (0, _getIterator3.default)(limit);

            case 9:
              if (_iteratorNormalCompletion18 = (_step18 = _iterator18.next()).done) {
                _context13.next = 19;
                break;
              }

              v = _step18.value;
              _context13.next = 13;
              return mysql.query(MYSQL.LIMIT, [' select * from menu where id =?'], [v]);

            case 13:
              menudata = _context13.sent;
              _context13.next = 16;
              return mysql.query(MYSQL.LIMIT, ['insert into limit_menu (aid, pid, mid1, mid2) values(?, ?, ?, ?)'], [aid, menudata[0][0].pid, menudata[0][0].mid, v]);

            case 16:
              _iteratorNormalCompletion18 = true;
              _context13.next = 9;
              break;

            case 19:
              _context13.next = 25;
              break;

            case 21:
              _context13.prev = 21;
              _context13.t0 = _context13['catch'](7);
              _didIteratorError18 = true;
              _iteratorError18 = _context13.t0;

            case 25:
              _context13.prev = 25;
              _context13.prev = 26;

              if (!_iteratorNormalCompletion18 && _iterator18.return) {
                _iterator18.return();
              }

            case 28:
              _context13.prev = 28;

              if (!_didIteratorError18) {
                _context13.next = 31;
                break;
              }

              throw _iteratorError18;

            case 31:
              return _context13.finish(28);

            case 32:
              return _context13.finish(25);

            case 33:
              sheet[0].data = data;
              ctx.body = sheet[0];

            case 35:
            case 'end':
              return _context13.stop();
          }
        }
      }, _callee13, undefined, [[7, 21, 25, 33], [26,, 28, 32]]);
    }));

    return function managerLimitEidt(_x25, _x26) {
      return _ref13.apply(this, arguments);
    };
  }()
};

exports.delete = {
  '/manager/remove/:id': function () {
    var _ref14 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee14(ctx, next) {
      var sql, arg, data;
      return _regenerator2.default.wrap(function _callee14$(_context14) {
        while (1) {
          switch (_context14.prev = _context14.next) {
            case 0:
              sql = ['delete from admin where id =?', 'delete from limit_menu where aid =?'];
              arg = [[ctx.params.id], [ctx.params.id]];
              _context14.next = 4;
              return mysql.query(MYSQL.LIMIT, sql, arg);

            case 4:
              data = _context14.sent;

              sheet[0].data = data;
              ctx.body = sheet[0];

            case 7:
            case 'end':
              return _context14.stop();
          }
        }
      }, _callee14, undefined);
    }));

    return function managerRemoveId(_x27, _x28) {
      return _ref14.apply(this, arguments);
    };
  }()
};