<template>
  <div class="content">
    <h2>歌单列表</h2>
    <div class="rcm_page" :style="{height: total>rn?'563px':'600px'}">
      <div class="rcm_info">
        <img class="rcm_img" :src="data.img300" />
        <div>
          <div class="name">{{ data.name }}</div>
          <div class="uname">
            <img class="u_img" :src="data.uPic" />
            <span>{{ data.userName }}</span>
          </div>
          <div class="tag">{{ data.tag }}</div>
          <div class="info">{{ data.info }}</div>
        </div>
      </div>
      <div class="rcm_list">
        <header-item />
        <song-item v-for="(item, index) in data.musicList" :key="index" :data="item" :num="index" />
      </div>
    </div>
    <div>
      <pagination :total="total" :pn="pn" :rn="rn" :eventName="eventName" />
    </div>
  </div>
</template>

<script>
import HeaderItem from "components/item/HeaderItem.vue";
import SongItem from "components/item/SongItem.vue";
import Pagination from "components/item/Pagination.vue";

import { getRcmList } from "@/network/music";

export default {
  name: "rcm-list-view",
  components: {
    HeaderItem,
    SongItem,
    Pagination,
  },
  data() {
    return {
      data: {},
      pid: 0,
      total: 0,
      pn: 0,
      rn: 30,
      eventName: "RcmListPage",
    };
  },
  created() {
    this.$bus.$on(this.eventName, (pn) => {
      this.changeRcmList(pn);
    });
  },
  activated() {
    if (this.pid != this.$route.params.pid) {
      this.pid = this.$route.params.pid;
      this.pn = 0;
      this.changeRcmList(1);
    } else {
      this.$store.commit("changeSongList", this.data.musicList);
    }
  },
  methods: {
    changeRcmList(pn) {
      if (pn != this.pn) {
        getRcmList(this.pid, pn).then((res) => {
          this.data = res.data.data;
          this.total = res.data.data.total;
          this.$store.commit("changeSongList", this.data.musicList);
          this.pn = pn;
        });
      }
    },
  },
};
</script>

<style scoped>
.rcm_page {
  width: 880px;
  height: 563px;
  overflow-y: auto;
}
.rcm_info {
  display: flex;
}
.rcm_img {
  width: 200px;
  height: 200px;
  margin: 10px;
}
.name {
  margin: 10px;
  font-weight: 700;
  font-size: 24px;
}
.uname {
  margin: 5px 0;
  display: flex;
  align-items: center;
}
.u_img {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  margin: 0 10px;
}
.tag {
  margin: 0 10px;
  color: #296294;
}
.info {
  margin: 3px 10px;
  font-size: 18px;
}
</style>
