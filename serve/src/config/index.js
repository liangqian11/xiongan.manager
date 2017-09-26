const _ = require('lodash')
const ENV = require('./env')
const WECHAT = require('./wechat/wechat')
const WEPAY = require('./wechat/wepay')

let STROAGE = null
if (ENV.ENV.toLowerCase() === 'pro') {
  STROAGE = require('./stroage/pro')
} else {
  STROAGE = require('./stroage/dev')
}

module.exports = _.merge(ENV, STROAGE, WECHAT, WEPAY)
