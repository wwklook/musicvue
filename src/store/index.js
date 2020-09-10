import Vue from "vue"
import Vuex from "vuex"

Vue.use(Vuex);
const store = new Vuex.Store({
  state: {
    songList: [],
    mvList: [],
    playList: [],
    playIndex: 0
  },
  mutations: {
    changeSongList(state, list) {
      state.songList = list
    },
    changePlayList(state, list) {
      state.playList = list
    },
    changeMvList(state, list) {
      state.mvList = list
    },
    changePlayIndex(state, index) {
      state.playIndex = index
    },
    addSong(state, index) {
      state.playList.splice(state.playIndex + 1, 0, state.songList[index])
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