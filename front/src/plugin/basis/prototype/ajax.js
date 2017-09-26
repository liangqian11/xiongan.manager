//---------------------------------------------------------------------------- Package
import Vue from 'vue'
//---------------------------------------------------------------------------- Exports
export default {
  //-------------------------------------------------------------------------- Load
  /**
   * 加载页面数据时的load方法
   * @param String url 必填：获取数据的URL地址字符串
   */
  load (url) {
    return new Promise((resolve, reject) => {
      Vue.http.get(Vue.conf.url.restful + '/' + url, null).then((res) => {
        if (parseInt(res.body.result) === 0) {
          resolve(res.body)
          return
        }
        reject(res.body)
      }, (err) => {
        reject(err)
      })
    })
  },
  //-------------------------------------------------------------------------- Get
  /**
   * ajax get方法
   */
  get (url, callSuccess, callLogicError) {
    Vue.http.get(Vue.conf.url.restful + '/' + url, null).then((res) => {
      if (parseInt(res.body.result) === 0) {
        callSuccess(res.body)
        return
      }
      callLogicError(res.body)
    }, (err) => {
      this._errorHandler(err)
      throw err
    })
  },
  //-------------------------------------------------------------------------- Delete
  /**
   * ajax delete方法
   */
  delete (url, callSuccess, callLogicError) {
    Vue.http.delete(Vue.conf.url.restful + '/' + url, null).then((res) => {
      if (parseInt(res.body.result) === 0) {
        callSuccess(res.body)
        return
      }
      callLogicError(res.body)
    }, (err) => {
      this._errorHandler(err)
      throw err
    })
  },
  //-------------------------------------------------------------------------- Post
  /**
   * ajax post方法
   * @param  {[type]} url            [description]
   * @param  {[type]} args           [description]
   * @param  {[type]} callSuccess    [description]
   * @param  {[type]} callLogicError [description]
   * @return {[type]}                [description]
   */
  post (url, args, callSuccess, callLogicError) {
    Vue.http.post(Vue.conf.url.restful + '/' + url, args).then((res) => {
      if (parseInt(res.body.result) === 0) {
        callSuccess(res.body)
        return
      }
      callLogicError(res.body)
    }, (err) => {
      this._errorHandler(err)
      throw err
    })
  },
  //-------------------------------------------------------------------------- Put
  /**
   * ajax put方法
   */
  put (url, args, callSuccess, callLogicError) {
    Vue.http.put(Vue.conf.url.restful + '/' + url, args).then((res) => {
      if (parseInt(res.body.result) === 0) {
        callSuccess(res.body)
        return
      }
      callLogicError(res.body)
    }, (err) => {
      this._errorHandler(err)
      throw err
    })
  },
  //-------------------------------------------------------------------------- Upload
  /**
   * ajax upload方法
   * @param  {[type]} url            [description]
   * @param  {[type]} args           [description]
   * @param  {[type]} callSuccess    [description]
   * @param  {[type]} callLogicError [description]
   * @return {[type]}                [description]
   */
  upload (url, args, callSuccess, callLogicError) {
    Vue.http.post(Vue.conf.url.upload + '/' + url, args).then((res) => {
      if (parseInt(res.body.result) === 0) {
        callSuccess(res.body)
        return
      }
      callLogicError(res.body)
    }, (err) => {
      this._errorHandler(err)
      throw err
    })
  },
  //-------------------------------------------------------------------------- _errorHandler
  /**
   * ajax 网络错误处理器
   */
  _errorHandler (err) {
    console.log('网络出错！')
    console.log(err)
  }
}