/*
 * @Author: your name
 * @Date: 2022-03-01 10:04:05
 * @LastEditTime: 2022-03-07 14:18:45
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /sins_301_5g/src/mixin/index.js
 */
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