<template>
  <div>
    <h3>基本信息</h3>
    <ul>
      <li>
        <div>
          <span>姓名:</span>
          <span>{{info.name}}</span>
        </div>
        <div>
          <span>英文名:</span>
          <span v-html="info.aartist"></span>
        </div>
      </li>
      <li>
        <div>
          <span>性别:</span>
          <span>{{info.gener}}</span>
        </div>
        <div>
          <span>国籍:</span>
          <span>{{info.country}}</span>
        </div>
      </li>
      <li>
        <div>
          <span>出生地:</span>
          <span>{{info.birthplace}}</span>
        </div>
        <div>
          <span>语言:</span>
          <span>{{info.language}}</span>
        </div>
      </li>
      <li>
        <div>
          <span>生日:</span>
          <span>{{info.birthday}}</span>
        </div>
        <div>
          <span>星座:</span>
          <span>{{info.constellation}}</span>
        </div>
      </li>
      <li>
        <div>
          <span>身高:</span>
          <span>{{info.tall}}</span>
        </div>
        <div>
          <span>体重:</span>
          <span>{{info.weight}}</span>
        </div>
      </li>
    </ul>
    <h3>个人简介</h3>
    <div class="info" v-html="info.info"></div>
  </div>
</template>

<script>
export default {
  name: "singer-view",
  data() {
    return {
      info: this.$route.params.info,
    };
  },
};
</script>

<style scoped>
h3 {
  margin: 10px 20px;
}
ul {
  margin: 5px 20px;
  padding: 5px;
  border: 1px solid #ffffff;
}
li {
  display: flex;
  font-size: 20px;
  line-height: 33px;
}
li > div {
  width: 50%;
}

.info {
  margin: 20px;
  white-space: normal;
  font-size: 16px;
  color: #1f102d;
}
</style>
