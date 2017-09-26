<template lang="jade">
div
  slot
</template>

<script>
import setParent from '../../mixin/set-parent'
export default {
  mixins: [setParent],
  //------------------------------------------------------------------------ Props
  props: {
    url: {
      type: String,
      default: 'url'
    },
    list: { 
      type: String, 
      default: 'list'
    },
    check: {
      type: String,
      default: 'check'
    },
    chkbtn: {
      type: String,
      default: 'update'
    },
    btn: {
      type: Object,
      default: function () {
        return {
          checkall: 'checkall',
          decheck: 'decheck',
          update: 'update',
          updateChecked: 'update-checked',
          updateAll: 'update-all',
          remove: 'remove',
          removeAll: 'remove-all',
          removeChecked: 'remove-checked'
        }
      }
    }
  },
  //------------------------------------------------------------------------ Data
  data () {
    return {
      /**
       * 按钮对象
       */ 
      btnCheckall: null,
      btnDecheck: null,
      btnUpdateAll: null,
      btnUpdateChecked: null,
      btnRemoveAll: null,
      btnRemoveChecked: null,
      btnUpdate: null,
      btnRemove: null,
      /**
       * 生命周期
       */ 
      updateBefore: this.$parent['updateBefore'] ? this.$parent['updateBefore'] : this.$lifecycle.updateBefore,
      updateAfter: this.$parent['updateAfter'] ? this.$parent['updateAfter'] : this.$lifecycle.updateAfter,
      updateError: this.$parent['updateError'] ? this.$parent['updateError'] : this.$lifecycle.updateError,
      updateCheckedEmpty: this.$parent['updateCheckedEmpty'] ? this.$parent['updateCheckedEmpty'] : this.$lifecycle.updateCheckedEmpty,
      updateCheckedBefore: this.$parent['updateCheckedBefore'] ? this.$parent['updateCheckedBefore'] : this.$lifecycle.updateCheckedBefore,
      updateCheckedAfter: this.$parent['updateCheckedAfter'] ? this.$parent['updateCheckedAfter'] : this.$lifecycle.updateCheckedAfter,
      updateCheckedError: this.$parent['updateCheckedError'] ? this.$parent['updateCheckedError'] : this.$lifecycle.updateCheckedError,
      updateAllEmpty: this.$parent['updateAllEmpty'] ? this.$parent['updateAllEmpty'] : this.$lifecycle.updateAllEmpty,
      updateAllBefore: this.$parent['updateAllBefore'] ? this.$parent['updateAllBefore'] : this.$lifecycle.updateAllBefore,
      updateAllAfter: this.$parent['updateAllAfter'] ? this.$parent['updateAllAfter'] : this.$lifecycle.updateAllAfter,
      updateAllError: this.$parent['updateAllError'] ? this.$parent['updateAllError'] : this.$lifecycle.updateAllError,
      removeBefore: this.$parent['removeBefore'] ? this.$parent['removeBefore'] : this.$lifecycle.removeBefore,
      removeAfter: this.$parent['removeAfter'] ? this.$parent['removeAfter'] : this.$lifecycle.removeAfter,
      removeError: this.$parent['removeError'] ? this.$parent['removeError'] : this.$lifecycle.removeError,
      removeCheckedEmpty: this.$parent['removeCheckedEmpty'] ? this.$parent['removeCheckedEmpty'] : this.$lifecycle.removeCheckedEmpty,
      removeCheckedBefore: this.$parent['removeCheckedBefore'] ? this.$parent['removeCheckedBefore'] : this.$lifecycle.removeCheckedBefore,
      removeCheckedAfter: this.$parent['removeCheckedAfter'] ? this.$parent['removeCheckedAfter'] : this.$lifecycle.removeCheckedAfter,
      removeCheckedError: this.$parent['removeCheckedError'] ? this.$parent['removeCheckedError'] : this.$lifecycle.removeCheckedError,
      removeAllEmpty: this.$parent['removeAllEmpty'] ? this.$parent['removeAllEmpty'] : this.$lifecycle.removeAllEmpty,
      removeAllBefore: this.$parent['removeAllBefore'] ? this.$parent['removeAllBefore'] : this.$lifecycle.removeAllBefore,
      removeAllAfter: this.$parent['removeAllAfter'] ? this.$parent['removeAllAfter'] : this.$lifecycle.removeAllAfter,
      removeAllError: this.$parent['removeAllError'] ? this.$parent['removeAllError'] : this.$lifecycle.removeAllError
    }
  },
  //------------------------------------------------------------------------ Mounted
  mounted () {
    this.setParent(this.list)
    this.initControl()
    this.eventCheckall()
    this.eventDecheck()
    this.eventUpdateChecked()
    this.eventUpdateAll()
    this.eventRemoveChecked()
    this.eventRemoveAll()

    // 进行循环获取多行按钮
    let interval = setInterval(() => {
      let objs = document.getElementsByClassName(this.chkbtn)
      if (objs) {
        this.initListControl()
        clearInterval(interval)
      }
    }, 200)
  },
  //------------------------------------------------------------------------ Methods
  methods: {
    /**
     * 初始化控件(使用id)
     */
    initControl () {
      this.btnCheckall = document.getElementById(this.btn.checkall)
      this.btnDecheck = document.getElementById(this.btn.decheck)
      this.btnUpdateAll = document.getElementById(this.btn.updateAll)
      this.btnUpdateChecked = document.getElementById(this.btn.updateChecked)
      this.btnRemoveAll = document.getElementById(this.btn.removeAll)
      this.btnRemoveChecked = document.getElementById(this.btn.removeChecked)
    },
    initListControl () {
      if (!this.btnUpdate) {
        this.btnUpdate = document.getElementsByClassName(this.btn.update)
        this.eventUpdate()
      }
      if (!this.btnRemove) {
        this.btnRemove = document.getElementsByClassName(this.btn.remove)
        this.eventRemove()
      }
    },
    /**
     * 全部选择事件
     */
    eventCheckall () {
      if (!this.btnCheckall) return
      this.btnCheckall.addEventListener('click', () => {
        this.$parent[this.check] = this.$check.checkall(this.$parent[this.list], 'id')
      })
    },
    /**
     * 反选事件
     */
    eventDecheck () {
      if (!this.btnDecheck) return
      this.btnDecheck.addEventListener('click', () => {
        this.$parent[this.check] = this.$check.decheck(this.$parent[this.list], this.$parent[this.check], 'id')
      })
    },
    /**
     * 更新单条事件
     */
    eventUpdate () {
      for (let btn of this.btnUpdate) {
        btn.addEventListener('click', (e) => {
          if (this.updateBefore ()) {
            let index = e.target.getAttribute('data-index')
            this.$ajax.put(this.$parent[this.url].update, this.$parent[this.list][index], (res) => {
              this.updateAfter(res)
            }, (res) => {
              console.error('[h-data-lister eventUpdate]:' + res)
              this.updateError(res)
            })
          }
        })
      }
    },
    /**
     * 更新选择事件
     */
    eventUpdateChecked () {
      if (!this.btnUpdateChecked) return
      this.btnUpdateChecked.addEventListener('click', () => {
        if (this.updateCheckedBefore()) {
          let objs = this.$check.checkedObject(this.$parent[this.list], this.$parent[this.check], 'id')
          this.$ajax.put(this.$parent[this.url].update, objs, (res) => {
            this.updateCheckedAfter(res)
          }, (res) => {
            console.error('[h-data-lister eventUpdateChecked]:' + res)
            this.updateCheckedErrr(res)
          })
        }
      })
    },
    /**
     * 全部更新事件
     */
    eventUpdateAll () {
      if (!this.btnUpdateAll) return
      this.btnUpdateAll.addEventListener('click', () => {
        if (this.updateAllBefore ()) {
          this.$ajax.put(this.$parent[this.url].update, this.$parent[this.list], (res) => {
            this.updateAllAfter(res)
          }, (res) => {
            console.error('[hesq h-lister eventUpdateAll]:' + res)
            this.updateAllError(res)
          })
        }
      })
    },
    /**
     * 删除单条事件
     */
    eventRemove () {
      for (let btn of this.btnRemove) {
        btn.addEventListener('click', (e) => {
          if (this.removeBefore ()) {
            let index = e.target.getAttribute('data-index')
            let key = this.$parent[this.list][index].id
            this.$ajax.delete(this.$parent[this.url].remove + '/' + key, (res) => {
              this.$parent[this.list].splice(index, 1)
              this.removeAfter(res)
            }, (res) => {
              console.error('[hesq h-lister eventRemove]:' + res)
              this.removeError(res)
            })
          }
        })
      }
    },
    /**
     * 删除所选事件
     */
    eventRemoveChecked () {
      if (!this.btnRemoveChecked) return
      this.btnRemoveChecked.addEventListener('click', () => {
        if (this.removeCheckedBefore()) {
          let index = this.$check.checkedIndex(this.$parent[this.list], this.$parent[this.check], 'id')
          console.log(index)
          let arg = this.$check.checked(this.$parent[this.list], this.$parent[this.check], 'id').join('|')
          this.$ajax.delete(this.$parent[this.url].remove + '/' + arg, (res) => {
            let count = 0
            for (let i of index) {
              i -= count
              this.$parent[this.list].splice(i, 1)
              count ++
            }
            this.removeCheckedAfter(res)
          }, (res) => {
            console.error('[hesq h-lister eventRemoveChecked]:' + res)
            this.removeCheckedError(res)
          })
        }
      })
    },
    /**
     * 全部删除事件
     */
    eventRemoveAll () {
      if (!this.btnRemoveAll) return
      this.btnRemoveAll.addEventListener('click', () => {
        if (this.removeAllBefore()) {
          let checked = this.$check.checkall(this.$parent[this.list], 'id')
          let arg = checked.join('|')
          this.$ajax.delete(this.$parent[this.url].remove + '/' + arg, (res) => {
            this.$parent[this.list].splice(0, this.$parent[this.list].length)
            this.removeAllAfter(res)
          }, (res) => {
            console.error('[hesq h-lister eventRemoveAll]:' + res)
            this.removeAllError(res)
          })
        }
      })
    }
  }
}
</script>