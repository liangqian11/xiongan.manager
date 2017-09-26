//---------------------------------------------------------------------------- Package
const _ = require('lodash')
//---------------------------------------------------------------------------- Xiongan
const cultivate = require('./router/xiongan/cultivate')
const examine = require('./router/xiongan/examine')
const home = require('./router/xiongan/home')
const live= require('./router/xiongan/live')
//---------------------------------------------------------------------------- 测试上传
// const upload = require('./router/test/upload')
//---------------------------------------------------------------------------- 合并子路由
const xiongan = _.merge(cultivate, examine, home, live)
//---------------------------------------------------------------------------- 全并所有路由
const router = _.merge(xiongan)
//---------------------------------------------------------------------------- 导出路由集合
module.exports = router