<template>
<div class="content">
  <h2>排行榜</h2>
  <div class="song_info">
    <header-item />
    <img :src="ranklist.f" alt="">
      <song-item v-for="(item, index) in rank_list" :key="index" :data="item" :num="index" />
    </div>
  </div>
</template>

<script>
import SongItem from "components/item/SongItem.vue";
import HeaderItem from "components/item/HeaderItem.vue";
import { getRankList } from "@/network/music";

export default {
  name: "rank-view",
  components: {
    SongItem,
    HeaderItem
  },
  data() {
    return {
      rank_list: [],
      id: null,
    };
  },
  created() {
    this.getList();
    this.$bus.$on("rankItemClick", (id) => {
      if (id != this.id) {
        this.getList();
        this.id = id;
      }
    });
  },
  activated() {
    if (this.id == this.$route.query.id) {
      this.$store.commit("changeSongList", this.rank_list);
    }
  },
  methods: {
    getList() {
      getRankList(this.$route.query.id).then((res) => {
        console.log(res);
        this.rank_list = res.data.data;
        this.$store.commit("changeSongList", this.rank_list);
      });
    },
  },
};
</script>

<style scoped>
.song_info {
  width: 880px;
  height: 600px;
  overflow-y: auto;
}
</style>
