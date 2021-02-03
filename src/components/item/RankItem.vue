<template>
  <div class="rank_item">
    <router-link
          v-for="(item, index) in rank"
          :key="index"
          :to="{path: '/music/rank', query:{id:item.id}}"
          @click.native="ItemClick(item.id)"
          tag="li"
        >{{item.name}}</router-link>
  </div>
</template>

<script>
export default {
  data() {
    return {
      rank: [
        { name: "飙升榜", id: 93 },
        { name: "热歌榜", id: 16 },
        { name: "电音榜", id: 242 },
        { name: "Vlog音乐榜", id: 264 },
        { name: "华语榜", id: 104 },
        { name: "日语榜", id: 183 },
        { name: "公信榜", id: 15 },
        { name: "轻音乐榜", id: 283 },
      ],
    }
  },
  methods: {
    ItemClick(id){
      this.$bus.$emit("rankItemClick", id)
    }
  }
}
</script>

<style scoped>
.rank_item li {
  background-color: rgb(200, 240, 247);
  padding-top: 8px;
  padding-bottom: 8px;
  padding-left: 20px;
  font-size: 26px;
  font-family: SimSun;
  cursor: pointer;
  border-bottom: 1px solid #c7c7c7;
}

.rank_item li:nth-child(odd) {
  background-color: #e0ffff;
}

.rank_item li:hover {
  background-color: #b9d3ee;
}
</style>