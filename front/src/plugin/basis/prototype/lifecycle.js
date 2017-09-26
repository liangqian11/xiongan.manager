export default {
  //------------------------------------------------------------------------ Loader
  loadBefore () {
    return true
  },
  loadAfter (res) {

  },
  loadError (res) {

  },
  //------------------------------------------------------------------------ Upload
  uploadBefore () {
    return true
  },
  uploadAfter (res) {

  },
  uploadError (res) {
    window.alert(res.message)
  },
  //------------------------------------------------------------------------ Add
  addBefore () {
    return true
  },
  addAfter (res) {
    window.alert(res.message)
  },
  addError (res) {
    window.alert(res.message)
  },
  //------------------------------------------------------------------------ Update
  updateBefore () {
    return true
  },
  updateAfter (res) {
    window.alert(res.message)
  },
  updateError (res) {
    window.alert(res.message)
  },
  //------------------------------------------------------------------------ UpdateChecked
  updateCheckedEmpty () {
    window.alert('您没有选中任何条目！')
  },
  updateCheckedBefore () {
    return true
  },
  updateCheckedAfter (res) {
    window.alert(res.message)
  },
  updateCheckedError (res) {
    window.alert(res.message)
  },
  //------------------------------------------------------------------------ UpdateAll
  updateAllEmpty () {
    window.alert('您没有选中任何条目！')
  },
  updateAllBefore (msg) {
    return true
  },
  updateAllAfter (res) {
    window.alert(res.message)
  },
  updateAllError (res) {
    window.alert(res.message)
  },
  //------------------------------------------------------------------------ Remove
  removeBefore () {
    return window.confirm('您确认要删除该条目吗？')
  },
  removeAfter (res) {
    window.alert(res.message)
  },
  removeError (res) {
    window.alert(res.message)
  },
  //------------------------------------------------------------------------ RemoveChecked
  removeCheckedEmpty () {
    window.alert('您没有选中任何条目！')
  },
  removeCheckedBefore () {
    return window.confirm('您确认要删除所选条目吗？')
  },
  removeCheckedAfter (res) {
    window.alert(res.message)
  },
  removeCheckedError (res) {
    window.alert(res.message)
  },
  //------------------------------------------------------------------------ RemoveAll
  removeAllEmpty () {
    window.alert('您没有选中任何条目！')
  },
  removeAllBefore () {
    return window.confirm('您确认要删除全部条目吗？')
  },
  removeAllAfter (res) {
    window.alert(res.message)
  },
  removeAllError (res) {
    window.alert(res.message)
  }
}