<template>
  <div class="main">
    <top></top>
    <div class="box2">
      <left></left>
      <!-- 主要正文 -->
      <keep-alive>
        <router-view />
      </keep-alive>
    </div>
    <div class="box3">
      <bottom></bottom>
    </div>
  </div>
</template>

<script>
import Top from "views/main/Top.vue";
import Left from "views/main/Left.vue";
import Bottom from "views/main/Bottom.vue";

export default {
  name: "Music",
  components: {
    Top,
    Left,
    Bottom,
  },
};
</script>


<style>
body {
  background-image: url(~assets/bg/music.jpg);
}
::-webkit-scrollbar {
  width: 8px;
  border-radius: 8px;
}
::-webkit-scrollbar-thumb {
  border-radius: 12px;
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  background: #535353;
}

::-webkit-scrollbar-track {
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  border-radius: 12px;
  background: #ededed;
}
h2 {
  margin: 0;
  line-height: 40px;
  color: #f5f5f5;
  background-color: rgb(144, 157, 158);
  text-align: center;
}
div,
ul,
li,
span {
  margin: 0;
  padding: 0;
  outline: none;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}
.main {
  margin: auto;
  min-width: 1100px;
  min-height: 750px;
  border-radius: 20px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
}
.content {
  width: 880px;
  height: 639px;
  background: #85b9e6;
  opacity: 0.8;
  border-radius: 20px;
  position: relative;
}
.box2 {
  width: 1100px;
  height: 640px;
  background: #66ccff55;
  position: relative;
  display: flex;
}
.box3 {
  width: 1100px;
  height: 60px;
  position: relative;
  overflow: unset;
}
</style>
