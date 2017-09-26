//---------------------------------------------------------------------------- Package
import _ from 'lodash'
//---------------------------------------------------------------------------- Exports
export default {
	//-------------------------------------------------------------------------- all
	/**
	 * 获取所有get参数，并组成对象
	 * @return {Object} queryString解析后的Object对象
	 */
	all (defaults) {
	  let args = {}
	  let ps = _.split(window.location.href, '?')
	  ps = _.split(ps[ps.length - 1], '&')
	  for (let p of ps) {
	    let arr = _.split(p, '=')
	    args[arr[0]] = decodeURI(arr[1])
	  }
	  for (let key in defaults) {
	  	if (args[key] === undefined) {
	  		args[key] = defaults[key]
	  	}
	  }
	  return args
	},
	/**
	 * 获取所有get参数，并组成对象
	 * @return {Object} queryString解析后的Object对象
	 */
	getall (defaults) {
	  let args = {}
	  let ps = _.split(window.location.href, '?')
	  if( ps.length>1){
	  	ps = _.split(ps[ps.length - 1], '&')
	  }else {
	  	return args
	  }
	  for (let p of ps) {
	    let arr = _.split(p, '=')

	    args[arr[0]] = decodeURI(arr[1])
	  }
	  for (let key in defaults) {
	  	if (args[key] === undefined) {
	  		args[key] = defaults[key]
	  	}
	  }
	  return args
	},
	//-------------------------------------------------------------------------- get
	/**
	 * 获取单个get参数,如果此值不存在，则返回默认值（默认为空字符串）
	 * @param  {String} name 参数名称
	 * @return {String}      想要获取参数的值或默认值
	 */
	get (name, def) {
		def = def ? def : ''
		let obj = this.all()
		return obj[name] ? obj[name] : def
	},
	filename(){
		return window.location.pathname.toString()
	}
}