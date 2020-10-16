<template>
  <div class="comment_item">
    <img class="u_img" :src="info.u_pic || defaultImg" />
    <div class="comment_msg">
      <div class="comment_nickname" v-html="info.u_name"></div>
      <div class="comment_text" v-html="info.msg"></div>
      <div class="comment_time">{{info.time}}</div>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return {
      defaultImg:
        "https://h5static.kuwo.cn/upload/image/4f768883f75b17a426c95b93692d98bec7d3ee9240f77f5ea68fc63870fdb050.png",
    }
  },
  props: {
    info: {
      type: Object,
      default() {
        return {};
      },
    },
  },
};
</script>

<style scoped>
.comment_item {
  margin: 20px;
  display: flex;
}
.u_img {
  width: 42px;
  height: 42px;
  border-radius: 50%;
}
.comment_msg {
  width: 100%;
  padding-bottom: 10px;
  border-bottom: 1px solid #f2f2f2;
}
.comment_nickname {
  height: 30px;
  line-height: 30px;
  font-size: 16px;
}
.comment_text {
  font-size: 16px;
  line-height: 33px;
  white-space: pre-wrap;
  word-wrap: break-word;
  word-break: break-all;
}
.comment_time {
  height: 26px;
  line-height: 26px;
  font-size: 14px;
  margin-top: 5px;
}
</style>