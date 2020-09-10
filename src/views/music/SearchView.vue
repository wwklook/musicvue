<template>
  <div class="content">
    <h2>"{{word}}"的搜索结果</h2>
    <div class="search_info" :style="{height: total>rn?'563px':'600px'}">
      <header-item />
      <song-item v-for="(item, index) in search_list" :key="index" :data="item" :num="index" />
    </div>
    <div>
      <pagination :total="total" :pn="pn" :rn="rn" :eventName="eventName" />
    </div>
  </div>
</template>

<script>
import SongItem from "components/item/SongItem.vue";
import HeaderItem from "components/item/HeaderItem.vue";
import Pagination from "components/item/Pagination.vue";
import { getSearchList } from "@/network/music";

export default {
  name: "searchView",
  components: {
    SongItem,
    HeaderItem,
    Pagination,
  },
  data() {
    return {
      search_list: [],
      word: "",
      total: 0,
      pn: 0,
      rn: 30,
      eventName: "SearchPage",
    };
  },
  watch: {
    "$route.query.word": "search",
  },
  created() {
    this.$bus.$on(this.eventName, (pn) => {
      this.getList(pn);
    });
  },
  activated() {
    if (this.word == this.$route.query.word) {
      this.$store.commit("changeSongList", this.search_list);
    } else {
      this.search();
    }
  },
  methods: {
    getList(pn) {
      this.word = this.$route.query.word;
      getSearchList(this.word, pn).then((res) => {
        this.search_list = res.data.songlist;
        this.total = res.data.total;
        this.$store.commit("changeSongList", this.search_list);
        this.pn = pn;
      });
    },
    search() {
      if (this.$route.name != "Search") {
        return;
      }
      this.pn = 0;
      this.getList(1);
    },
  },
};
</script>

<style scoped>
.search_info {
  width: 880px;
  height: 563px;
  overflow-y: auto;
}
</style>
