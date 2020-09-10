<template>
  <div class="content">
    <h2>歌手排行</h2>
    <div class="singer_rank">
      <singer-rank-item
        v-for="(item, index) in artistList"
        :key="index"
        :pic="item.pic120"
        :name="item.name"
        :aid="item.id"
        :musicNum="item.musicNum"
      />
    </div>
    <pagination :total="total" :pn="pn" :rn="rn" :eventName="eventName"/>
  </div>
</template>

<script>
import SingerRankItem from "components/item/SingerRankItem.vue";
import Pagination from "components/item/Pagination.vue";
import { getSingerRank } from "@/network/music";
export default {
  name: "singerRankView",
  components: {
    SingerRankItem,
    Pagination,
  },
  data() {
    return {
      artistList: [],
      total: 0,
      pn: 1,
      rn: 100,
      eventName: "SingerRankPage",
    };
  },
  created() {
    this.changeSingerRank(this.pn);
    this.$bus.$on(this.eventName, (pn) => {
      this.changeSingerRank(pn);
    });
  },
  methods: {
    changeSingerRank(pn) {
      getSingerRank(pn).then((res) => {
        this.artistList = res.data.artistList;
        this.total = res.data.total;
        this.pn = pn;
      });
    },
  },
};
</script>

<style scoped>
.singer_rank {
  width: 880px;
  height: 563px;
  overflow-y: auto;
  display: flex;
  flex-wrap: wrap;
}
</style>
