<template>
  <div>
    <div class="singer_mvs">
      <mv-item v-for="(item, index) in mv_list" :key="index" :info="item" :index="index" />
    </div>
    <pagination :total="total" :pn="pn" :rn="rn" :eventName="eventName" />
  </div>
</template>

<script>
import MvItem from "components/item/MvItem.vue";
import Pagination from "components/item/Pagination.vue";
import { getSingerMv } from "@/network/music";

export default {
  name: "singer-mv",
  components: {
    MvItem,
    Pagination,
  },
  data() {
    return {
      mv_list: {},
      aid: 0,
      total: 0,
      pn: 0,
      rn: 30,
      eventName: "SingerMv",
    };
  },
  created() {
    this.$bus.$on(this.eventName, (pn) => {
      this.changeSingerMv(pn);
    });
  },
  activated() {
    if (this.aid != this.$route.params.aid) {
      this.aid = this.$route.params.aid;
      this.pn = 0;
      this.changeSingerMv(1);
    } else {
      this.$store.commit("changeMvList", this.mv_list);
    }
  },
  methods: {
    changeSingerMv(pn) {
      if (pn != this.pn) {
        getSingerMv(this.aid, pn).then((res) => {
          this.mv_list = res.data.mvlist;
          this.total = res.data.total;
          this.$store.commit("changeMvList", this.mv_list);
          this.pn = pn;
        });
      }
    },
  },
};
</script>

<style scoped>
.singer_mvs {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}
</style>
