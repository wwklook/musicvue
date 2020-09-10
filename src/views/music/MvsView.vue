<template>
  <div class="content">
    <h2>M V</h2>
    <div class="mvs">
      <mv-item v-for="(item, index) in mv_list" :key="index" :info="item" :index="index" />
    </div>
    <div>
      <pagination :total="total" :pn="pn" :rn="rn" :eventName="eventName" />
    </div>
  </div>
</template>

<script>
import MvItem from "components/item/MvItem.vue";
import Pagination from "components/item/Pagination.vue";

import { getMvs } from "@/network/music";

export default {
  name: "mvs-view",
  components: {
    MvItem,
    Pagination,
  },
  data() {
    return {
      mv_list: {},
      total: 0,
      pn: 0,
      rn: 30,
      eventName: "MvsPage",
    };
  },
  created() {
    this.changeMvs(1);
    this.$bus.$on(this.eventName, (pn) => {
      this.changeMvs(pn);
    });
  },
  methods: {
    changeMvs(pn) {
      getMvs(pn).then((res) => {
        this.mv_list = res.data.mvlist;
        this.total = res.data.total;
        this.$store.commit('changeMvList', this.mv_list)
        this.pn = pn;
      });
    },
  },
};
</script>

<style scoped>
.mvs {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  overflow-y: auto;
  height: 563px;
  width: 880px;
}
</style>
