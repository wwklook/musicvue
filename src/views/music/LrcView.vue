<template>
    <div class="cover">
      <img class="cover_img" :src="songInfo.pic || defaultImg" />
      <div class="detail">
        <div class="cover_song">{{ songInfo.name }}</div>
        <div>
          歌手 :
          <span class="cover_name" @click="toAlbum">{{ songInfo.artist }}</span>
          专辑 :
          <span class="cover_album" @click="toSinger">{{ songInfo.album }}</span>
        </div>
        <div class="lrc" ref="lrc">
          <p></p>
          <p></p>
          <p></p>
          <p></p>
          <p></p>
          <p
            v-for="(item, index) in lrclist"
            :key="index"
            :class="{current: lrcIndex==index}"
          >{{item.lineLyric}}</p>
          <p></p>
          <p></p>
          <p></p>
          <p></p>
          <p></p>
          <p></p>
        </div>
      </div>
    </div>
</template>

<script>
export default {
  data() {
    return {
      lrclist: [],
      songInfo: {},
      lrcIndex: 0,
      defaultImg:
        "https://h5static.kuwo.cn/upload/image/4f768883f75b17a426c95b93692d98bec7d3ee9240f77f5ea68fc63870fdb050.png",
    };
  },
  created() {
    this.songInfo = this.$route.params.songInfo;
    this.lrclist = this.$route.params.lrclist;
    this.$bus.$on("changeLrc", (index) => {
      this.lrcIndex = index;
      animate(this.$refs.lrc, { scrollTop: index * 36 });
    });
    this.$bus.$on("changeLrcList", (lrclist, songInfo) => {
      this.lrclist = lrclist;
      this.songInfo = songInfo;
    });
  },
  methods: {
    toAlbum() {
      this.$router.push({
        name: "Album",
        params: { aid: this.songInfo.albumId },
      });
    },
    toSinger() {
      this.$router.push({
        name: "Singer",
        params: { aid: this.songInfo.artistId },
      });
    },
  },
};
function animate(obj, json, fn) {
  clearInterval(obj.timer);
  obj.timer = setInterval(function () {
    var flag = true;
    for (var k in json) {
      if (k === "opacity") {
        var leader = getComputedStyle(obj, null)[k] * 100;
        var tag = json[k] * 100;
        var step = (tag - leader) / 15;
        step = step > 0 ? Math.ceil(step) : Math.floor(step);
        leader += step;
        obj.style[k] = leader / 100;
      } else if (k === "scrollTop") {
        var leader = obj[k];
        var tag = json[k];
        var step = (tag - leader) / 15;
        step = step > 0 ? Math.ceil(step) : Math.floor(step);
        leader += step;
        obj[k] = leader;
      } else {
        var leader = parseInt(getComputedStyle(obj, null)[k]) || 0;
        var tag = json[k];
        var step = (tag - leader) / 15;
        step = step > 0 ? Math.ceil(step) : Math.floor(step);
        leader += step;
        obj.style[k] = leader + "px";
      }
      if (leader !== tag) {
        flag = false;
      }
    }
    if (flag) {
      clearInterval(obj.timer);
      if (fn) {
        fn();
      }
    }
  }, 15);
}
</script>

<style scoped>
.cover {
  height: 630px;
  width: 880px;
  background-color: #8a8a8a;
  opacity: 0.8;
  display: flex;
  border-radius: 20px;
}
.cover_img {
  width: 300px;
  height: 300px;
  border-radius: 50%;
  margin: 20px;
}
.detail {
  width: 500px;
  height: 600px;
  color: white;
  text-align: center;
}
.cover_song {
  font-size: 30px;
  margin-top: 50px;
  margin-bottom: 10px;
}
.cover_name {
  margin-right: 30px;
  cursor: pointer;
}
.cover_album {
  cursor: pointer;
}
.lrc {
  overflow: hidden;
  width: 500px;
  height: 400px;
  margin-top: 50px;
}
.lrc p {
  margin-top: 0px;
  margin-bottom: 15px;
  height: 21px;
}
.current {
  font-weight: bold;
  font-size: 21px;
  line-height: 26px;
  color: aqua;
}
</style>
