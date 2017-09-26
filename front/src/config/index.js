//---------------------------------------------------------------------------- Package
const _ = require('lodash')
//---------------------------------------------------------------------------- Environment
const env = require('./env')
//---------------------------------------------------------------------------- Misc
const msg = require('./misc/msg')
const paging = require('./misc/paging')
const lifecycle = require('./misc/lifecycle')
//---------------------------------------------------------------------------- Config
let config = null
switch (env.env.toLowerCase()) {
	case 'pro':
	config = require('./config/pro')
	break
	case 'dev':
	config = require('./config/dev')
	break
	default: break
}
//---------------------------------------------------------------------------- Exports
module.exports = _.merge(env, config, msg, paging, lifecycle)