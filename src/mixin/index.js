// 全局混入
export const mixin = {
  methods: {
    loading(){
      this.$loading()
    },
    closeLoading(){
      this.$loading().close()
    }
  }
}