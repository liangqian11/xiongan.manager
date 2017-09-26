//---------------------------------------------------------------------------- Package
import _ from 'lodash'
//---------------------------------------------------------------------------- Wechat
import wechat_config from './config'
import wechat_auth from './auth'
//---------------------------------------------------------------------------- Exports
const install = function (Vue, config) {
  if (install.installed) return
  install.installed = true

  /**
   * Global
   */
  Vue.wechat = {
  	config: wechat_config,
    auth: wechat_auth
  }
}
//---------------------------------------------------------------------------- Exports
module.exports = {
  install
}
