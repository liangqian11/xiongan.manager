import Vue from 'vue'
import { Toast } from 'mint-ui'

export default {
  /**
   * 操作成功提示
   * @param String msg 必填：成功提示字符串
   */
  success (msg) {
    if (!msg) {
      msg = '操作成功'
    }
    Toast({
      message: msg,
      position: 'middle',
      className: 'success',
      duration: 2000
    })
  },

  /**
   * 操作失败提示
   * @param String msg 必填：错误提示字符串
   */
  error (msg) {
    if (!msg) {
      msg = '操作失败'
    }
    Toast({
      message: msg,
      position: 'middle',
      className: 'testname',
      duration: 2000
    })
  }
}
