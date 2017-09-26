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
    ident: {
      type: String,
      required: true
    }
  },
  //-------------------------------------------------------------------------- Data
  data () {
    return {
      /**
       * 按钮对象
       */ 
      btnCustomer: null
    }
  },
  //-------------------------------------------------------------------------- Mounted
  mounted () {
    this.setParent(this.ident)
    this.initControl()
    this.eventCustomer()
  },
  //-------------------------------------------------------------------------- Methods
  methods: {
    /**
     * 初始化控件
     */
    initControl () {
      this.btnCustomer = []
      let elements = document.getElementsByTagName('*')
      for (let el of elements) {
        if (el.getAttribute('d-name')) {
          this.btnCustomer.push(el)
        }
      }
    },
    /**
     * 自定义事件
     */ 
    eventCustomer () {
      for (let el of this.btnCustomer) {

        // 查找事件类型，监听事件
        let event = el.getAttribute('d-event') ? el.getAttribute('d-event') : 'click'
        el.addEventListener (event, () => {

          // 取className和生命周期，并判断是否可以进入操作环节
          let name = el.getAttribute('d-name')
          let lifeBefore = this.$parent[name + 'Before']
          let lifeAfter = this.$parent[name + 'After']
          let lifeError = this.$parent[name + 'Error']
          let enter = lifeBefore ? lifeBefore () : true
          if (enter) {

            // 进入操作环节，取属性
            let type = el.getAttribute('d-type')
            let url = el.getAttribute('d-url')
            let params = el.getAttribute('d-params')

            // 根据不同type，进入不同操作场景
            switch (type.toLowerCase()) {
              /**
               * post
               */ 
              case 'post': {
                this.$ajax.post(url, params, (res) => {
                  lifeAfter ? lifeAfter(res) : null
                }, (res) => {
                  console.error('[h-data-lister eventCustomer]:' + JSON.stringify(res))
                  lifeError ? lifeError(res) : this.addError(res)
                })
                break
              }
              /**
               * put
               */ 
              case 'put': {
                this.$ajax.put(url, params, (res) => {
                  lifeAfter ? lifeAfter(res) : null
                }, (res) => {
                  console.error('[h-data-lister eventCustomer]:' + JSON.stringify(res))
                  lifeError ? lifeError(res) : this.updateError(res)
                })
                break
              }
              /**
               * delete
               */ 
              case 'delete': {
                this.$ajax.delete(url, (res) => {
                  lifeAfter ? lifeAfter(res) : null
                }, (res) => {
                  console.error('[h-data-lister eventCustomer]:' + JSON.stringify(res))
                  lifeError ? lifeError(res) : this.removeError(res)
                })
                break
              }
              /**
               * default
               */ 
              default: break
            }
          }
        })
      }
    }
  }
}
</script>