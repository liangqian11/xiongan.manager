//---------------------------------------------------------------------------- Package
import Vue from 'vue'
import VueResource from 'vue-resource'
import VueRouter from 'vue-router'
import VueCookie from 'vue-cookie'
import MintUI from 'mint-ui'
import Element from 'element-ui'
//---------------------------------------------------------------------------- Config
import config from './config'
//---------------------------------------------------------------------------- Foundation
import HesqBasis from './plugin/basis'
import HesqWechat from './plugin/third/wechat'
//---------------------------------------------------------------------------- Format
require('he-date-format')
//---------------------------------------------------------------------------- Style
import './plugin/style/import'
import './style/skin.less'
import 'mint-ui/lib/style.css'
import 'element-ui/lib/theme-default/index.css'
//---------------------------------------------------------------------------- Use
Vue.use(VueResource)
Vue.use(VueRouter)
Vue.use(VueCookie)
Vue.use(HesqBasis, config)
Vue.use(HesqWechat, config)
Vue.use(MintUI)
Vue.use(Element)
//---------------------------------------------------------------------------- SendCookie
Vue.http.options.credentials = true