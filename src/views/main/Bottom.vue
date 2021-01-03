<template>
  <div class="tool">
    <div class="control">
      <img id="img" :src="songInfo.pic120 || defaultImg" @click="toLrc" />
      <div class="info">
        <div class="song">
          <span id="sname" :title="songInfo.name || ''">{{songInfo.name}}</span>
          <span
            id="sartist"
            @click="toSinger"
            :title="songInfo.artist || ''"
          >- {{songInfo.artist||''}}</span>
        </div>
        <span id="time">{{time || "00:00/00:00"}}</span>
        <input
          type="range"
          ref="slider"
          max="400"
          min="0"
          step="1"
          value="0"
          @change="change"
          @input="input"
        />
      </div>
      <div class="btn1">
        <img title="上一首" src="~assets/icon/last.png" @click="lastSong" />
        <img title="播放" :src="playImg" @click="paused" />
        <img title="下一首" src="~assets/icon/next.png" @click="nextSong" />
      </div>
      <div class="btn2">
        <img title="收藏" src="~assets/icon/like.png" />
        <img title="下载" src="~assets/icon/load.png" />
        <img title="评论" src="~assets/icon/comment.png" @click="showComment" />
        <img :title="loopName" :src="loopImg" @click="loop" />
        <img title="播放列表" src="~assets/icon/play_list.png" @click="showPlaylist" />
        <div class="bar">
          <img title="音量" @click="click_vol" :src="vol_img" />
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            ref="vol_slider"
            @input="input_vol"
            :value="volume"
          />
        </div>
      </div>
    </div>
    <audio
      ref="audio"
      :src="url"
      @ended="end"
      @loadstart="start"
      @loadedmetadata="metadata"
      @timeupdate="update"
    ></audio>
  </div>
</template>

<script>
import { getSongInfoAndLrc, getMusicUrl } from "@/network/music.js";

