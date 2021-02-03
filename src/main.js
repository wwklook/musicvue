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
isLogin().then(res=>{
    store.commit("changeLoginState", true)
    getIlove().then((res) => { 
      let love_list = []
      for(let i=0;i < res.data.musicList.length;i++){
        love_list.push(res.data.musicList[i].data)
      }
      store.commit("changeIlovelist", love_list )
    });
})