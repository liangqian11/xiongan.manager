//---------------------------------------------------------------------------- Exports
export default {
  methods: {
    /**
     * 此方法用于向上查找实际引用页面的父页面Vue实例，并绑定到this.$parent上
     * @param {String} props 父页面必然会出现的Data对象中的key
     */
    setParent (props) {
      let parent = this.$parent
      for (let i = 0; i < 50; i++) {
        if (parent.$data[props] != undefined) {
          break
        }
        parent = parent.$parent
      }
      this.$parent = parent
    }
  }
}