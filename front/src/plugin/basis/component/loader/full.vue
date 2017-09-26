<template lang="jade">
h-widget-loader(:status='status')
  slot
</template>

<script>
export default {
  //-------------------------------------------------------------------------- Props
  props: {
    url: {
      type: String,
      default: 'url'
    },
    data: {
      type: String,
      default: 'data'
    },
    setdata: {
      type: Boolean,
      default: true
    }
  },
  //-------------------------------------------------------------------------- Data
  data () {
    return {
      status: 'loading'
    }
  },
  //-------------------------------------------------------------------------- Mounted
  mounted () {
    this.load()
  },
  //-------------------------------------------------------------------------- Methods
  methods: {
    /**
     * 加载数据
     */ 
    async load () {
      let loadBefore = this.$parent['loadBefore'] ? this.$parent['loadBefore'] : this.$lifecycle.loadBefore
      let loadAfter = this.$parent['loadAfter'] ? this.$parent['loadAfter'] : this.$lifecycle.loadAfter
      let loadError = this.$parent['loadError'] ? this.$parent['loadError'] : this.$lifecycle.loadError
      if (loadBefore()) {
        try {
          this.status = 'loading'
          let resp = {}
          for (let k in this.$parent[this.url]) {
            let url = this.$parent[this.url][k]
            if (k === 'pager' && this.$route.params.page) {
              url += '/' + this.$route.params.page
            }
            resp[k] = await this.$ajax.load(url)
            resp[k] = resp[k].data
          }
          if (this.setdata) {
            this.$parent[this.data] = resp
          }
          loadAfter(resp)
          this.status = 'success'
        } catch (res) {
          loadError(res)
          this.status = 'error'
          console.error('[hesq]:' + res)
        }
      }
    }
  }
}
</script>