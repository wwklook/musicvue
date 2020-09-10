<template>
  <div class="item">
    <div class="song_num">
      <span>{{num + 1}}</span>
      <img
        class="photo"
        :src="data.pic120 || 'https://h5static.kuwo.cn/upload/image/4f768883f75b17a426c95b93692d98bec7d3ee9240f77f5ea68fc63870fdb050.png'"
      />
      <img v-if="data.hasmv == 1" class="mv" title="播放MV" @click="toMV" src="~assets/icon/MV.png" />
    </div>
    <div class="song_name">
      <span>{{data.name}}</span>
    </div>
    <div class="song_singer">
      <span class="cur" @click="toSinger">{{data.artist}}</span>
    </div>
    <div class="song_album">
      <span class="cur" @click="toAlbum">{{data.album}}</span>
    </div>
    <div class="song_time">{{data.songTimeMinutes}}</div>
    <div class="ctrl">
      <img title="播放" src="~assets/icon/player.png" @click="play" />
      <img title="加入播放列表" src="~assets/icon/add.png" @click="add" />
      <img title="收藏" src="~assets/icon/like.png" />
      <img title="下载" src="~assets/icon/load.png" />
    </div>
  </div>
</template>

<script>
export default {
  props: ["data", "num"],
  methods: {
    play() {
      this.$bus.$emit("playMusic", this.num);
    },
    add() {
      if (this.$store.state.playList.includes(this.data)) {
        this.$toast.show("已存在");
      } else {
        this.$store.commit("addSong", this.num);
        this.$toast.show("添加\"" + this.data.name + "\"成功");
      }
    },
    toSinger() {
      if (this.$route.name != "Singer") {
        this.$router.push({ name: "Singer", params: { aid:this.data.artistid } });
      }
    },
    toAlbum() {
      if (this.$route.name != "Album") {
        this.$router.push({ name: "Album", params: { aid: this.data.albumid } });
      }
    },
    toMV(){
      this.$router.push({ name: "MvPage", params: { 'index': this.num } });
    }
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
