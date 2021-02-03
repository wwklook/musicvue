<template>
  <div class="content">
    <h2>我喜欢</h2>
    <div class="ilove">
      <header-item />
      <song-item
        v-for="(item, index) in love_list"
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
import SongItem from "components/item/SongItem.vue";
import HeaderItem from "components/item/HeaderItem.vue";
import Pagination from "components/item/Pagination.vue";
export default {
  name: "Love",
  components: {
    SongItem,
    HeaderItem,
    Pagination,
  },
  computed: {
    love_list() {
      return this.$store.state.ilovelist;
    },
  },
  data() {
    return {
      total: 0,
      pn: 0,
      rn: 30,
      rid: 0,
      eventName: "IlovePage",
    };
  },
  activated() {
    this.$store.commit("changeSongList", this.love_list);
  },
};
</script>

<style scoped>
.ilove {
  height: 603px;
  width: 880px;
  background-color: #8a8a8a;
  opacity: 0.8;
  overflow-y: auto;
}
.pagination {
  width: 100%;
  position: absolute;
  bottom: 0;
}
</style>
