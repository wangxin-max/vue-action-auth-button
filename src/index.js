import ActionAuthButton from './ActionAuthButton.vue'
import authorityUtils from './authority-utils'

// Vue 插件安装方法
ActionAuthButton.install = function(Vue) {
  Vue.component(ActionAuthButton.name, ActionAuthButton)
}

// 全局安装方法
const install = function(Vue) {
  if (install.installed) return
  install.installed = true
  Vue.component('ActionAuthButton', ActionAuthButton)
}

// 自动安装（在浏览器环境中）
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

// 导出组件和工具函数
export {
  ActionAuthButton,
  authorityUtils,
  install
}

// 默认导出
export default {
  ActionAuthButton,
  authorityUtils,
  install
}

// UMD 格式支持
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    ActionAuthButton,
    authorityUtils,
    install
  }
}