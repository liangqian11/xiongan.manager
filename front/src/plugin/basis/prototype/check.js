export default {
  //-------------------------------------------------------------------------- checkall
  /**
   * 全选操作
   */
  checkall (list, bind) {
    let result = []
    for (let item of list) {
      result.push(item[bind])
    }
    return result
  },
  //-------------------------------------------------------------------------- decheck
  /**
   * 反选操作
   */
  decheck (list, check, bind) {
    let arr = []
    for (let item of list) {
      let flag = true
      for (let c of check) {
        if (c === item[bind]) {
          flag = false
        }
      }
      if (flag) {
        arr.push(item.id)
      }
    }
    return arr
  },
  //-------------------------------------------------------------------------- checked
  /**
   * 获取已选择项的id
   */
  checked (list, checked, bind) {
    let arr = []
    for (let item of list) {
      let flag = true
      for (let c of checked) {
        if (c === item[bind]) {
          flag = false
        }
      }
      if (!flag) {
        arr.push(item.id)
      }
    }
    return arr
  },
  //-------------------------------------------------------------------------- checkedIndex
  /**
   * 获取已选择项的index数组
   */
  checkedIndex (list, checked, bind) {
    let arr = []
    for (let i = 0, l = list.length; i < l; i++) {
      for (let c of checked) {
        if (list[i][bind] === c) {
          arr.push(i)
          break
        }
      }
    }
    return arr
  },
  //-------------------------------------------------------------------------- checkedObject
  /**
   * 获取已选择项的obj数组
   */
  checkedObject (list, checked, bind) {
    let arr = []
    for (let item of list) {
      let flag = true
      for (let c of checked) {
        if (c === item[bind]) {
          flag = false
        }
      }
      if (!flag) {
        arr.push(item)
      }
    }
    return arr
  }
}