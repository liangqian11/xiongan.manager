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
      btnAdd: null,
      a: null,
      /**
       * 生命周期
       */
      addBefore: this.$parent['addBefore'] ? this.$parent['addBefore'] : this.$lifecycle.addBefore,
      addAfter: this.$parent['addAfter'] ? this.$parent['addAfter'] : this.$lifecycle.addAfter,
      addError: this.$parent['addError'] ? this.$parent['addError'] : this.$lifecycle.addError
    }
  },
  //-------------------------------------------------------------------------- Mounted
  mounted () {
    this.setParent(this.data)
    this.valid()
    this.eventAdd()
  },
  //-------------------------------------------------------------------------- Methods
  methods: {
    /**
     * 验证
     */
    valid () {
      this.btnAdd = this.$dom.id(this.btn)
      if (!this.btnAdd) {
        throw new Error('[h-adder]: 使用了h-adder组件，却没有匹配的添加按钮！')
      }
    },
    /**
     * 添加事件
     */
    eventAdd () {
      this.btnAdd.addEventListener("click", () => {
        if (this.addBefore()) {
          this.$ajax.post(this.url, this.$parent[this.data], (res) => {
            this.addAfter(res)
          }, (res) => {
            console.error('[h-data-adder]:' + res)
            this.addError(res)
          })
        }
      })
    }
  }
}
</script>