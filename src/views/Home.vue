<template>
  <div>
    <header1 />
    <div class="main">
      <div class="left">
        <proflie></proflie>
        <calendar></calendar>
        <music-box></music-box>
      </div>
      <router-view></router-view>
      <div class="right">
        <right></right>
      </div>
    </div>
  </div>
</template>

<script>
import Header1 from "views/home/Header";
import MusicBox from "views/home/MusicBox";
import Proflie from "views/home/Proflie";
import Calendar from "views/home/Calendar";
import Right from "views/home/Right";

export default {
  components: {
    MusicBox,
    Proflie,
    Calendar,
    Right,
    Header1
  },
};
</script>
<style>
body {
  background: url(~assets/bg/home.jpg) no-repeat center;
  background-attachment: fixed;
  background-size: cover;
}
.main {
  width: auto;
  height: auto;
  display: flex;
  justify-content: center;
}
.left {
  min-width: 250px;
  margin: 20px;
  flex-grow: 0.1;
}
.right {
  min-width: 250px;
  margin: 20px;
  flex-grow: 0.1;
}
</style>
