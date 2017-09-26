//---------------------------------------------------------------------------- Package
import _ from 'lodash'
import Vue from 'vue'
//---------------------------------------------------------------------------- Exports
export default {
  popup (rootNodeId, color) {
    let v = new Validate(rootNodeId, color)
    return v.popup()
  },
  display (rootNodeId, color) {
    let v = new Validate(rootNodeId, color)
    return v.display()
  },
  color (rootNodeId, color) {
    let v = new Validate(rootNodeId, color)
    return v.colorChange()
  }
}
//---------------------------------------------------------------------------- Validate Class
/**
 * 验证类
 * @type {Object}
 */
class Validate  {
  //-------------------------------------------------------------------------- 构造方法
  /**
   * 构造方法
   * @param {String} rootNodeId   根控件id字符串
   * @param {Object} color        颜色配置项
   */
  constructor (rootNodeId, color) {

    // 根节点
    this.rootNode = document.getElementById(rootNodeId)

    // 正则表达式
    this.reg = {
      username: /^[a-zA-Z0-9_\-]+$/,
      password: /^[a-zA-Z0-9_!@#$%^&*()\-]+$/,
      chinese: /^[\u0391-\uFFE5]+$/,
      number: /^[-\+]?\d+(\.\d+)?$/,
      int: /^[-\+]?\d+$/,
      float: /^[0-9]+([.]{1}[0-9]{1,2})?$/,
      datetime: /^\d{4}-\d{2}-\d{2}\s\d{2}:\d{2}$/,
      date: /^(\d{4})(-|\/)(\d{1,2})\2(\d{1,2})$/,
      time: /^\d{2}:\d{2}$/,
      email: /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
      url: /^(((ht|f)tp(s?))\:\/\/)[a-zA-Z0-9]+\.[a-zA-Z0-9]+[\/=\?%\-&_~`@[\]\':+!]*([^<>\"\"])*$/,
      tel: /^((\(\d{2,3}\))|(\d{3}\-))?(\(0\d{2,3}\)|0\d{2,3}-)?[1-9]\d{6,7}(\-\d{1,4})?$/,
      mobile: /^1\d{10}$|^\d{7,8}$/,
      code: /^[1-9]\d{5}$/,
      card: /(^\d{15}$)|(^\d{17}[0-9Xx]$)/,
      ip: /^(0|[1-9]\d?|[0-1]\d{2}|2[0-4]\d|25[0-5]).(0|[1-9]\d?|[0-1]\d{2}|2[0-4]\d|25[0-5]).(0|[1-9]\d?|[0-1]\d{2}|2[0-4]\d|25[0-5]).(0|[1-9]\d?|[0-1]\d{2}|2[0-4]\d|25[0-5])$/,
      qq: /^[1-9]\d{4,10}$/
    }

    // 颜色配置
    if (!_.isObject(color)) {
      this.color = {
        normalBorderColor: '#999',
        normalTextColor: '#ccc',
        errorBorderColor: '#f00',
        errorTextColor: '#f00'
      }
    } else {
      this.color = color
    }
  }
  //-------------------------------------------------------------------------- Popup
  /**
   * 弹出类型的检查
   * @return {Boolean}    全部控件检查通过返回true，否则返回false
   */
  popup() {

    // 取config和inputNodes
    // 查找错误节点
    // 恢复正常状态
    let inputNodes = this._getInputNodes(this.rootNodeId)
    let errorNodes = this._getErrorNodes(inputNodes)
    this._resumeNormal(inputNodes, 'popup')

    // 声明错误字符串，遍历所有错误节点
    let error = ''
    for (let node of errorNodes) {
      node.style.borderColor = this.color.normalBorderColor
      error += node.getAttribute('vmsg')
    }

    // 如果确实存在错误，则弹出消息，标红窗口，并返回false，否则返回true
    if (errorNodes.length > 0) {
      for (let node of errorNodes) {
      node.style.borderColor = this.color.errorBorderColor
    }
      Vue.msg.error(error)
      return false
    }
    return true
  }
  //-------------------------------------------------------------------------- Display
  /**
   * 显示类型的检查
   * @return {Boolean}    全部控件检查通过返回true，否则返回false
   */
  display () {

    // 同上
    let inputNodes = this._getInputNodes()
    let errorNodes = this._getErrorNodes(inputNodes)
    this._resumeNormal(inputNodes, 'display')

    // 如果存在检查未通过的对象，则显示出错的文本
    let emptyNum = null
    if (errorNodes.length > 0) {
      for (let node of errorNodes) {
        let msg = document.getElementById(node.getAttribute('id'))
        msg.style.display = 'inline'
        //如果所有的表单都未填就提交，则弹框提醒
        if (node.value == ''){
          emptyNum += 1
        }
      }
      if (emptyNum == errorNodes.length){
        window.alert('此框必填')
        return false
      }else{
        window.alert('填写错误')
        return false
      }
    }
    return true
  }
  //-------------------------------------------------------------------------- Color
  /**
   * 变化颜色类的检查
   * @return {Boolean}    全部控件检查通过返回true，否则返回false
   */
  colorChange () {

    // 同上
    let inputNodes = this._getInputNodes(this.rootNodeId)
    let errorNodes = this._getErrorNodes(inputNodes)
    this._resumeNormal(inputNodes, 'color')

    // 如果存在检查未通过的对象，则将文本变色
    if (errorNodes.length > 0) {
      for (let node of errorNodes) {
        let msg = document.getElementById(node.getAttribute('id'))
        msg.style.color = this.color.errorTextColor
      }
      return false
    }
    for (let node of inputNodes) {
        let msg = document.getElementById(node.getAttribute('id'))
        msg.style.color = this.color.normalTextColor
      }
    return true
  }
  //-------------------------------------------------------------------------- _GetInputNodes
  /**
   * 根据根节点，搜索其下的所有输入节点
   * @return {Array}                包含所有输入节点的数组
   */
  _getInputNodes () {
    let allNodes = this.rootNode.getElementsByTagName('*')
    let inputNodes = []
    for (let node of allNodes) {
      let tag = node.tagName.toUpperCase()
      if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') {
        inputNodes.push(node)
      }
    }
    return inputNodes
  }
  //-------------------------------------------------------------------------- _resumeNormal
  /**
   * 将所有控件恢复到正常状态
   * @param  {Array} inputNodes   所有输入控件
   * @param  {Type}  type         恢复的类型，可选值：popup, display, color
   */
  _resumeNormal (inputNodes, type) {


    // 遍历所有节点，将外框变为正常颜色，将文本隐藏并变为正常颜色
    for (let node of inputNodes) {

      // 无论哪种类型，都必须要设置borderColor到正常状态
      node.style.borderColor = this.color.normalBorderColor

      // 如果是其它类型，则还需要进行msg文本的操作
      if (type !== 'popup') {
        let msg = document.getElementById(node.getAttribute('id'))

        if (type === 'display') {
          msg.style.display = 'none'
        } else {
          msg.style.color = this.color.normalTextColor
        } 
      }
    }
  }
  //-------------------------------------------------------------------------- _GetErrorNodes
  /**
   * 获取所有错误节点
   * @param  {Array} inputNodes   包含所有输入节点的数组
   * @return {Array}              包含所有错误节点的数组 
   */
  _getErrorNodes (inputNodes) {
    let errorNodes = []
    for (let node of inputNodes) {
      if (!this._validNode(node)) {
        errorNodes.push(node)
      }
    }
    return errorNodes
  }
  //-------------------------------------------------------------------------- _ValidNode
  /**
   * 验证单个节点
   * @param  {HTMLObject} node  需要验证的节点
   * @return {Boolean}          通过检查返回true，否则返回false
   */
  _validNode (node) {

    // 取各项值
    let value     = node.value
    let novalid   = this._getParam(node, 'novalid')
    let empty     = this._getParam(node, 'empty')
    let type      = this._getParam(node, 'vtype')
    let length    = this._getParam(node, 'vlen')
    let number    = this._getParam(node, 'vnum')
    let equal     = this._getParam(node, 'vequal')
    let server    = this._getParam(node, 'vserve')

    // 不需要验证
    if (novalid) {
      return true
    }
    if (empty == true && value == '') {
      return true
    }

    // 需要验证
    if (type != '' && !this._validType(value, type)) {
      return false
    }
    if (length != '' && !this._validLength(value, length)) {
      return false
    }
    if (number != '' && !this._validNumber(value, number)) {
      return false
    }
    if (equal != '' && !this._validEqual(value, equal)) {
      return false
    }
    if (server != '' && !this._validServer(value, server)) {
      return false
    }

    // 验证结束，返回true
    return true
  }
  //-------------------------------------------------------------------------- _ValidType
  /**
   * 验证值类型
   * @param  {String} value HTML控制的值
   * @param  {String} vreg  需要验证的表达式key（即：vtype值）
   * @return {Boolean}      成功返回true，否则返回false
   */
  _validType (value, vreg) {

    if (this.reg[vreg] === undefined) {
      window.alert('您填写的vtype不存在')
      return false
    }
    return this.reg[vreg].test(value)
  }
  //-------------------------------------------------------------------------- _ValidLength
  /**
   * 验证值长度
   * @param  {String} value HTML控制的值
   * @param  {String} vlen  需要验证的长度大小（即：vlen值）
   * @return {Boolean}      成功返回true，否则返回false
   */
  _validLength (value, vlen) {
    let tmp = vlen.split(',')
    let min = parseInt(tmp[0])
    let max = parseInt(tmp[1])
    if (tmp.length != 2 || isNaN(min) || isNaN(max)) {
      window.alert('您填写的vlen不正确')
      return false
    }
    if (min > max) {
      window.alert('您填写的vlen中最小长度大于最大长度')
      return false
    }
    let len = value.length
    return len >= min && len <= max
  }
  //-------------------------------------------------------------------------- _ValidNumber
  /**
   * 验证值数字大小
   * @param  {String} value HTML控制的值
   * @param  {String} vnum  需要验证的数字大小（即：vnum值）
   * @return {Boolean}      成功返回true，否则返回false
   */
  _validNumber (value, vnum) {
    let tmp = vnum.split(',')
    let min = parseInt(tmp[0])
    let max = parseInt(tmp[1])
    if (tmp.length != 2 || isNaN(min) || isNaN(max)) {
      window.alert('您填写的vnum不正确')
      return false
    }
    if (min > max) {
      window.alert('您填写的vnum中最小值大于最大值')
      return false
    }
    value = parseFloat(value)
    return value >= min && value <= max
  }
  //-------------------------------------------------------------------------- _ValidEqual
  /**
   * 验证本控件是否与其它控件值一致，主要用来验证两次密码输入
   * @param  {String}   value   HTML控制的值
   * @param  {String}   vequal  需要验证的被一致控件id（即：vequal值）
   * @return {Boolean}          成功返回true，否则返回false
   */
  _validEqual (value, vequal) {
    let target = document.getElementById(vequal)
    return value == target.value
  }
  //-------------------------------------------------------------------------- _ValidServer
  /**
   * 验证服务器是否允许此值输入
   * @param  {String} value   HTML控制的值
   * @param  {String} vserve  需要验证的ajax地址（即：vserve值）
   * @return {Boolean}        成功返回true，否则返回false
   */
  _validServer (value, vserve) {
    async function load (url) {
      let msg = await this.$ajax.load(url)
      return msg.data
    }
    let msgData = load (vserve)
    for (let k in msgDate){
      if (k === value){
          return false
        }
      }
    return true
  }

  //-------------------------------------------------------------------------- _GetParam
  /**
   * 获取一个HTML对象的单个参数值
   * @param  {HTMLObject} node    需要获取属性的HTML节点对象
   * @param  {String}     param   参数名称
   * @return {String}             获取的属性值，如果不存在，则返回空字符串
   */
  _getParam (node, param) {
    return  node.getAttribute(param) ? node.getAttribute(param) : ''
  }
}
