<template>
  <div class="meau">
    <div></div>
    <div>
      <ul>
        <p>发现音乐</p>
        <router-link :to="{name: 'SingerRank'}" tag="li">歌手</router-link>
        <router-link :to="{name: 'Mvs'}" tag="li">&thinsp;M V</router-link>
        <router-link :to="{name: 'Rcm'}" tag="li">歌单</router-link>
        <router-link :to="{name: 'Love'}" tag="li">我喜欢</router-link>
        <p>排行榜Top100</p>
        <rank-item/>
      </ul>
    </div>
  </div>
</template>

<script>
import RankItem  from "components/item/RankItem";
export default {
  components:{
    RankItem
  }
}
</script>

<style scoped>
.meau {
  width: 220px;
  height: 639px;
  background: #66ccff;
  opacity: 0.8;
}

.meau p {
  background: rgb(144, 157, 158);
  font-size: 26px;
  margin: 0;
  padding-top: 5px;
  padding-bottom: 5px;
  padding-left: 20px;
  font-weight: bold;
}
.meau li {
  background-color: rgb(200, 240, 247);
  padding-top: 5px;
  padding-bottom: 5px;
  padding-left: 20px;
  font-size: 26px;
  font-family: SimSun;
  cursor: pointer;
  border-bottom: 1px solid #c7c7c7;
}

.meau li:nth-child(odd) {
  background-color: #e0ffff;
}

.meau li:hover {
  background-color: #b9d3ee;
}
</style>
