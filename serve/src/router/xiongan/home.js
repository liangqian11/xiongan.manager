//---------------------------------------------------------------------------- Package
const _ = require('lodash')
//---------------------------------------------------------------------------- Config
const { MYSQL } = require('../../config')
//---------------------------------------------------------------------------- Plugin
const mysql = require('../../plugin/util/mysql')
const sheet = require('../../plugin/util/sheet')
//---------------------------------------------------------------------------- GET
exports.get = {
  /**
   * 区域列表
   */
  '/area/list': async (ctx, next) => {
    let area = await mysql.query(MYSQL.XIONGAN, ['select * from area'], [null])
    sheet[0].data = area[0]
    ctx.body = sheet[0]
  },
  /**
   * 首页轮播列表
   */
  '/swiper/list': async (ctx, next) => {
    let swiper = await mysql.query(MYSQL.XIONGAN, ['select * from swiper'], [null])
    sheet[0].data = swiper[0]
    ctx.body = sheet[0]
  },
  /**
   * 登录
   */
  '/user/login/:username/:password': async (ctx, next) => {
    let username = ctx.params.username
    let password = ctx.params.password
    let data = await mysql.query(MYSQL.XIONGAN, ['select * from admin where username=? and password = ?'], [username,password])
    if(data.length > 0){
      sheet[0].data = data
      ctx.body = sheet[0]
    }else{
      sheet[1004].data = data
      sheet[1004].massage = '账号或密码错误'
      ctx.body = sheet[1004]
    }
  },
}
// ---------------------------------------------------------------------------- POST
exports.post = {
   /**
   * 添加区域
   */
  '/add/area': async (ctx, next) => {
    let { name } =ctx.request.body
    let data=await mysql.query(MYSQL.XIONGAN, ['insert into area (name) values (?) '], [name])
    sheet[0].message='添加成功'
    ctx.body = sheet[0]
  },
   /**
   * 添加轮播
   */
  '/swiper/add': async (ctx, next) => {
    let { url, sort } = ctx.request.body
    let sql = ['insert into swiper ( sort, url ) values(?,?)']
    let arg = [sort,url]
    await mysql.query(MYSQL.XIONGAN, sql, arg)
    sheet[0].message='添加成功'
    ctx.body = sheet[0]
  },
}
// ---------------------------------------------------------------------------- PUT
exports.put = {
   /**
   * 编辑区域
   */
  '/edit/area': async (ctx, next) => {
    if (!_.isArray(ctx.request.body)) {
			ctx.request.body = [ctx.request.body]
		}
    let sql = []
    let arg = []
		for (let item of ctx.request.body) {
      let { name, id } = item
      sql.push('update area set name=? where id =?')
      arg.push([ name, id ])
		}
    await mysql.query(MYSQL.XIONGAN, sql, arg)
    sheet[0].message='更新成功'
    ctx.body = sheet[0]
  },
  /**
   * 编辑轮播
   */
  '/edit/swiper': async (ctx, next) => {
    if (!_.isArray(ctx.request.body)) {
			ctx.request.body = [ctx.request.body]
		}
    let sql = []
    let arg = []
		for (let item of ctx.request.body) {
      let { sort, id } = item
      sql.push('update swiper set sort=? where id =?')
      arg.push([ sort, id ])
		}
    await mysql.query(MYSQL.XIONGAN, sql, arg)
    sheet[0].message='更新成功'
    ctx.body = sheet[0]
  },
  
}
// ---------------------------------------------------------------------------- DELETE
exports.delete = {
  /**
   * 删除轮播
   */
  '/swiper/remove/:ids': async (ctx, next) => {
    let ids = ctx.params.ids
    ids = ids.replace(/[|]/g, ',')
    let sql = ['delete from swiper where id in (' + ids + ')']
    let arg = null
    await mysql.query(MYSQL.XIONGAN, sql, arg)
    sheet[0].message='删除成功'
    ctx.body = sheet[0]
  }
}