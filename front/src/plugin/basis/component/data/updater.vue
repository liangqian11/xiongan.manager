<template lang="jade">
div
  slot
</template>

<script>
//---------------------------------------------------------------------------- Mixin
import setParent from '../../mixin/set-parent'
export default {
  mixins: [setParent],
  //-------------------------------------------------------------------------- Props
  props: {
    url: {
      type: String,
      required: true
    },
    data: {
      type: String,
      default: 'data'
    },
    btn: {
      type: String,
      default: 'button'
    }
  },
  //-------------------------------------------------------------------------- Data
  data () {
    return {
      /**
       * 按钮对象
       */ 
      btnUpdate: null,
      /**
       * 生命周期
       */ 
      updateBefore: this.$parent['updateBefore'] ? this.$parent['updateBefore'] : this.$lifecycle.updateBefore,
      updateAfter: this.$parent['updateAfter'] ? this.$parent['updateAfter'] : this.$lifecycle.updateAfter,
      updateError: this.$parent['updateError'] ? this.$parent['updateError'] : this.$lifecycle.updateError
    }
  },
  //-------------------------------------------------------------------------- Mounted
  mounted () {
    this.setParent(this.data)
    this.valid()
    this.eventUpdate()
  },
  //-------------------------------------------------------------------------- Methods
  methods: {
    /**
     * 验证
     */
    valid () {
      this.btnUpdate = document.getElementById(this.btn)
      if (!this.btnUpdate) {
        throw new Error('[h-updater]: 使用了h-update组件，却没有匹配的更新按钮！')
      }
    },
    /**
     * 添加事件
     */
    eventUpdate () {
      this.btnUpdate.addEventListener("click", () => {
        if (this.updateBefore ()) {
          this.$ajax.put(this.url, this.$parent[this.data], (res) => {
            this.updateAfter (res)
          }, (res) => {
            console.error('[hesq h-updater]:' + res)
            this.updateError (res)
          })
        }
      })
    }
  }
}
</script>