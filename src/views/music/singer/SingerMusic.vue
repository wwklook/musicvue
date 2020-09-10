<template>
  <div>
    <header-item />
    <song-item v-for="(item, index) in singerInfo.songList" :key="index" :num="index" :data="item" />
    <pagination :total="total" :pn="pn" :rn="rn" :eventName="eventName" />
  </div>
</template>

<script>
import HeaderItem from "components/item/HeaderItem.vue";
import SongItem from "components/item/SongItem.vue";
import Pagination from "components/item/Pagination.vue";
import { getSingerMusic } from "@/network/music";

export default {
  name: "singer-music",
  components: {
    HeaderItem,
    SongItem,
    Pagination,
  },
  data() {
    return {
      singerInfo: [],
      aid: 0,
      total: 0,
      pn: 0,
      rn: 30,
      eventName: "SingerPage",
    };
  },
  created() {
    this.$bus.$on(this.eventName, (pn) => {
      this.changeSingerMusic(pn);
    });
  },
  activated() {
    if (this.aid != this.$route.params.aid) {
      this.aid = this.$route.params.aid;
      this.pn = 0;
      this.changeSingerMusic(1);
    } else {
      this.$store.commit("changeSongList", this.singerInfo.songList);
    }
  },
  methods: {
    changeSingerMusic(pn) {
      if (pn != this.pn) {
        getSingerMusic(this.aid, pn).then((res) => {
          this.singerInfo = res.data;
          this.total = res.data.total;
          this.$store.commit("changeSongList", this.singerInfo.songList);
          this.pn = pn;
        });
      }
    },
  },
};
</script>

<style scoped>
</style>
