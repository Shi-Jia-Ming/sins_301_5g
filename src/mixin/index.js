export const mixin = {
  methods: {
    loading_s(){
      this.$loading()
    },
    closeLoading(){
      this.$loading().close()
    }
  }
}