//---------------------------------------------------------------------------- Package
const _ = require('lodash')
//---------------------------------------------------------------------------- Config
const { MYSQL } = require('../../config')
//---------------------------------------------------------------------------- Plugin
const mysql = require('../../plugin/util/mysql')
const time = require('../../plugin/util/time')
const sheet = require('../../plugin/util/sheet')
// ---------------------------------------------------------------------------- GET
exports.get = {
    /**
   * 公司列表
   */
  '/get_company/list':async(ctx,next) => {
    let data = await $.mysql.query($.conf.mysql.main,'select * from company where examine = 1 order by id')
    ctx.result.ok.data = data
    $.flush(ctx, ctx.result.ok)
  },
    /**
   * 公司列表详情
   */
  '/get_company/datail/:id':async(ctx,next) => {
    let id = ctx.params.id
    let data = await $.mysql.query($.conf.mysql.main,'select * from company where examine = 1 and id=?',[id])
    ctx.result.ok.data = data
    $.flush(ctx, ctx.result.ok)
  },
    /**
   * 公司列表详情的发布岗位
   */
  '/get_job/datail/:id':async(ctx,next) => {
    let id = ctx.params.id
    let data = await $.mysql.query($.conf.mysql.main,'select A.id,A.examine, B.* from company A, job B where A.id = B.cid and A.examine=1 and A.id = ?',[id])
    ctx.result.ok.data = data
    $.flush(ctx, ctx.result.ok)
  },

  /**
   * 公司审核列表
   */
  '/company/list':async(ctx,next) => {
    let data = await $.mysql.query($.conf.mysql.main,'select * from company where examine = 0 order by id')
    ctx.result.ok.data = data
    $.flush(ctx, ctx.result.ok)
  },
    /**
   * 公司详情
   */
  '/company/detail/:id':async(ctx,next) => {
    let id = ctx.params.id
    let data = await $.mysql.query($.conf.mysql.main,'select * from company where examine = 0 and id=?',[id])
    ctx.result.ok.data = data
    $.flush(ctx, ctx.result.ok)
  },
  /**
   * 岗位列表
   */
  '/job/list':async(ctx,next) => {
    let limit = ' limit 0,15 '
    let where =''
    let {examine,name,page} = ctx.query
    if(ctx.query.examine){
      where = where == ''? ' where examine= '+ examine : where + ' and examine='+ examine
    }
    if(ctx.query.name){
     where = where == ''? ' where name like "%'+ name + '%"': where + ' and name like "%'+ name + '%"'
    }
    if(ctx.query.page > 0){
      limit = ' limit ' + (ctx.query.page - 1) * 15 + ',15'
    }
    let sql = [' select * from job '+ where +' and status < 2 '+ limit ]
    let data = await mysql.query(MYSQL.XIONGAN, sql, null)
    sheet[0].data = data[0]
    ctx.body = sheet[0]
  },
    /**
   * 岗位详情
   */
  '/job/detail/:id':async(ctx,next) => {
    let id = ctx.params.id
    let job = await mysql.query(MYSQL.XIONGAN, ['select A.*,B.name as jtname from job A,job_type B where A.jtid = B.id and A.id=?'], [id])
    sheet[0].data = job[0][0]
    ctx.body = sheet[0]
  },
   /**
   * 区域列表
   */
  '/area/list': async (ctx, next) => {
    let area = await mysql.query(MYSQL.XIONGAN, ['select * from area'], [null])
    sheet[0].data = area[0]
    ctx.body = sheet[0]
  },
  /**
   * 经验要求列表
   */
  '/experience/list': async (ctx, next) => {
    sheet[0].data =['不限','无经验','1年以下','1-3年','3-5年','5-10年','10年以上']
    ctx.body = sheet[0]
  },
  /**
   * 薪资列表
   */
  '/pay/list': async (ctx, next) => {
    sheet[0].data = ['2000以下','2000-3000','3000-5000','5000-10000','10000以上','面议']
    ctx.body = sheet[0]
  },
  /**
   * 福利待遇列表
   */
  '/benefit/list': async (ctx, next) => {
    sheet[0].data = [{name:'五险一金',checked:false},{name:'年底双薪',checked:false},{name:'绩效奖金',checked:false},{name:'年终分红',checked:false},{name:'股票期权',checked:false},{name:'加班补助',checked:false},{name:'全勤奖',checked:false},{name:'包吃包住',checked:false},{name:'交通补助',checked:false},{name:'餐补',checked:false},{name:'房补',checked:false},{name:'通讯补贴',checked:false},{name:'采暖补贴',checked:false},{name:'带薪年假',checked:false},{name:'弹性工作',checked:false},{name:'补充医疗保险',checked:false},{name:'定期体检',checked:false},{name:'免费班车',checked:false},{name:'员工旅游',checked:false},{name:'高温补贴',checked:false},{name:'节日福利',checked:false}]
    ctx.body = sheet[0]
  },
   /**
   * 学历要求列表
   */
  '/education/list': async (ctx, next) => {
    sheet[0].data = ['不限','初中','中技','高中','中专','大专','本科','硕士','MBA','EMBA','博士','其他']
    ctx.body = sheet[0]
  },
   /**
   * 职位类型列表
   */
  '/jobtype/list': async (ctx, next) => {
    let data = await mysql.query(MYSQL.XIONGAN, ['select * from job_type'], [null])
    sheet[0].data = data[0]
    ctx.body = sheet[0]
  },


}
// ---------------------------------------------------------------------------- POST
exports.post = {
 
}
// ---------------------------------------------------------------------------- PUT
exports.put = {
    /**
   * 公司审核
   */
  '/company/examine':async(ctx,next) => {
    let {id,examine,name} = ctx.put
    let content = []
    let data = await $.mysql.push($.conf.mysql.main,'update company set examine = ? where id = ?',[examine,id])
    let company = await $.mysql.query($.conf.mysql.main,'select * from company where id=?',[id])
    if(company[0].examine == 1){
       content = '您申请的'+name+'企业认证于'+$.time.format('yyyy-mm-dd')+'，审核通过，请注意查看'
    }else{
      content = '您申请的'+name+'企业认证于'+$.time.format('yyyy-mm-dd')+'，审核未通过，请注意查看'
    }
    let time = $.time10()
    await $.mysql.push($.conf.mysql.main, 'insert into msg (cid ,content,time) values(?,?,?)', [id ,content,time])
    ctx.result.ok.data = data
    $.flush(ctx, ctx.result.ok)
  },
  /**
   * 职位编辑
   */
  '/edit/job': async (ctx, next) => {
    let {  name, address, statement, requirements,pay, area, benefit, education, experience, status, id } = ctx.request.body
    let data = await mysql.query(MYSQL.XIONGAN, ['update job set name = ?, address = ?, statement = ?, requirements = ?, pay = ?, area = ?, benefit = ?, education = ?, experience = ?,status=? where id =?'],[name, address, statement, requirements,pay, area, benefit, education, experience, status, id])
    sheet[0].data = data
    ctx.body = sheet[0]
  },
  /**
   * 设为热门职位
   */
  '/hot/job': async (ctx, next) => {
    let {  ishot, id } = ctx.request.body
    let data = await mysql.query(MYSQL.XIONGAN, ['update job set ishot = ? where id =?'],[ishot, id])
    sheet[0].data = data
    ctx.body = sheet[0]
  },

    /**
   * 岗位审核
   */
  '/job/examine':async(ctx,next) => {
    let {id,examine,reason} = ctx.request.body
    let examine_time = _.now().toString().substr(0,10)
    let content = []
    let job = await mysql.query(MYSQL.XIONGAN,['update job set examine = ?, examine_time=? where id=?'],[examine,examine_time,id])
    let data = await mysql.query(MYSQL.XIONGAN,['select A.*,B.id from job A,company B where A.id=? and A.cid = B.id '],[id])
    if(data[0].examine == 1){
      content = '您申请的'+data[0][0].name+'岗位认证于'+ time.format('yyyy-MM-dd') +'，审核通过，请注意查看'
    }else{
      content = '您申请的'+data[0][0].name+'岗位认证于'+time.format('yyyy-MM-dd')+'，审核未通过，原因为'+ reason +'，请注意查看'
    }
    await mysql.query(MYSQL.XIONGAN,['insert into msg (cid ,content,time,reason) values(?,?,?,?)'], [data[0][0].cid ,content,examine_time,reason])
    sheet[0].data = job
    ctx.body = sheet[0]
  }
}
// ---------------------------------------------------------------------------- DELETE
exports.delete = {
  
}