<template>
  <div class="item">
    <div class="song_num">
      <span>{{ num + 1 }}</span>
      <img
        class="photo"
        :src="
          data.pic120 ||
          'https://h5static.kuwo.cn/upload/image/4f768883f75b17a426c95b93692d98bec7d3ee9240f77f5ea68fc63870fdb050.png'
        "
      />
      <img
        v-if="data.hasmv == 1"
        class="mv"
        title="播放MV"
        @click="toMV"
        src="~assets/icon/MV.png"
      />
    </div>
    <div class="song_name">
      <span>{{ data.name }}</span>
    </div>
    <div class="song_singer">
      <span class="cur" @click="toSinger">{{ data.artist }}</span>
    </div>
    <div class="song_album">
      <span class="cur" @click="toAlbum">{{ data.album }}</span>
    </div>
    <div class="song_time">{{ data.songTimeMinutes }}</div>
    <div class="ctrl">
      <img title="播放" src="~assets/icon/player.png" @click="play" />
      <img title="加入播放列表" src="~assets/icon/add.png" @click="add" />
      <img title="收藏" :src="likeImg" @click="like" />
      <img title="下载" src="~assets/icon/load.png" />
    </div>
  </div>
</template>

<script>
import { addIlove, delILove } from "@/network/music";
export default {
  props: ["data", "num"],
  computed: {
    islike() {
      return this.$store.state.iloverid.indexOf(this.data.rid + "") !== -1;
    },
    likeImg() {
      return this.islike
        ? require("assets/icon/_like.png")
        : require("assets/icon/like.png");
    },
  },
  methods: {
    play() {
      this.$bus.$emit("playMusic", this.num);
    },
    add() {
      if (this.$store.state.playList.includes(this.data)) {
        this.$toast.show("播放列表已存在本歌曲");
      } else {
        this.$store.commit("addSong", this.num);
        this.$toast.show('已添加"' + this.data.name + '"到播放列表');
      }
    },
    toSinger() {
      if (this.$route.name != "Singer") {
        this.$router.push({
          name: "Singer",
          params: { aid: this.data.artistid },
        });
      }
    },
    toAlbum() {
      if (this.$route.name != "Album") {
        this.$router.push({
          name: "Album",
          params: { aid: this.data.albumid },
        });
      }
    },
    toMV() {
      this.$router.push({ name: "MvPage", params: { index: this.num } });
    },
    like() {
      if (!this.$store.state.isLogin) {
        this.$toast.show("请先登录");
        return;
      }
      if (this.islike) {
        delILove(this.data.rid).then((res) => {
          let index = this.$store.state.iloverid.indexOf(this.data.rid + "");
          this.$store.commit("delLove", index);
          this.$store.commit("delLoverid", index);
          this.$toast.show('取消收藏"' + this.data.name + '"成功');
        });
        return;
      }
      addIlove(this.data, this.data.rid).then((res) => {
        this.$store.commit("addLove", this.data);
        this.$store.commit("addLoverid", this.data.rid + "");
        this.$toast.show('收藏"' + this.data.name + '"成功');
      });
    },
  },
};
</script>

<style scoped>
.item {
  position: relative;
  display: flex;
  align-items: center;
  height: 60px;
  background-color: #e0ffff;
  user-select: none;
}
.item:hover .ctrl {
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.item:hover {
  background: #b9d3ee;
}
.item img {
  cursor: pointer;
}
.song_num {
  display: flex;
  align-items: center;
  width: 120px;
  font-weight: 600;
  margin-left: 30px;
}
.song_name {
  width: 250px;
}
.song_album {
  width: 250px;
}

.song_singer {
  width: 150px;
}
.song_time {
  width: 60px;
}

.photo {
  margin-left: 10px;
  height: 48px;
  width: 48px;
}
.mv {
  width: 24px;
  height: 24px;
  cursor: pointer;
  margin-left: 3px;
}

.cur {
  cursor: pointer;
}
.ctrl {
  width: 200px;
  position: absolute;
  height: 60px;
  display: none;
  background-color: #b9d3ee;
  right: 20px;
}
.ctrl img {
  width: 22px;
  height: 22px;
}
</style>
