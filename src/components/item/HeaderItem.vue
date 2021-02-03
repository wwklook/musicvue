<template>
  <div class="header">
      <ul>
        <li class="num">序号</li>
        <li class="name">歌曲</li>
        <li class="songer">歌手</li>
        <li class="album">专辑</li>
        <li class="time">时间</li>
      </ul>
    </div>
</template>

<style scoped>
.header {
  width: 860px;
  height: 60px;
  background: beige;
  display: flex;
  align-items: center;
  padding-left: 20px;
  font-size: 18px;
}
.num {
  width: 130px;
  float: left;
}

.name {
  width: 250px;
  float: left;
}

.songer {
  width: 150px;
  float: left;
}

.album {
  width: 250px;
  float: left;
}

.time {
  width: 60px;
  float: left;
}
</style>