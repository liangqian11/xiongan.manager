//---------------------------------------------------------------------------- Package
const _ = require('lodash');
//---------------------------------------------------------------------------- Xiongan
const article = require('./router/xiongan/article');
const company = require('./router/xiongan/company');
const culture = require('./router/xiongan/culture');
const login = require('./router/xiongan/login');
const policy = require('./router/xiongan/policy');
const wanted = require('./router/xiongan/wanted');
//---------------------------------------------------------------------------- 测试上传
// const upload = require('./router/test/upload')
//---------------------------------------------------------------------------- 合并子路由
const xiongan = _.merge(article, company, culture, login, policy, wanted);
//---------------------------------------------------------------------------- 全并所有路由
const router = _.merge(xiongan);
//---------------------------------------------------------------------------- 导出路由集合
module.exports = router;