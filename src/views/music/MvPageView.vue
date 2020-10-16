<template>
  <div class="content">
    <div class="mv_page">
      <div class="video" @mousemove="show_ctrl" @mouseout="hide_ctrl">
        <div class="player">
          <h2>
            <span v-html="mv_list[index].name"></span>-
            <span v-html="mv_list[index].artist"></span>
          </h2>
          <video :src="url" ref="video" @click="paused"></video>
        </div>
        <div class="mv_ctrl" @mousemove.stop="keep_ctrl" ref="mv_ctrl">
          <div class="left">
            <img title="播放" :src="play_img" @click="paused" />
            <img title="下一首" src="~assets/icon/mv_next.png" @click="nextMv" />
            <span>00:00/00:00</span>
          </div>
          <div class="right">
            <button @click="times">{{multiple}}X</button>
            <img title="音量" :src="vol_img" @click="click_vol" />
            <input
              type="range"
              ref="vol_slider"
              max="1"
              min="0"
              step="0.01"
              value="1"
              @input="input_vol"
            />
            <img title="网页全屏" src="~assets/icon/full_browser.png" />
            <img title="全屏" src="~assets/icon/full screen.png" />
          </div>
          <!-- <input type="range" id="mv_slider" max="1000" min="0" step="1" value="0"> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MyVideo from "components/common/MyVideo.vue";
import { getMvUrl } from "@/network/music";

export default {
  name: "MvPage-view",
  components: {
    MyVideo,
  },
  data() {
    return {
      url: "",
      index: 0,
      mv_list: [{ name: "M", artist: "V" }],
      isClickSlider: false,
      multiple: 1,
      volume: 1,
      vol_img: require("assets/icon/mv_volume.png"),
      play_img: require("assets/icon/mv_play.png"),
    };
  },
  activated() {
    this.index = this.$route.params.index;
    if (this.$route.params.from == "mvs") {
      this.mv_list = this.$store.state.mvList;
      this.playMv(this.mv_list[this.index].id);
    } else {
      this.mv_list = this.$store.state.songList;
      this.playMv(this.mv_list[this.index].rid);
    }
  },
  methods: {
    playMv(rid) {
      getMvUrl(rid).then((res) => {
        this.url = res.data;
        setTimeout(() => {
          this.isPlaying = true;
          this.play_img = require("assets/icon/mv_pause.png");
          this.$refs.video.play();
        }, 50);
      });
    },
    paused() {
      const v = this.$refs.video;
      if (this.isPlaying) {
        this.isPlaying = false;
        this.play_img = require("assets/icon/mv_play.png");
        v.pause();
      } else {
        this.isPlaying = true;
        this.play_img = require("assets/icon/mv_pause.png");
        v.play();
      }
    },
    nextMv() {
      if (this.index < this.mv_list.length - 1) {
        this.index += 1;
      } else {
        this.index = 0;
      }
      if (this.$route.params.from == "mvs") {
        this.playMv(this.mv_list[this.index].id);
      } else if (this.mv_list[this.index].hasmv == 1) {
        this.playMv(this.mv_list[this.index].rid);
      } else {
        this.nextMv();
      }
    },
    click_vol: function () {
      if (this.$refs.video.muted) {
        this.$refs.video.muted = false;
        this.$refs.video.volume = this.volume;
        this.volume = this.$refs.vol_slider.value;
        this.$refs.vol_slider.style.backgroundSize =
          this.volume * 100 + "% 100%";
        this.vol_img = require("assets/icon/mv_volume.png");
      } else {
        this.volume = this.$refs.video.volume;
        this.$refs.vol_slider.style.backgroundSize = "0% 100%";
        this.$refs.video.muted = true;
        this.vol_img = require("assets/icon/muted.png");
      }
    },
    input_vol: function () {
      this.volume = this.$refs.vol_slider.value;
      this.$refs.video.volume = this.volume;
      this.$refs.vol_slider.style.backgroundSize = this.volume * 100 + "% 100%";
      if (this.$refs.vol_slider.value == 0) {
        this.$refs.video.muted = true;
        this.vol_img = require("assets/icon/muted.png");
      } else {
        this.$refs.video.muted = false;
        this.vol_img = require("assets/icon/mv_volume.png");
      }
    },
    times() {
      if (this.multiple === 1) {
        this.multiple = 1.25;
      } else if (this.multiple === 1.25) {
        this.multiple = 1.5;
      } else if (this.multiple === 1.5) {
        this.multiple = 2;
      } else if (this.multiple === 2) {
        this.multiple = 0.5;
      } else if (this.multiple === 0.5) {
        this.multiple = 0.75;
      } else {
        this.multiple = 1;
      }
      this.$refs.video.playbackRate = this.multiple;
    },
    show_ctrl() {
      animate(
        this.$refs.mv_ctrl,
        { opacity: 1 },
        this.delay_hide(this.$refs.mv_ctrl)
      );
    },
    hide_ctrl() {
      animate(this.$refs.mv_ctrl, { opacity: 0 });
    },
    delay_hide(obj) {
      clearTimeout(obj.time2);
      obj.time2 = setTimeout(() => {
        animate(obj, { opacity: 0 });
      }, 2000);
    },
    keep_ctrl() {
      clearTimeout(this.$refs.mv_ctrl.time2);
      animate(this.$refs.mv_ctrl, { opacity: 1 });
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
.content {
  opacity: 1;
}
video {
  width: 100%;
  cursor: pointer;
}

img {
  cursor: pointer;
}

button {
  cursor: pointer;
  background: #66ccff;
  border: 1px solid #66bbff;
  border-radius: 10px;
  padding: 2px 8px;
  width: 50px;
}
button:hover {
  border-color:#66ffff;
}

.mv_page {
  height: 600px;
  width: 880px;
}
.video {
  display: flex;
  margin: 0;
  width: 880px;
  height: 600px;
  position: relative;
}
.player {
  width: 100%;
  height: 100%;
  background-color: rgb(144, 157, 158)
}

.mv_ctrl {
  width: 100%;
  height: 48px;
  opacity: 0;
  margin: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: absolute;
  bottom: 0;
  left: 0;
}

.mv_ctrl img {
  width: 32px;
  height: 32px;
  margin: 3px;
}

.left {
  display: flex;
  align-items: center;
}

.right {
  display: flex;
  align-items: center;
}
input[type="range"] {
  -webkit-appearance: none;
  width: 80px;
  height: 5px;
  border-radius: 2px;
  background: -webkit-linear-gradient(#ffffff, #5cdee4) no-repeat, #82a5a3;
  background-size: 100% 100%;
  outline: none;
  cursor: pointer;
}

input[type="range"]::-webkit-slider-thumb,
-moz-range-thumb {
  -webkit-appearance: none;
  width: 15px;
  height: 15px;
  border: 0;
  background-size: cover;
}
input[type="range"]::-ms-fill-lower {
  -webkit-appearance: none;
  background: #82a5a3;
}
</style>
