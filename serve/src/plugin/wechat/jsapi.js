//---------------------------------------------------------------------------- Package
const request = require('request')
const jsSHA = require('jssha')
const Redis = require('ioredis')
//---------------------------------------------------------------------------- Config
const { REDIS, WECHAT } = require('../../config')
//---------------------------------------------------------------------------- Plugin
const log = require('../util/log')
const serial = require('../util/serial')
const time = require('../util/time')
//---------------------------------------------------------------------------- Local
const wetoken = require('./token')
//---------------------------------------------------------------------------- Object
const redis = new Redis(REDIS.MAIN.PORT, REDIS.MAIN.HOST)
//---------------------------------------------------------------------------- getConfig
/**
 * 生成微信JS API 配置项
 * 
 * http://mp.weixin.qq.com/wiki/7/aaa137b55fb2e0456bf8dd9148dd613f.html#.E9.99.84.E5.BD.951-JS-SDK.E4.BD.BF.E7.94.A8.E6.9D.83.E9.99.90.E7.AD.BE.E5.90.8D.E7.AE.97.E6.B3.95
 * @callmethod GET
 * @param {String} url 必须参数，签名用的url必须是调用JS接口页面的完整URL，其中的特殊字符，例如&、空格必须转义为%26、%20，参考：http://www.w3school.com.cn/tags/html_ref_urlencode.html
 * @param {String} noncestr 必须参数，使用者自己生成的一个随机字符串，签名用的noncestr必须与wx.config中的nonceStr相同
 * @param {String} timestamp 必须参数，使用者在调用微信 JS API 时的Unix时间戳，签名用的timestamp必须与wx.config中的timestamp相同
 * @return {String} 返回JSON字符串, 其适用于wx.config配置，包括:
 * {
 * 		appId: appId,
 * 		timestamp: timestamp,
 * 		nonceStr: nonceStr,
 * 		signature: signature
 * }
 */
exports.getConfig = async function (url) {

  // 声明对象
  var result = {
    jsapi_ticket: await _getTicket(),
    nonceStr: serial.nonceStr(),
    timestamp: time.time(),
    url: url
  }

  // 添加签名
  var string = _raw(result)
  var shaObj = new jsSHA('SHA-1', 'TEXT')  //new jsSHA(string, 'TEXT');
  shaObj.update(string)
  result.signature = shaObj.getHash("HEX")  //shaObj.getHash('SHA-1', 'HEX');

  // 添加appId
  result.appId = WECHAT.APPID

  // 删除不必要的返回参数
  delete result.jsapi_ticket
  
  // 返回
  return result
}
//---------------------------------------------------------------------------- _getTicket
/**
 * 获取wechat jsapi ticket
 * http://mp.weixin.qq.com/wiki/7/aaa137b55fb2e0456bf8dd9148dd613f.html
 */
const _getTicket = async function () {
  return new Promise(async function (resolve, reject) {
    try {
      // 获取redis中的ticket
      let redis_ticket = await redis.get('wechat_jsapi_ticket')
      redis_ticket = redis_ticket ? JSON.parse(redis_ticket) : {time:0}
      log.info('获取redis wechat_jsapi_ticket: ' + JSON.stringify(redis_ticket))

      // time===0，或time还有20秒就过期，需要刷新
      if (redis_ticket.time === 0 || (new Date()).getTime() - redis_ticket.time > 7180000) {
        log.info('redis wechat_jsapi_ticket不存在或已超时，使用新获取的wechat_jsapi_ticket')
        let token = await wetoken.getToken()
        let ticket = await _requestTicket(token)
        _saveTicket(ticket)
        resolve(ticket)
        return
      }

      // 如果已经存在，则查看是否超时，如果未超时，直接返回redis中已存在的ticket
      log.info('使用已存在的redis wechat_jsapi_ticket')
      resolve(redis_ticket.ticket)
    } catch (err) {
      log.error(err)
    }
  })
}
//---------------------------------------------------------------------------- _requestTicket
/**
 * （Promise）取回微信jsapi ticket
 * @return 取回的token json
 */
const _requestTicket = function (token) {
  return new Promise(function (resolve, reject) {
    let url = "https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token=" + token + "&type=jsapi"
    request(url, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        log.info('request获得wechat_jsapi_ticket信息: ' + body)
        let ticket = JSON.parse(body)
        if (ticket.errcode) {
          reject('获取wechat_jsapi_ticket时，返回码错误: ' + body)
        } else {
          resolve(ticket.ticket)
        }
      }
      reject('获取wechat_jsapi_ticket时，网络出错')
    })
  })
}
//---------------------------------------------------------------------------- _saveTicket
/**
 * 保存ticket到redis服务器，并自动填写时间
 */
const _saveTicket = function (ticket) {
  let value = '{"ticket": "' + ticket + '", "time": ' + (new Date()).getTime() + '}'
  redis.set('wechat_jsapi_ticket', value)
  log.info('保存redis wechat_jsapi_ticket: ' + value)
}
//---------------------------------------------------------------------------- _raw
/**
 * 将对象生成原始字符串
 */
const _raw = function (args) {
  var keys = Object.keys(args)
  keys = keys.sort()
  var newArgs = {}
  keys.forEach(function (key) {
    newArgs[key.toLowerCase()] = args[key]
  })
  var string = ''
  for (var k in newArgs) {
    string += '&' + k + '=' + newArgs[k]
  }
  string = string.substr(1)
  return string
}
