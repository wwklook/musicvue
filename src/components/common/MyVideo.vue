<template>
  <div class="video" @mousemove="show_ctrl" @mouseout="hide_ctrl">
    <div class="player">
      <video
        :src="url"
        ref="video"
      ></video>
    </div>
    <div class="mv_ctrl" ref="mv_ctrl">
      <div class="left">
        <img title="播放" :src="play_img" @click="paused" />
        <img title="下一首" src="mv_next.png" @click="next" />
        <span>00:00/00:00</span>
      </div>
      <div class="right">
        <button>1X</button>
        <img title="音量" src="~assets/icon/mv_volume.png" />
        <input type="range" max="1" min="0" step="0.01" value="1" />
        <img title="网页全屏" src="~assets/icon/full_browser.png" />
        <img title="全屏" src="~assets/icon/full screen.png" />
      </div>
      <!-- <input type="range" id="mv_slider" max="1000" min="0" step="1" value="0"> -->
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      isPlaying: false,
      play_img: require("assets/icon/mv_play.png"),
      url: ""
    };
  },
  methods: {
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
    next() {
      console.log(1);
    },
    show_ctrl() {
      animate(this.$refs.mv_ctrl, { opacity: 1 }, this.delay_hide(ctrl));
    },
    hide_ctrl() {
      animate(this.$refs.mv_ctrl, { opacity: 0 });
    },
    delay_hide(obj) {
      clearInterval(obj.time2);
      let num = 0;
      obj.time2 = setInterval(function () {
        console.log(num);
        if (num === 1) {
          clearInterval(obj.time2);
          video.hide_ctrl();
        } else {
          num += 1;
        }
      }, 1000);
    },
  },
};
</script>

<style scoped>
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
  background: white;
}

.mv_ctrl {
  width: 100%;
  height: 48px;
  opacity: 0;
  margin: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #ffffff78;
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
</style>