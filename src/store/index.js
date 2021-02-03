import Vue from "vue"
import Vuex from "vuex"

Vue.use(Vuex);
const store = new Vuex.Store({
  state: {
    songList: [],
    mvList: [],
    playList: [],
    playIndex: 0,
    ilovelist: [],
    iloverid: [],
    isLogin: false
  },
  mutations: {
    changeLoginState(state, isLogin) {
      state.isLogin = isLogin
    },
    changeSongList(state, list) {
      state.songList = list
    },
    changePlayList(state) {
      state.playList = state.songList
    },
    changeIlovelist(state, list) {
      state.ilovelist = list
    },
    changeIloverid(state, list) {
      state.iloverid = list
    },
    changeMvList(state, list) {
      state.mvList = list
    },
    changePlayIndex(state, index) {
      state.playIndex = index
    },
    addLove(state, list) {
      state.ilovelist.push(list)
    },
    addLoverid(state, rid) {
      state.iloverid.push(rid + "")
    },
    addSong(state, index) {
      state.playList.splice(state.playIndex + 1, 0, state.songList[index])
    },
    delLove(state, index) {
      state.ilovelist.splice(index, 1)
    },
    delLoverid(state, index) {
      state.iloverid.splice(index, 1)
    },
    delSong(state, index) {
      state.playList.splice(index, 1)
      if (index < state.playIndex) {
        state.playIndex -= 1
      }
    }
  },
})

export default store