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
        changeLove: true
    },
    mutations: {
        changeSongList(state, list) {
            state.songList = list
        },
        changePlayList(state, list) {
            state.playList = list
        },
        changeIlovelist(state, list) {
            state.ilovelist = list
            state.songList = list
        },
        changeMvList(state, list) {
            state.mvList = list
        },
        changePlayIndex(state, index) {
            state.playIndex = index
        },
        addLove(state, index) {
            state.ilovelist.push(state.songList[index])
        },
        delLove(state, index) {
            state.ilovelist.splice(index, 1)
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