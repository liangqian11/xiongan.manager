//---------------------------------------------------------------------------- Package
const xml2js = require('xml2js')
//---------------------------------------------------------------------------- toXml
/**
 * 将json制作为xml字符串
 * @params {Object} obj
 */
exports.toXml = function (obj) {
  let builder = new xml2js.Builder({ allowSurrogateChars: true })
  let xml = builder.buildObject({ xml:obj })
  return xml
}
//---------------------------------------------------------------------------- toObj
/**
 * 将xml字符串转换为object
 * @params {String} xml
 */
exports.toObj = function (xml) {
  return new Promise(function (resolve, reject) {
    xml2js.parseString(xml, { trim: true, explicitArray: false }, function (err, obj) {
      if (err) reject(err)
      else resolve(obj)
    })   
  })
}
