import { requests } from './index'


export function isLogin() {
  return requests({
    url: '/is_login',
  })
}

export function getIlove() {
  return requests({
    url: '/get_i_love',
  })
}

export function addIlove(data) {
  return requests({
    url: '/add_i_love',
    data: JSON.stringify({ data }),
    method: 'post',
    headers:{'Content-Type': 'application/json'}
  })
}

export function getRankList(bid) {
  return requests({
    url: '/get_rank',
    params: { bid }
  })
}

export function getSearchList(word, pn) {
  return requests({
    url: '/get_search',
    params: { word, pn }
  })
}

export function getSongInfoAndLrc(rid) {
  return requests({
    url: '/get_songinfoandlrc',
    params: { rid }
  })
}

export function getSingerRank(pn) {
  return requests({
    url: '/get_singer_top',
    params: { pn }
  })
}

export function getSingerMusic(aid, pn) {
  return requests({
    url: '/get_singerMusic',
    params: { aid, pn }
  })
}
export function getSingerAlbum(aid, pn) {
  return requests({
    url: '/get_singerAlbum',
    params: { aid, pn }
  })
}
export function getSingerMv(aid, pn) {
  return requests({
    url: '/get_singerMv',
    params: { aid, pn }
  })
}
export function getSingerInfo(aid) {
  return requests({
    url: '/get_singerInfo',
    params: { aid }
  })
}

export function getMusicUrl(rid) {
  return requests({
    url: '/get_music_url',
    params: { rid }
  })
}

export function getRcms(pn) {
  return requests({
    url: '/get_rcm',
    params: { pn }
  })
}
export function getRcmList(pid, pn) {
  return requests({
    url: '/get_rcm_list',
    params: { pid, pn }
  })
}
export function getMvs(pn) {
  return requests({
    url: '/get_mvs',
    params: { pn }
  })
}
export function getMvUrl(rid) {
  return requests({
    url: '/get_mv_url',
    params: { rid }
  })
}
export function getAlbum(aid, pn) {
  return requests({
    url: '/get_album',
    params: { aid, pn }
  })
}

export function getComment(sid, pn) {
  return requests({
    url: '/get_comment',
    params: { sid, pn }
  })
}