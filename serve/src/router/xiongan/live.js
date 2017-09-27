//---------------------------------------------------------------------------- Package
const _ = require('lodash')
//---------------------------------------------------------------------------- Config
const { MYSQL } = require('../../config')
//---------------------------------------------------------------------------- Plugin
const mysql = require('../../plugin/util/mysql')
const sheet = require('../../plugin/util/sheet')
// ---------------------------------------------------------------------------- GET
exports.get = {
 /**
  * 直播列表
  */
  '/live/list/manager': async (ctx, next) =>{
    let arg = []
    let where = ''
    let limit = ' limit 0,10'
    if(ctx.query.name){
      where = where == '' ? ' where name like "%'+ ctx.query.name +'%"' : where + ' and name like "%'+ ctx.query.name +'%"'
    }
    if(ctx.query.page > 0){
      limit = ' limit ' + (ctx.query.page-1)*10 + ',10'
    }
    let data = await mysql.query(MYSQL.XIONGAN, ['select * from live' + where + ' order by time desc ' + limit], arg)
    sheet[0].data = data[0]
    ctx.body = sheet[0]
  },
  /**
   * 直播详情
   */
  '/live/detail/manager/:id': async (ctx, next) =>{
    let id = ctx.params.id
    let data = await mysql.query(MYSQL.XIONGAN, ['select * from live where id = ?'], [id])
    sheet[0].data = data[0]
    ctx.body = sheet[0]
  }
}
// ---------------------------------------------------------------------------- POST
exports.post = {
  /**
   * 添加直播
   */
  '/live/add': async (ctx, next) => {
    let {name, img, href, time, status} = ctx.request.body
    time = Date.parse(new Date(time.replace(/\T/g,' '))).toString().slice(0,10)
    let today = Date.parse(new Date()).toString().slice(0,10)
    if(time > today){
      status = 0
    }else{
      status = 1
    }
    let data = await mysql.query(MYSQL.XIONGAN, ['insert into live (name,img,href,time,status) values(?,?,?,?,?)'], [name,img,href,time,status])
    sheet[0].message = '添加成功'
    ctx.body = sheet[0]
  }
}
// ---------------------------------------------------------------------------- PUT
exports.put = {
  /**
   * 编辑直播
   */
  '/live/edit/manager': async (ctx, next) =>{
    let {name, img, href, time, status, end_time, id} = ctx.request.body
    time = Date.parse(new Date(time.replace(/\T/g,' '))).toString().slice(0,10)
    let today = Date.parse(new Date()).toString().slice(0,10)
    if(status==true){
      status = 2
      end_time = today
    }else if(status==false && time > today){
      status = 0
    }else{
      status = 1
    }
    let data = await mysql.query(MYSQL.XIONGAN, ['update live set name=?, img=?, href=?, time=?, status=?, end_time=? where id=?'], [name,img,href,time,status,end_time,id])
    sheet[0].data = data[0]
    ctx.body = sheet[0]
  },
   /**
   * 行更新
   */
  '/live/uprow': async (ctx, next) => {
    if (!_.isArray(ctx.request.body)) {
      ctx.request.body = [ctx.request.body]
    }
    await mysql.query(MYSQL.XIONGAN, ['update live set ishome=0'], [null])
    let sql = []
    let arg = []
    for (let item of ctx.request.body) {
      let { ishome, id } = item
      if(item.ishome==true){
        item.ishome = 1
      }else{
        item.ishome = 0
      }
      sql.push('update live set ishome=? where id=?')
      arg.push([ishome, id])
    }
    await mysql.query(MYSQL.XIONGAN, sql, arg)
    sheet[0].message = '更新成功!'
    ctx.body = sheet[0]
  },
}
// ---------------------------------------------------------------------------- DELETE
exports.delete = {
  /**
   * 删除直播
   */
  '/live/delete/manager/:ids': async (ctx, next) =>{
    let ids = ctx.params.ids
    ids = ids.replace(/[|]/g, ',')
    let sql = ['delete from live where id in (' + ids + ')']
    let arg = null
    await mysql.query(MYSQL.XIONGAN, sql, arg)
    sheet[0].message = '删除成功!'
    ctx.body = sheet[0]
  }
}