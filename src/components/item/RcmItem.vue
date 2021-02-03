<template>
  <div class="rcm_item">
    <img class="rcm_img" :src="data.img" @click="toRcmList" />
    <div class="rcm_name">
      <span @click="toRcmList">{{data.name}}</span>
    </div>
    <div class="listencnt">▷{{data.listencnt}}</div>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  methods: {
    toRcmList() {
      this.$router.push({ name: "RcmList", params: { pid: this.data.id, pn: 1 } });
    },
  },
};
</script>

<style scoped>
.rcm_item {
  width: 195px;
  margin: 15px 0;
  height: 275px;
  position: relative;
  display: flex;
  flex-direction: column;
}
.rcm_img {
  width: 190px;
  margin: 0 5px;
  cursor: pointer;
}
.rcm_name {
  margin: 5px 8px;
}
.rcm_name span {
  white-space: normal;
  font-size: 17px;
  cursor: pointer;
}
.rcm_name span:hover {
  color: ghostwhite;
}
.listencnt {
  font-size: 16px;
  color: ghostwhite;
  position: absolute;
  bottom: 4px;
  left: 10px;
}
</style>