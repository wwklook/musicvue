<template>
  <div class="box1">
    <img src="~/assets/icon/back.png" v-show="isShow" @click="back" />
    <input
      @keyup.enter="search"
      type="text"
      name="word"
      ref="input"
      class="search"
      placeholder="搜索音乐/MV/歌手"
    />
  </div>
</template>

<script>
export default {
  name: "Top",
  data() {
    return {
      word: "",
      isShow: false,
    };
  },
  watch: {
    $route(now, old) {
      if (now.path == "/music") {
        this.isShow = false;
      } else {
        this.isShow = true;
      }
    },
  },
  methods: {
    search() {
      let word = this.$refs.input.value;
      if (word != "" && (word != this.word || this.$route.name != "Search")) {
        this.word = word;
        this.$router.push({ name: "Search", query: { word } });
      }
    },
    back(){
      this.$router.back()
    },
  },
};
</script>

<style scoped>
img {
  height: 50px;
  padding: 0px 10px;
  cursor: pointer;
}
img:hover {
  background-color: azure;
}
.box1 {
  opacity: 0.6;
  width: 1100px;
  height: 50px;
  background: #66ccffcc;
}

.search {
  float: right;
  width: 220px;
  height: 30px;
  padding-left: 10px;
  font-size: 16px;
  margin: 11px;
  border: none;
  border-radius: 14px;
  outline: none;
}
</style>
