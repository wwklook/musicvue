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
      <span class="cur" @click="toSinger(data.artistid)">{{data.artist}}</span>
    </div>
    <div class="song_album">
      <span class="cur" @click="toAlbum(data.albumid)">{{data.album}}</span>
    </div>
    <div class="song_time">{{data.songTimeMinutes}}</div>
    <div class="ctrl">
      <img title="播放" src="~assets/icon/player.png" @click="play" />
      <img title="收藏" src="~assets/icon/like.png" @click="like"/>
      <img title="下载" src="~assets/icon/load.png" />
      <img title="移出播放列表" src="~assets/icon/del.png" @click="del" />
    </div>
  </div>
</template>

<script>
export default {
  props: ["data", "num"],
  methods: {
    play() {
      this.$bus.$emit("changePlay", this.num);
    },
    del() {
      this.$store.commit("delSong", this.num);
      this.$toast.show("删除\"" + this.data.name + "\"成功");
      if (this.num == this.$store.state.playIndex) {
        this.$bus.$emit("changePlay", this.num-1);
      }
    },
    toSinger(aid) {
      if (this.$route.name != "Singer") {
        this.$router.push({ name: "Singer", params: { aid } });
      }
    },
    toAlbum(aid) {
      if (this.$route.name != "Album") {
        this.$router.push({ name: "Album", params: { aid } });
      }
    },
    toMV(){
      this.$router.push({ name: "MvPage", params: { 'index': this.num } });
    },
    like() {
      let mid = this.data.rid
      for (let i = 0; i < this.$store.state.ilovelist.length; i++) {
        if(this.$store.state.ilovelist[i].rid == mid){
          this.$toast.show("已收藏");
          return
        }
      }
      addIlove(mid).then((res) => {
        console.log(res.data);
        if (res.data == "success"){
          this.$toast.show('收藏"' + this.data.name + '"成功');
        } else {
          this.$toast.show('请先登录');
        }
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
