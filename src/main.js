import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { isLogin, getIlove } from "@/network/music";

import toast from 'components/common/toast'

Vue.config.productionTip = false

Vue.use(toast)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

Vue.prototype.$store = store
Vue.prototype.$bus = new Vue()




// 查看登录状态 并获取数据
isLogin().then(res => {
  if (res.data == "yes") {
    store.commit("changeLoginState", true)
  }
  getIlove().then((res) => {
    store.commit("changeIlovelist", res.data.musicList)
    store.commit("changeIloverid", res.data.rid)
  });
})