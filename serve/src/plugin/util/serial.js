//---------------------------------------------------------------------------- nonceStr
/**
 * 生成微信32位随机字符串
 */
exports.nonceStr = function (length) {
  let chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let maxPos = chars.length
  let nonceStr = ''
  for (let i = 0; i < (length || 32); i++) {
    nonceStr += chars.charAt(Math.floor(Math.random() * maxPos))
  }
  return nonceStr
}
//---------------------------------------------------------------------------- GenChar
/**
 * 生成随机Char类型的字符串
 * @param  {Number} length 生成随机字符串的长度
 * @return {[type]}        已生成的随机字符串
 */
exports.genchar = function (length = 4) {
	return gencode('char', length)
}
//---------------------------------------------------------------------------- GenNumber
/**
 * 生成随机Number类型的字符串
 * @param  {Number} length 生成随机字符串的长度
 * @return {[type]}        已生成的随机字符串
 */
exports.gennumber = function (length = 4) {
	return gencode('number', length)
}
//---------------------------------------------------------------------------- GenMixed
/**
 * 生成随机Mixed类型的字符串
 * @param  {Number} length 生成随机字符串的长度
 * @return {[type]}        已生成的随机字符串
 */
exports.genmixed = function (length = 8) {
	return gencode('mixed', length)
}
//---------------------------------------------------------------------------- GenCode
/**
 * 生成随机字符串的实际方法
 * @param  {String} type   生成的类型，可选char, number, mixed
 * @param  {Number} length 生成字符串的长度
 * @return {String}        已生成的随机字符串
 */
function gencode (type, length) {

	// 确认生成时使用的字符串，以及字符串的长度
	let source = {
		chars: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
		number: '0123456789',
		mixed: 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
	}
	source = source[type]
	let maxPos = source.length

	// 生成随机字符串，并将其返回
	let result = ''
	for (let i = 0; i < length; i++) {
		result += source.charAt(Math.floor(Math.random() * maxPos))
	}
	return result
}

