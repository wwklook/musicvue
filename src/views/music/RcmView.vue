<template>
  <div class="content">
    <h2>歌单</h2>
    <div class="rcms">
      <rcm-item v-for="(item, index) in rcm_list" :key="index" :data="item" />
    </div>
    <div>
      <pagination :total="total" :pn="pn" :rn="rn" :eventName="eventName" />
    </div>
  </div>
</template>

<script>
import RcmItem from "components/item/RcmItem.vue";
import Pagination from "components/item/Pagination.vue";

import { getRcms } from "@/network/music";

export default {
  name: "rcm-view",
  components: {
    RcmItem,
    Pagination,
  },
  data() {
    return {
      rcm_list: [],
      total: 0,
      pn: 0,
      rn: 30,
      eventName: "RcmPage",
    };
  },
  created() {
    this.changeRcm(1);
    this.$bus.$on(this.eventName, (pn) => {
      this.changeRcm(pn);
    });
  },
  methods: {
    changeRcm(pn) {
      getRcms(pn).then((res) => {
        this.rcm_list = res.data.data;
        this.total = res.data.total;
        this.pn = pn;
      });
    },
  },
};
</script>

<style scoped>
.rcms {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  height: 563px;
  width: 880px;
  overflow-y: auto;
}
</style>
