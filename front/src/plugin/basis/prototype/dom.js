//---------------------------------------------------------------------------- Exports
export default {
  //-------------------------------------------------------------------------- id
  /**
   * 使用id获取一个HTML节点
   * @param  {String} idName 需要获取的id标识
   * @return {HTMLObject}    已选择的HTML对象
   */
  id (idName) {
    return document.getElementById(idName)
  },
  //-------------------------------------------------------------------------- class
  /**
   * 使用class获取一系列HTML节点的数组
   * @param  {String} className 需要获取的对象class名
   * @return {Array}            包含被选取的HTML对象的数组
   */
  class (className) {
    return document.getElementsByClassName(className)
  },

  /**
   * 使用Tagname获取一系列HTML节点的数组
   * @param  {String} tagName 需要获取的对象Tag名称
   * @return {Array}          包含被选取的HTML对象的数组
   */
  tag (tagName) {
    return document.getElementsByTagName(tagName)
  }
}
