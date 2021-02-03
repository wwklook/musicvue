<template>
  <div class="singer_rank_item">
    <img :src="pic" @click="toSinger"/>
    <p class="singer" @click="toSinger">{{name}}</p>
    <p class="songs">{{musicNum}}首歌曲</p>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  props:['pic','aid', 'name', 'musicNum'],
  methods: {
    toSinger(){
      this.$router.push({name: 'Singer', params:{ aid: this.aid }})
    }
  },
};
</script>

<style scoped>
.singer_rank_item {
  width: 170px;
  height: 190px;
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.singer_rank_item img {
  width: 120px;
  height: 120px;
  cursor: pointer;
  border-radius: 50%;
}
.singer {
  font-size: 18px;
  cursor: pointer;
  margin: 2px;
}
.songs {
  font-size: 14px;
  color: darkslategrey;
  margin: 2px;
}
</style>