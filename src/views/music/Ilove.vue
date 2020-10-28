<template>
  <div class="content">
    <h2>我喜欢</h2>
    <div class="ilove">
      <header-item />
      <love-item
        v-for="(item, index) in music_list"
        :key="index"
        :data="item"
        :num="index"
      />
    </div>
    <div class="pagination">
      <pagination :total="total" :pn="pn" :rn="rn" :eventName="eventName" />
    </div>
  </div>
</template>

<script>
import LoveItem from "components/item/LoveItem.vue";
import HeaderItem from "components/item/HeaderItem.vue";
import Pagination from "components/item/Pagination.vue";
import { getIlove } from "@/network/music";
export default {
  name: "Love",
  components: {
    LoveItem,
    HeaderItem,
    Pagination,
  },
  data() {
    return {
      total: 0,
      pn: 0,
      rn: 30,
      rid: 0,
      eventName: "IlovePage",
      music_list: []
    };
  },
  activated() {
    this.music_list = this.$store.state.ilovelist;
    this.$store.commit("changeSongList", this.music_list )
  },
};
</script>

<style scoped>
.ilove {
  height: 603px;
  width: 880px;
  background-color: #8a8a8a;
  opacity: 0.8;
  overflow: auto;
}
.pagination {
  width: 100%;
  position: absolute;
  bottom: 0;
}
</style>
