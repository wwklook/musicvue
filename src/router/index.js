import Vue from 'vue'
import VueRouter from 'vue-router'

const Music = () =>
  import ('views/Music.vue')
const Home = () =>
  import ('views/Home.vue')
const Note = () =>
  import ('views/home/Note.vue')
const Love = () =>
  import ('views/music/Ilove.vue')
const Rank = () =>
  import ('views/music/RankView.vue')
const Search = () =>
  import ('views/music/SearchView.vue')
const Rcm = () =>
  import ('views/music/RcmView.vue')
const RcmList = () =>
  import ('views/music/RcmListView.vue')
const Album = () =>
  import ('views/music/AlbumView.vue')
const Mvs = () =>
  import ('views/music/MvsView.vue')
const MvPage = () =>
  import ('views/music/MvPageView.vue')
const Lrc = () =>
  import ('views/music/LrcView.vue')
const Playlist = () =>
  import ('views/music/PlaylistView.vue')
const SingerRank = () =>
  import ('views/music/SingerRankView.vue')
const Singer = () =>
  import ('views/music/SingerView.vue')
const Comments = () =>
  import ('views/music/CommentView.vue')

const SingerMusic = () =>
  import ('views/music/singer/SingerMusic.vue')
const SingerAlbum = () =>
  import ('views/music/singer/SingerAlbum.vue')
const SingerMv = () =>
  import ('views/music/singer/SingerMv.vue')
const SingerIntro = () =>
  import ('views/music/singer/SingerIntro.vue')


Vue.use(VueRouter)

const routes = [{
    path: '',
    redirect: '/music'
  },
  {
    path: '/music',
    name: 'Music',
    component: Music,
    children: [{
      path: 'Love',
      name: 'Love',
      component: Love
      },
      {
        path: 'rank',
        name: 'Rank',
        component: Rank
      },
      {
        path: 'search',
        name: 'Search',
        component: Search
      },
      {
        path: 'singerRank',
        name: 'SingerRank',
        component: SingerRank
      },
      {
        path: 'rcm',
        name: 'Rcm',
        component: Rcm
      },
      {
        path: 'rcmList',
        name: 'RcmList',
        component: RcmList
      },
      {
        path: 'mvs',
        name: 'Mvs',
        component: Mvs
      },
      {
        path: 'MvPage',
        name: 'MvPage',
        component: MvPage
      },
      {
        path: 'album',
        name: 'Album',
        component: Album
      },
      {
        path: 'lrc',
        name: 'Lrc',
        component: Lrc
      },
      {
        path: 'playlist',
        name: 'Playlist',
        component: Playlist
      },
      {
        path: 'comments',
        name: 'Comments',
        component: Comments
      },
      {
        path: 'singer',
        name: 'Singer',
        component: Singer,
        children: [{
            path: 'music',
            name: 'SingerMusic',
            component: SingerMusic,
          },
          {
            path: 'album',
            name: 'SingerAlbum',
            component: SingerAlbum,
          },
          {
            path: 'mv',
            name: 'SingerMv',
            component: SingerMv,
          },
          {
            path: 'intro',
            name: 'SingerIntro',
            component: SingerIntro,
          },
        ]
      },
    ]
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
    children: [{
      path: 'note',
      name: 'Note',
      component: Note
    }]
  }

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router