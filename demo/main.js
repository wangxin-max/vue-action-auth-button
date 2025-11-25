import Vue from 'vue'
import Antd from 'ant-design-vue'
import App from './App.vue'

// 模拟 Vuex store
const store = new Vue({
  data() {
    return {
      state: {
        setting: {
          currentPermissionId: '*'
        }
      }
    }
  },
  methods: {
    commit(mutation, payload) {
      if (mutation === 'setting/SET_CURRENT_PERMISSION_ID') {
        this.state.setting.currentPermissionId = payload
      }
    },
    dispatch(action, payload) {
      // 可以在这里添加 action 处理逻辑
    }
  }
})

Vue.use(Antd)

Vue.config.productionTip = false

// 将 store 挂载到 Vue 原型上，让组件可以访问
Vue.prototype.$store = store

new Vue({
  render: h => h(App)
}).$mount('#app')