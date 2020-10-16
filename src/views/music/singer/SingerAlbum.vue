<template>
  <div>
    <div class="singer_album">
      <album-item v-for="(item, index) in albumList" :key="index" :info="item" />
    </div>
    <pagination :total="total" :pn="pn" :rn="rn" :eventName="eventName" />
  </div>
</template>

<script>
import HeaderItem from "components/item/HeaderItem.vue";
import AlbumItem from "components/item/AlbumItem.vue";
import Pagination from "components/item/Pagination.vue";
import { getSingerAlbum } from "@/network/music";

export default {
  name: "singer-album",
  components: {
    HeaderItem,
    AlbumItem,
    Pagination,
  },
  data() {
    return {
      albumList: [],
      aid: 0,
      total: 0,
      pn: 0,
      rn: 30,
      eventName: "SingerAlbum",
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
      this.changeSingerAlbum(1);
    }
  },
  methods: {
    changeSingerAlbum(pn) {
      if (pn != this.pn) {
        getSingerAlbum(this.aid, pn).then((res) => {
          this.albumList = res.data.albumList;
          this.total = res.data.total;
          this.pn = pn;
        });
      }
    },
  },
};
</script>

<style scoped>
.singer_album {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}
</style>
