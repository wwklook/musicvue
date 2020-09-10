<template>
  <div class="mv_item">
    <div class="mv_info">
      <img class="mv_img" :src="info.pic" @click="toMv" />
      <span class="mvs_cnt">▷{{ info.mvPlayCnt }}</span>
      <span class="mvs_time">{{ info.songTimeMinutes }}</span>
    </div>
    <div class="mv_name">
      <span @click="toMv" v-html="info.name"></span>
    </div>
    <div class="mv_artist" v-html="info.artist"></div>
  </div>
</template>

<script>
export default {
  props: {
    info: {
      type: Object,
      default() {
        return {};
      },
    },
    index: {
      type: Number,
      default: 0
    }
  },
  methods: {
    toMv() {
      this.$router.push({
        name: "MvPage",
        params: { 'index': this.index, 'from': 'mvs' },
      });
    },
  },
};
</script>

<style scoped>
.mv_item {
  width: 195px;
  margin: 15px 0;
  height: 165px;
  position: relative;
  display: flex;
  flex-direction: column;
}
.mv_img {
  width: 190px;
  margin: 0 5px;
  cursor: pointer;
}
.mv_name {
  margin: 2px 8px;
}
.mv_name span {
  white-space: normal;
  font-size: 17px;
  cursor: pointer;
}
.mv_name span:hover {
  color: ghostwhite;
}
.mv_artist {
  font-size: 16px;
  color: ghostwhite;
  margin: 0 8px;
}
.mv_info{
  position: relative;
}
.mvs_cnt {
  position: absolute;
  color: white;
  bottom: 2px;
  left: 6px;
}
.mvs_time {
  position: absolute;
  color: white;
  bottom: 2px;
  right: 3px;
}
</style>