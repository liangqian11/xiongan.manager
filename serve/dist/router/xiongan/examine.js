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
var time = require('../../plugin/util/time');
var sheet = require('../../plugin/util/sheet');

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
      var limit, where, _ctx$query, examine, name, page, sql, data;

      return _regenerator2.default.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              limit = ' limit 0,15 ';
              where = '';
              _ctx$query = ctx.query, examine = _ctx$query.examine, name = _ctx$query.name, page = _ctx$query.page;

              if (ctx.query.examine) {
                where = where == '' ? ' where examine= ' + examine : where + ' and examine=' + examine;
              }
              if (ctx.query.name) {
                where = where == '' ? ' where name like "%' + name + '%"' : where + ' and name like "%' + name + '%"';
              }
              if (ctx.query.page > 0) {
                limit = ' limit ' + (ctx.query.page - 1) * 15 + ',15';
              }
              sql = [' select * from job ' + where + ' and status < 2 ' + limit];
              _context6.next = 9;
              return mysql.query(MYSQL.XIONGAN, sql, null);

            case 9:
              data = _context6.sent;

              sheet[0].data = data[0];
              ctx.body = sheet[0];

            case 12:
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
              return mysql.query(MYSQL.XIONGAN, ['select A.*,B.name as jtname from job A,job_type B where A.jtid = B.id and A.id=?'], [id]);

            case 3:
              job = _context7.sent;

              sheet[0].data = job[0][0];
              ctx.body = sheet[0];

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
  }(),

  '/area/list': function () {
    var _ref8 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee8(ctx, next) {
      var area;
      return _regenerator2.default.wrap(function _callee8$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              _context8.next = 2;
              return mysql.query(MYSQL.XIONGAN, ['select * from area'], [null]);

            case 2:
              area = _context8.sent;

              sheet[0].data = area[0];
              ctx.body = sheet[0];

            case 5:
            case 'end':
              return _context8.stop();
          }
        }
      }, _callee8, undefined);
    }));

    return function areaList(_x15, _x16) {
      return _ref8.apply(this, arguments);
    };
  }(),

  '/experience/list': function () {
    var _ref9 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee9(ctx, next) {
      return _regenerator2.default.wrap(function _callee9$(_context9) {
        while (1) {
          switch (_context9.prev = _context9.next) {
            case 0:
              sheet[0].data = ['不限', '无经验', '1年以下', '1-3年', '3-5年', '5-10年', '10年以上'];
              ctx.body = sheet[0];

            case 2:
            case 'end':
              return _context9.stop();
          }
        }
      }, _callee9, undefined);
    }));

    return function experienceList(_x17, _x18) {
      return _ref9.apply(this, arguments);
    };
  }(),

  '/pay/list': function () {
    var _ref10 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee10(ctx, next) {
      return _regenerator2.default.wrap(function _callee10$(_context10) {
        while (1) {
          switch (_context10.prev = _context10.next) {
            case 0:
              sheet[0].data = ['2000以下', '2000-3000', '3000-5000', '5000-10000', '10000以上', '面议'];
              ctx.body = sheet[0];

            case 2:
            case 'end':
              return _context10.stop();
          }
        }
      }, _callee10, undefined);
    }));

    return function payList(_x19, _x20) {
      return _ref10.apply(this, arguments);
    };
  }(),

  '/benefit/list': function () {
    var _ref11 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee11(ctx, next) {
      return _regenerator2.default.wrap(function _callee11$(_context11) {
        while (1) {
          switch (_context11.prev = _context11.next) {
            case 0:
              sheet[0].data = [{ name: '五险一金', checked: false }, { name: '年底双薪', checked: false }, { name: '绩效奖金', checked: false }, { name: '年终分红', checked: false }, { name: '股票期权', checked: false }, { name: '加班补助', checked: false }, { name: '全勤奖', checked: false }, { name: '包吃包住', checked: false }, { name: '交通补助', checked: false }, { name: '餐补', checked: false }, { name: '房补', checked: false }, { name: '通讯补贴', checked: false }, { name: '采暖补贴', checked: false }, { name: '带薪年假', checked: false }, { name: '弹性工作', checked: false }, { name: '补充医疗保险', checked: false }, { name: '定期体检', checked: false }, { name: '免费班车', checked: false }, { name: '员工旅游', checked: false }, { name: '高温补贴', checked: false }, { name: '节日福利', checked: false }];
              ctx.body = sheet[0];

            case 2:
            case 'end':
              return _context11.stop();
          }
        }
      }, _callee11, undefined);
    }));

    return function benefitList(_x21, _x22) {
      return _ref11.apply(this, arguments);
    };
  }(),

  '/education/list': function () {
    var _ref12 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee12(ctx, next) {
      return _regenerator2.default.wrap(function _callee12$(_context12) {
        while (1) {
          switch (_context12.prev = _context12.next) {
            case 0:
              sheet[0].data = ['不限', '初中', '中技', '高中', '中专', '大专', '本科', '硕士', 'MBA', 'EMBA', '博士', '其他'];
              ctx.body = sheet[0];

            case 2:
            case 'end':
              return _context12.stop();
          }
        }
      }, _callee12, undefined);
    }));

    return function educationList(_x23, _x24) {
      return _ref12.apply(this, arguments);
    };
  }(),

  '/jobtype/list': function () {
    var _ref13 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee13(ctx, next) {
      var data;
      return _regenerator2.default.wrap(function _callee13$(_context13) {
        while (1) {
          switch (_context13.prev = _context13.next) {
            case 0:
              _context13.next = 2;
              return mysql.query(MYSQL.XIONGAN, ['select * from job_type'], [null]);

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

    return function jobtypeList(_x25, _x26) {
      return _ref13.apply(this, arguments);
    };
  }()

};

exports.post = {};

exports.put = {
  '/company/examine': function () {
    var _ref14 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee14(ctx, next) {
      var _ctx$put, id, examine, name, content, data, company, time;

      return _regenerator2.default.wrap(function _callee14$(_context14) {
        while (1) {
          switch (_context14.prev = _context14.next) {
            case 0:
              _ctx$put = ctx.put, id = _ctx$put.id, examine = _ctx$put.examine, name = _ctx$put.name;
              content = [];
              _context14.next = 4;
              return $.mysql.push($.conf.mysql.main, 'update company set examine = ? where id = ?', [examine, id]);

            case 4:
              data = _context14.sent;
              _context14.next = 7;
              return $.mysql.query($.conf.mysql.main, 'select * from company where id=?', [id]);

            case 7:
              company = _context14.sent;

              if (company[0].examine == 1) {
                content = '您申请的' + name + '企业认证于' + $.time.format('yyyy-mm-dd') + '，审核通过，请注意查看';
              } else {
                content = '您申请的' + name + '企业认证于' + $.time.format('yyyy-mm-dd') + '，审核未通过，请注意查看';
              }
              time = $.time10();
              _context14.next = 12;
              return $.mysql.push($.conf.mysql.main, 'insert into msg (cid ,content,time) values(?,?,?)', [id, content, time]);

            case 12:
              ctx.result.ok.data = data;
              $.flush(ctx, ctx.result.ok);

            case 14:
            case 'end':
              return _context14.stop();
          }
        }
      }, _callee14, undefined);
    }));

    return function companyExamine(_x27, _x28) {
      return _ref14.apply(this, arguments);
    };
  }(),

  '/edit/job': function () {
    var _ref15 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee15(ctx, next) {
      var _ctx$request$body, name, address, statement, requirements, pay, area, benefit, education, experience, status, id, data;

      return _regenerator2.default.wrap(function _callee15$(_context15) {
        while (1) {
          switch (_context15.prev = _context15.next) {
            case 0:
              _ctx$request$body = ctx.request.body, name = _ctx$request$body.name, address = _ctx$request$body.address, statement = _ctx$request$body.statement, requirements = _ctx$request$body.requirements, pay = _ctx$request$body.pay, area = _ctx$request$body.area, benefit = _ctx$request$body.benefit, education = _ctx$request$body.education, experience = _ctx$request$body.experience, status = _ctx$request$body.status, id = _ctx$request$body.id;
              _context15.next = 3;
              return mysql.query(MYSQL.XIONGAN, ['update job set name = ?, address = ?, statement = ?, requirements = ?, pay = ?, area = ?, benefit = ?, education = ?, experience = ?,status=? where id =?'], [name, address, statement, requirements, pay, area, benefit, education, experience, status, id]);

            case 3:
              data = _context15.sent;

              sheet[0].data = data;
              ctx.body = sheet[0];

            case 6:
            case 'end':
              return _context15.stop();
          }
        }
      }, _callee15, undefined);
    }));

    return function editJob(_x29, _x30) {
      return _ref15.apply(this, arguments);
    };
  }(),

  '/hot/job': function () {
    var _ref16 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee16(ctx, next) {
      var _ctx$request$body2, ishot, id, data;

      return _regenerator2.default.wrap(function _callee16$(_context16) {
        while (1) {
          switch (_context16.prev = _context16.next) {
            case 0:
              _ctx$request$body2 = ctx.request.body, ishot = _ctx$request$body2.ishot, id = _ctx$request$body2.id;
              _context16.next = 3;
              return mysql.query(MYSQL.XIONGAN, ['update job set ishot = ? where id =?'], [ishot, id]);

            case 3:
              data = _context16.sent;

              sheet[0].data = data;
              ctx.body = sheet[0];

            case 6:
            case 'end':
              return _context16.stop();
          }
        }
      }, _callee16, undefined);
    }));

    return function hotJob(_x31, _x32) {
      return _ref16.apply(this, arguments);
    };
  }(),

  '/job/examine': function () {
    var _ref17 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee17(ctx, next) {
      var _ctx$request$body3, id, examine, reason, examine_time, content, job, data;

      return _regenerator2.default.wrap(function _callee17$(_context17) {
        while (1) {
          switch (_context17.prev = _context17.next) {
            case 0:
              _ctx$request$body3 = ctx.request.body, id = _ctx$request$body3.id, examine = _ctx$request$body3.examine, reason = _ctx$request$body3.reason;
              examine_time = _.now().toString().substr(0, 10);
              content = [];
              _context17.next = 5;
              return mysql.query(MYSQL.XIONGAN, ['update job set examine = ?, examine_time=? where id=?'], [examine, examine_time, id]);

            case 5:
              job = _context17.sent;
              _context17.next = 8;
              return mysql.query(MYSQL.XIONGAN, ['select A.*,B.id from job A,company B where A.id=? and A.cid = B.id '], [id]);

            case 8:
              data = _context17.sent;

              if (data[0].examine == 1) {
                content = '您申请的' + data[0][0].name + '岗位认证于' + time.format('yyyy-MM-dd') + '，审核通过，请注意查看';
              } else {
                content = '您申请的' + data[0][0].name + '岗位认证于' + time.format('yyyy-MM-dd') + '，审核未通过，原因为' + reason + '，请注意查看';
              }
              _context17.next = 12;
              return mysql.query(MYSQL.XIONGAN, ['insert into msg (cid ,content,time,reason) values(?,?,?,?)'], [data[0][0].cid, content, examine_time, reason]);

            case 12:
              sheet[0].data = job;
              ctx.body = sheet[0];

            case 14:
            case 'end':
              return _context17.stop();
          }
        }
      }, _callee17, undefined);
    }));

    return function jobExamine(_x33, _x34) {
      return _ref17.apply(this, arguments);
    };
  }()
};

exports.delete = {};