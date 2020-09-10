<template>
  <div class="content">
    <h2>播放列表</h2>
    <header-item />
    <div class="play_list" ref="play_list">
      <play-item
        v-for="(item, index) in play_list"
        :class="{current: playIndex==index}"
        :key="index"
        :data="item"
        :num="index"
      />
    </div>
  </div>
</template>

<script>
import PlayItem from "components/item/PlayItem.vue";
import HeaderItem from "components/item/HeaderItem.vue";
import { getRankList } from "@/network/music";

export default {
  name: "playlist-view",
  components: {
    PlayItem,
    HeaderItem,
  },
  data() {
    return {
      play_list: [],
    };
  },
  computed: {
    playIndex() {
      return this.$store.state.playIndex;
    },
  },
  activated() {
    this.play_list = this.$store.state.playList;
    this.$refs.play_list.scrollTop = this.$store.state.playIndex * 60;
  },
};
</script>

<style scoped>
.play_list {
  width: 880px;
  height: 600px;
  overflow-y: auto;
}
.current {
  background: #b9d3ee;
}
</style>