export default {
  data() {
    return {
      url: "",
      isPlaying: false,
      isClickSlider: false,
      playList: [],
      isInit: false,
      playIndex: 0,
      time: "00:00/00:00",
      volume: 1,
      vol_img: require("assets/icon/volume.png"),
      defaultImg:
        "https://h5static.kuwo.cn/upload/image/4f768883f75b17a426c95b93692d98bec7d3ee9240f77f5ea68fc63870fdb050.png",
      songInfo: {
        pic: "",
        name: "享受好歌,默认最高音质播放！！！",
        artist: "",
        artistId: 0,
      },
      lrclist: [],
      isLrcCreated: false,
      playImg: require("assets/icon/play.png"),
      loopName: "列表循环",
      loopImg: require("assets/icon/list_loop.png"),
    };
  },
  watch: {
    "$store.state.playList": "changePlayList",
  },
  created() {
    this.$bus.$on("playMusic", (index) => {
      this.playIndex = index;
      this.playList = this.$store.state.songList;
      this.$store.commit("changePlayList", this.playList);
      this.replay();
    });
    this.$bus.$on("changePlay", (index) => {
      if (index == this.playList.length - 1) {
        this.playIndex = 0;
      } else {
        this.playIndex = index;
      }
      this.replay();
    });
  },
  methods: {
    changePlayList() {
      this.playList = this.$store.state.playList;
    },
    showComment(){
      if (this.$route.name == "Comments") {
        this.$router.back();
      } else {
        this.$router.push({ name: "Comments" });
      }
    },
    replay() {
      if (this.playList.length === 0) {
        return
      }
      let rid = this.playList[this.playIndex].rid;
      this.$store.commit("changePlayIndex", this.playIndex);
      this.isInit = true;
      getSongInfoAndLrc(rid)
        .then((res) => {
          this.isPlaying = false;
          this.url = res.data.url;
          this.lrclist = res.data.lrc;
          this.songInfo = this.playList[this.playIndex];
          document.title = this.songInfo.name + "-" + this.songInfo.artist;
          setTimeout(() => {
            this.play();
          }, 100);
        })
        .catch((err) => console.log(err));
    },
    play() {
      this.$refs.audio.play();
      this.isPlaying = true;
      this.playImg = require("assets/icon/pause.png");
    },
    lastSong() {
      if (!this.isInit) {
        return;
      }
      if (this.playIndex === 0) {
        this.playIndex = this.playList.length - 1;
      } else {
        this.playIndex -= 1;
      }
      this.replay();
    },
    nextSong() {
      if (!this.isInit) {
        return;
      }
      if (this.playIndex < this.playList.length - 1) {
        this.playIndex += 1;
      } else {
        this.playIndex = 0;
      }
      this.replay();
    },
    loop() {
      if (this.loopName == "列表循环") {
        this.loopImg = require("assets/icon/loop.png");
        this.loopName = "单曲循环";
      } else if (this.loopName == "单曲循环") {
        this.loopImg = require("assets/icon/random.png");
        this.loopName = "随机播放";
      } else {
        this.loopImg = require("assets/icon/list_loop.png");
        this.loopName = "列表循环";
      }
    },
    showPlaylist() {
      if (this.$route.name == "Playlist") {
        this.$router.back();
      } else {
        this.$router.push({ name: "Playlist" });
      }
    },
    end: function () {
      if (this.loopName == "列表循环") {
        this.nextSong();
      } else if (this.loopName == "单曲循环") {
        this.$refs.audio.currentTime = 0;
        this.$refs.audio.play();
      } else {
        let r = parseInt(Math.random() * this.playList.length);
        this.playIndex = r;
        this.replay();
      }
    },
    update: function () {
      let audio = this.$refs.audio;
      let slider = this.$refs.slider;
      if (this.$route.name == "Lrc") {
        let num = this.lrclist.length - 1;
        for (let i = 0; i < this.lrclist.length; i++) {
          if (audio.currentTime <= this.lrclist[i]["time"]) {
            num = i - 1;
            break;
          }
        }
        if (num != this.lrcindex) {
          this.lrcindex = num;
          this.$bus.$emit("changeLrc", num);
        }
      }
      this.time =
        this.toTime(audio.currentTime) + "/" + this.toTime(audio.duration);
      if (this.isClickSlider == false) {
        slider.value = (audio.currentTime / audio.duration) * 400;
        slider.style.backgroundSize = slider.value / 4 + "% 100%";
      }
    },
    start: function () {
      this.time = "00:00/00:00";
      this.$refs.slider.style.value = 0;
    },
    metadata: function () {
      this.$refs.slider.style.value = 0;
      this.$bus.$emit("changeLrcList", this.lrclist, this.songInfo);
    },
    paused: function () {
      if (!this.isInit) {
        return;
      }
      if (this.isPlaying) {
        this.$refs.audio.pause();
        this.isPlaying = false;
        this.playImg = require("assets/icon/play.png");
      } else {
        this.$refs.audio.play();
        this.isPlaying = true;
        this.playImg = require("assets/icon/pause.png");
      }
    },
    change: function () {
      this.isClickSlider = false;
      let audio = this.$refs.audio;
      let slider = this.$refs.slider;
      audio.currentTime = (slider.value * audio.duration) / 400;
    },
    input: function () {
      let slider = this.$refs.slider;
      this.isClickSlider = true;
      slider.style.backgroundSize = slider.value / 4 + "% 100%";
    },
    click_vol() {
      if (this.$refs.audio.muted) {
        this.$refs.audio.muted = false;
        this.$refs.audio.volume = this.volume;
        this.volume = this.$refs.vol_slider.value;
        this.$refs.vol_slider.style.backgroundSize = this.volume * 100 + "% 100%";
        this.vol_img = require("assets/icon/volume.png");
      } else {
        this.volume = this.$refs.audio.volume;
        this.$refs.audio.muted = true;
        this.$refs.vol_slider.style.backgroundSize = "0% 100%";
        this.vol_img = require("assets/icon/muted.png");
      }
    },
    input_vol() {
      this.volume = this.$refs.vol_slider.value;
      this.$refs.audio.volume = this.volume;
      this.$refs.vol_slider.style.backgroundSize = this.volume * 100 + "% 100%";
      if (this.$refs.vol_slider.value == 0) {
        this.$refs.audio.muted = true;
        this.vol_img = require("assets/icon/muted.png");
      } else {
        this.$refs.audio.muted = false;
        this.vol_img = require("assets/icon/volume.png");
      }
    },
    toLrc() {
      if (!this.isInit) {
        return;
      }
      if (this.isLrcCreated) {
        this.$router.push({
          name: "Lrc",
        });
      } else {
        this.isLrcCreated = true;
        this.$router.push({
          name: "Lrc",
          params: { lrclist: this.lrclist, songInfo: this.songInfo },
        });
      }
    },
    toSinger() {
      this.$router.push({
        name: "Singer",
        params: { aid: this.songInfo.artistId },
      });
    },
    toTime(x) {
      let m = parseInt(x / 60); // 分
      let s = parseInt(x % 60); // 秒
      if (m < 10) {
        m = "0" + m;
      }
      if (s < 10) {
        s = "0" + s;
      }
      return m + ":" + s;
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
.tool {
  background: rgb(155, 216, 235, 0.8);
}

.control {
  display: flex;
}

.info {
  width: 400px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
}

.song {
  width: 290px;
  margin-left: 10px;
}

#sname {
  cursor: pointer;
}

#sartist {
  cursor: pointer;
}

.info input[type="range"] {
  -webkit-appearance: none;
  width: 400px;
  height: 5px;
  border-radius: 2px;
  background: -webkit-linear-gradient(#ffffff, #5cdee4) no-repeat, #82a5a3;
  background-size: 0% 100%;
  outline: none;
  cursor: pointer;
}

input[type="range"]::-webkit-slider-thumb,
-moz-range-thumb {
  -webkit-appearance: none;
  width: 15px;
  height: 15px;
  border: 0;
  /*background: url("../../assets/icon/ico.png");*/
  background-size: cover;
}

input[type="range"]::-ms-fill-lower {
  -webkit-appearance: none;
  background: #82a5a3;
}

.bar {
  height: 20px;
}

.bar:hover input[type="range"] {
  display: block;
}

.bar input[type="range"] {
  -webkit-appearance: none;
  width: 80px;
  height: 5px;
  right: 10px;
  bottom: 75px;
  border-radius: 2px;
  background: -webkit-linear-gradient(#ffffff, #5cdee4) no-repeat, #82a5a3;
  background-size: 100% 100%;
  display: none;
  cursor: pointer;
  position: absolute;
  z-index: 1;
  outline: none;
  transform: rotate(270deg);
}

.btn1 {
  width: 210px;
  margin-left: 10px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
}

.btn2 {
  width: 350px;
  margin-left: 10px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
}

.btn1 img {
  width: 40px;
  height: 40px;
  cursor: pointer;
}

.btn2 img {
  width: 20px;
  height: 20px;
  cursor: pointer;
}

#img {
  margin-left: 50px;
  height: 60px;
  width: 60px;
  cursor: pointer;
}
</style>
