'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.get = {
  '/get_company/list': function () {
    var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(ctx, next) {
      var data;
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return $.mysql.query($.conf.mysql.main, 'select * from company where examine = 1 order by id');

            case 2:
              data = _context.sent;

              ctx.result.ok.data = data;
              $.flush(ctx, ctx.result.ok);

            case 5:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, undefined);
    }));

    return function get_companyList(_x, _x2) {
      return _ref.apply(this, arguments);
    };
  }(),

  '/get_company/datail/:id': function () {
    var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(ctx, next) {
      var id, data;
      return _regenerator2.default.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              id = ctx.params.id;
              _context2.next = 3;
              return $.mysql.query($.conf.mysql.main, 'select * from company where examine = 1 and id=?', [id]);

            case 3:
              data = _context2.sent;

              ctx.result.ok.data = data;
              $.flush(ctx, ctx.result.ok);

            case 6:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, undefined);
    }));

    return function get_companyDatailId(_x3, _x4) {
      return _ref2.apply(this, arguments);
    };
  }(),

  '/get_job/datail/:id': function () {
    var _ref3 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3(ctx, next) {
      var id, data;
      return _regenerator2.default.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              id = ctx.params.id;
              _context3.next = 3;
              return $.mysql.query($.conf.mysql.main, 'select A.id,A.examine, B.* from company A, job B where A.id = B.cid and A.examine=1 and A.id = ?', [id]);

            case 3:
              data = _context3.sent;

              ctx.result.ok.data = data;
              $.flush(ctx, ctx.result.ok);

            case 6:
            case 'end':
              return _context3.stop();
          }
        }
      }, _callee3, undefined);
    }));

    return function get_jobDatailId(_x5, _x6) {
      return _ref3.apply(this, arguments);
    };
  }(),

  '/company/list': function () {
    var _ref4 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee4(ctx, next) {
      var data;
      return _regenerator2.default.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.next = 2;
              return $.mysql.query($.conf.mysql.main, 'select * from company where examine = 0 order by id');

            case 2:
              data = _context4.sent;

              ctx.result.ok.data = data;
              $.flush(ctx, ctx.result.ok);

            case 5:
            case 'end':
              return _context4.stop();
          }
        }
      }, _callee4, undefined);
    }));

    return function companyList(_x7, _x8) {
      return _ref4.apply(this, arguments);
    };
  }(),

  '/company/detail/:id': function () {
    var _ref5 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee5(ctx, next) {
      var id, data;
      return _regenerator2.default.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              id = ctx.params.id;
              _context5.next = 3;
              return $.mysql.query($.conf.mysql.main, 'select * from company where examine = 0 and id=?', [id]);

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

    return function companyDetailId(_x9, _x10) {
      return _ref5.apply(this, arguments);
    };
  }(),

  '/job/list': function () {
    var _ref6 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee6(ctx, next) {
      var job;
      return _regenerator2.default.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              _context6.next = 2;
              return $.mysql.query($.conf.mysql.main, 'select A.*,B.id,B.logo,B.examine as mine from job A,company B where A.cid = B.id and  A.examine = 0 and B.examine = 1 order by A.issue_time desc');

            case 2:
              job = _context6.sent;

              ctx.result.ok.data = job;
              $.flush(ctx, ctx.result.ok);

            case 5:
            case 'end':
              return _context6.stop();
          }
        }
      }, _callee6, undefined);
    }));

    return function jobList(_x11, _x12) {
      return _ref6.apply(this, arguments);
    };
  }(),

  '/job/detail/:id': function () {
    var _ref7 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee7(ctx, next) {
      var id, job;
      return _regenerator2.default.wrap(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              id = ctx.params.id;
              _context7.next = 3;
              return $.mysql.query($.conf.mysql.main, 'select A.*,B.id,B.logo,B.examine as mine from job A,company B where A.cid = B.id and  A.examine = 0 and B.examine = 1 and A.id=?', [id]);

            case 3:
              job = _context7.sent;

              ctx.result.ok.data = job;
              $.flush(ctx, ctx.result.ok);

            case 6:
            case 'end':
              return _context7.stop();
          }
        }
      }, _callee7, undefined);
    }));

    return function jobDetailId(_x13, _x14) {
      return _ref7.apply(this, arguments);
    };
  }()

};

exports.post = {};

exports.put = {
  '/company/examine': function () {
    var _ref8 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee8(ctx, next) {
      var _ctx$put, id, examine, name, content, data, company, time;

      return _regenerator2.default.wrap(function _callee8$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              _ctx$put = ctx.put, id = _ctx$put.id, examine = _ctx$put.examine, name = _ctx$put.name;
              content = [];
              _context8.next = 4;
              return $.mysql.push($.conf.mysql.main, 'update company set examine = ? where id = ?', [examine, id]);

            case 4:
              data = _context8.sent;
              _context8.next = 7;
              return $.mysql.query($.conf.mysql.main, 'select * from company where id=?', [id]);

            case 7:
              company = _context8.sent;

              if (company[0].examine == 1) {
                content = '您申请的' + name + '企业认证于' + $.time.format('yyyy-mm-dd') + '，审核通过，请注意查看';
              } else {
                content = '您申请的' + name + '企业认证于' + $.time.format('yyyy-mm-dd') + '，审核未通过，请注意查看';
              }
              time = $.time10();
              _context8.next = 12;
              return $.mysql.push($.conf.mysql.main, 'insert into msg (cid ,content,time) values(?,?,?)', [id, content, time]);

            case 12:
              ctx.result.ok.data = data;
              $.flush(ctx, ctx.result.ok);

            case 14:
            case 'end':
              return _context8.stop();
          }
        }
      }, _callee8, undefined);
    }));

    return function companyExamine(_x15, _x16) {
      return _ref8.apply(this, arguments);
    };
  }(),

  '/job/examine': function () {
    var _ref9 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee9(ctx, next) {
      var _ctx$put2, id, examine, content, job, data, time;

      return _regenerator2.default.wrap(function _callee9$(_context9) {
        while (1) {
          switch (_context9.prev = _context9.next) {
            case 0:
              _ctx$put2 = ctx.put, id = _ctx$put2.id, examine = _ctx$put2.examine;
              content = [];
              _context9.next = 4;
              return $.mysql.push($.conf.mysql.main, 'update job set examine = ? where id=?', [examine, id]);

            case 4:
              job = _context9.sent;
              _context9.next = 7;
              return $.mysql.query($.conf.mysql.main, 'select A.*,B.id from job A,company B where A.id=? and A.cid = B.id ', [id]);

            case 7:
              data = _context9.sent;

              console.log(data);
              if (data[0].examine == 1) {
                content = '您申请的' + data[0].name + '岗位认证于' + $.time.format('yyyy-mm-dd') + '，审核通过，请注意查看';
              } else {
                content = '您申请的' + data[0].name + '岗位认证于' + $.time.format('yyyy-mm-dd') + '，审核未通过，请注意查看';
              }
              time = $.time10();
              _context9.next = 13;
              return $.mysql.push($.conf.mysql.main, 'insert into msg (cid ,content,time) values(?,?,?)', [data[0].cid, content, time]);

            case 13:
              ctx.result.ok.data = job;
              $.flush(ctx, ctx.result.ok);

            case 15:
            case 'end':
              return _context9.stop();
          }
        }
      }, _callee9, undefined);
    }));

    return function jobExamine(_x17, _x18) {
      return _ref9.apply(this, arguments);
    };
  }()
};

exports.delete = {};