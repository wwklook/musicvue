<template>
  <div class="album_item">
      <img class="album_img" :src="info.pic" @click="toAlbum" />
    <div class="album_name">
      <span @click="toAlbum" v-html="info.album"></span>
    </div>
    <div class="album_date">{{info.releaseDate}}</div>
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
  },
  methods: {
    toAlbum() {
      this.$router.push({
        name: "Album",
        params: { 'aid': this.info.albumid },
      });
    },
  },
};
</script>

<style scoped>
.album_item {
  width: 195px;
  margin: 15px 0;
  height: 265px;
  display: flex;
  flex-direction: column;
}
.album_img {
  width: 190px;
  margin: 0 5px;
  cursor: pointer;
}
.album_name {
  margin: 2px 8px;
}
.album_name span {
  white-space: normal;
  font-size: 17px;
  cursor: pointer;
}
.album_name span:hover {
  color: ghostwhite;
}

.album_date {
  margin: 2px 8px;
  color: grey;
}
</style>