<template>
  <div class="content">
    <div class="artist_info">
      <div class="singer_info">
        <img class="singer_img" :src="singerInfo.pic300" />
        <div class="singer_name">
          <p class="singer_pname">{{singerInfo.name}}</p>
          <p class="singer_pinfo">
            <span>单曲 : {{singerInfo.musicNum}}</span>
            <span>专辑 : {{singerInfo.albumNum}}</span>
            <span>MV : {{singerInfo.mvNum}}</span>
            <span>粉丝 : {{singerInfo.artistFans}}</span>
          </p>
        </div>
      </div>
      <div class="singer_head">
        <ul>
          <li :class="{current: index==0}">
            <span @click="toMusic">单曲</span>
          </li>
          <li :class="{current: index==1}">
            <span @click="toAlbum">专辑</span>
          </li>
          <li :class="{current: index==2}">
            <span @click="toMv">MV</span>
          </li>
          <li :class="{current: index==3}">
            <span @click="toIntro">简介</span>
          </li>
        </ul>
      </div>
      <keep-alive>
        <router-view />
      </keep-alive>
    </div>
  </div>
</template>

<script>
import { getSingerInfo } from "@/network/music";

export default {
  name: "singer-view",
  data() {
    return {
      singerInfo: [],
      aid: 0,
      eventName: "SingerPage",
      index: 0
    };
  },
  activated() {
    if (this.aid != this.$route.params.aid) {
      this.aid = this.$route.params.aid;
      getSingerInfo(this.aid).then((res) => {
        this.singerInfo = res.data;
      });
    }
    this.index = 0
    this.$router.push({name: "SingerMusic", params: {aid: this.aid}})
  },
  methods: {
    toMusic(){
      this.$router.push({name: "SingerMusic", params: {aid: this.aid}})
      this.index = 0
    },
    toAlbum(){
      this.$router.push({name: "SingerAlbum", params: {aid: this.aid}})
      this.index = 1
    },
    toMv(){
      this.$router.push({name: "SingerMv", params: {aid: this.aid}})
      this.index = 2
    },
    toIntro(){
      this.$router.push({name: "SingerIntro", params: {info: this.singerInfo}})
      this.index = 3
    }
  }
};
</script>

<style scoped>
.artist_info {
  width: 880px;
  height: 600px;
  overflow-y: auto;
}
.singer_info {
  display: flex;
}
.singer_img {
  width: 200px;
  height: 200px;
  margin: 5px 10px;
  border-radius: 50%;
}
.singer_head {
  width: 100%;
  height: 30px;
  margin: 10px 10px;
  font-size: 22px;
}
.singer_head li {
  float: left;
  margin: 0;
  padding-left: 15px;
  padding-right: 15px;
}
.singer_head span {
  cursor: pointer;
}
.singer_pname {
  margin: 10px 20px;
  font-size: 28px;
  font-weight: 700;
}
.singer_pinfo span {
  font-size: 22px;
  margin-right: 20px;
  margin-left: 20px;
}
.current {
  font-weight: bold;
  line-height: 26px;
  color: aqua;
}
</style>
