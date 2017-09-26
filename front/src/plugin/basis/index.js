//---------------------------------------------------------------------------- Package
import _ from 'lodash'
//---------------------------------------------------------------------------- Filter
import filter_datetime from './filter/datetime'
import filter_price from './filter/price'
//---------------------------------------------------------------------------- Prototype
import $msg from './prototype/msg'
import $query from './prototype/query'
import $ajax from './prototype/ajax'
import $check from './prototype/check'
import $lifecycle from './prototype/lifecycle'
import $dom from './prototype/dom'
import $time from './prototype/time'
import $upload from './prototype/upload'
import $sess from './prototype/sess'
import $valid from './prototype/valid'
//---------------------------------------------------------------------------- Component
import comp_loader_one from './component/loader/one'
import comp_loader_full from './component/loader/full'
import comp_data_adder from './component/data/adder'
import comp_data_updater from './component/data/updater'
import comp_data_lister from './component/data/lister'
import comp_data_customer from './component/data/customer'
import comp_widget_paging from './component/widget/paging'
import comp_widget_loader from './component/widget/loader'
//---------------------------------------------------------------------------- Manager
import comp_manager_title from './component/manager/title'
//---------------------------------------------------------------------------- Manager List
import comp_manager_list_header from './component/manager/list/header'
//---------------------------------------------------------------------------- Manager Form
import comp_manager_form_input from './component/manager/form/input'
import comp_manager_form_button from './component/manager/form/button'
import comp_manager_form_upload from './component/manager/form/upload'
import comp_manager_form_row from './component/manager/form/row'
//---------------------------------------------------------------------------- Install
const install = function (Vue, config) {
  if (install.installed) return
  install.installed = true

  /**
   * Global
   */
  Vue.conf = config
  Vue.ajax = $ajax
  Vue.msg = $msg
  Vue.query = $query
  Vue.time = $time
  Vue.valid = $valid

  /**
   * Filter
   */
  Vue.filter('datetime', filter_datetime)
  Vue.filter('price', filter_price)

  /**
   * Component
   */
  Vue.component('h-loader-one', comp_loader_one)
  Vue.component('h-loader-full', comp_loader_full)
  Vue.component('h-data-adder', comp_data_adder)
  Vue.component('h-data-updater', comp_data_updater)
  Vue.component('h-data-lister', comp_data_lister)
  Vue.component('h-data-customer', comp_data_customer)
  Vue.component('h-widget-paging', comp_widget_paging)
  Vue.component('h-widget-loader', comp_widget_loader)

  /**
   * Manager normal
   */
  Vue.component('m-title', comp_manager_title)

  /**
   * Manager List
   */
  Vue.component('ml-header', comp_manager_list_header)

  /**
   * Manager Form
   */
  Vue.component('mf-input', comp_manager_form_input)
  Vue.component('mf-button', comp_manager_form_button)
  Vue.component('mf-upload', comp_manager_form_upload)
  Vue.component('mf-row', comp_manager_form_row)

  /**
   * Prototype
   */
  Object.defineProperties(Vue.prototype, {
    $conf: {
      get () {
        return config
      }
    },
    $query: {
      get () {
        return $query
      }
    },
    $dom: {
      get () {
        return $dom
      }
    },
    $time: {
      get () {
        return $time
      }
    },
    $ajax: {
      get () {
        return $ajax
      }
    },
    $check: {
      get () {
        return $check
      }
    },
    $upload: {
      get () {
        return $upload
      }
    },
    $valid: {
      get () {
        return $valid
      }
    },
    $msg: {
      get () {
        return $msg
      }
    },
    $sess: {
      get () {
        return $sess
      }
    },
    $lifecycle: {
      get () {
        if (!this.$conf.lifecycle) {
          return $lifecycle
        }
        return {
          loadBefore: this.$conf.lifecycle.loadBefore || $lifecycle.loadBefore,
          loadAfter: this.$conf.lifecycle.loadAfter || $lifecycle.loadAfter,
          loadError: this.$conf.lifecycle.loadError || $lifecycle.loadError,
          uploadBefore: this.$conf.lifecycle.uploadBefore || $lifecycle.uploadBefore,
          uploadAfter: this.$conf.lifecycle.uploadAfter || $lifecycle.uploadAfter,
          uploadError: this.$conf.lifecycle.uploadError || $lifecycle.uploadError,
          addBefore: this.$conf.lifecycle.addBefore || $lifecycle.addBefore,
          addAfter: this.$conf.lifecycle.addAfter || $lifecycle.addAfter,
          addError: this.$conf.lifecycle.addError || $lifecycle.addError,
          updateBefore: this.$conf.lifecycle.updateBefore || $lifecycle.updateBefore,
          updateAfter: this.$conf.lifecycle.updateAfter || $lifecycle.updateAfter,
          updateError: this.$conf.lifecycle.updateError || $lifecycle.updateError,
          updateCheckedEmpty: this.$conf.lifecycle.updateCheckedEmpty || $lifecycle.updateCheckedEmpty,
          updateCheckedBefore: this.$conf.lifecycle.updateCheckedBefore || $lifecycle.updateCheckedBefore,
          updateCheckedAfter: this.$conf.lifecycle.updateCheckedAfter || $lifecycle.updateCheckedAfter,
          updateCheckedError: this.$conf.lifecycle.updateCheckedError || $lifecycle.updateCheckedError,
          updateAllEmpty: this.$conf.lifecycle.updateAllEmpty || $lifecycle.updateAllEmpty,
          updateAllBefore: this.$conf.lifecycle.updateAllBefore || $lifecycle.updateAllBefore,
          updateAllAfter: this.$conf.lifecycle.updateAllAfter || $lifecycle.updateAllAfter,
          updateAllError: this.$conf.lifecycle.updateAllError || $lifecycle.updateAllError,
          removeBefore: this.$conf.lifecycle.removeBefore || $lifecycle.removeBefore,
          removeAfter: this.$conf.lifecycle.removeAfter || $lifecycle.removeAfter,
          removeError: this.$conf.lifecycle.removeError || $lifecycle.removeError,
          removeCheckedEmpty: this.$conf.lifecycle.removeCheckedEmpty || $lifecycle.removeCheckedEmpty,
          removeCheckedBefore: this.$conf.lifecycle.removeCheckedBefore || $lifecycle.removeCheckedBefore,
          removeCheckedAfter: this.$conf.lifecycle.removeCheckedAfter || $lifecycle.removeCheckedAfter,
          removeCheckedError: this.$conf.lifecycle.removeCheckedError || $lifecycle.removeCheckedError,
          removeAllEmpty: this.$conf.lifecycle.removeAllEmpty || $lifecycle.removeAllEmpty,
          removeAllBefore: this.$conf.lifecycle.removeAllBefore || $lifecycle.removeAllBefore,
          removeAllAfter: this.$conf.lifecycle.removeAllAfter || $lifecycle.removeAllAfter,
          removeAllError: this.$conf.lifecycle.removeAllError || $lifecycle.removeAllError
        }
      }
    }
  })
}
//---------------------------------------------------------------------------- Exports
module.exports = {
  install
}
