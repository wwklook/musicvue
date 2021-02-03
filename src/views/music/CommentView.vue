<template>
  <div class="content">
    <div class="comment">
      <h3>热门评论</h3>
      <comment-item v-for="(item,index) in rows" :key="index" :info="item" />
    </div>
    <div class="pagination">
      <pagination :total="total" :pn="pn" :rn="rn" :eventName="eventName" />
    </div>
  </div>
</template>

<script>
import CommentItem from "components/item/CommentItem.vue";
import Pagination from "components/item/Pagination.vue";
import { getComment } from "@/network/music";
export default {
  name: "comment-view",
  components: {
    CommentItem,
    Pagination,
  },
  data() {
    return {
      total: 0,
      pn: 0,
      rn: 30,
      rows: [],
      rid: 0,
      eventName: "CommentsPage",
    };
  },
  watch: {
    "$store.state.playIndex": "getComments",
  },
  created() {
    this.rid = this.$store.state.playList[this.$store.state.playIndex].rid;
    this.changeComment(1);
    this.$bus.$on(this.eventName, (pn) => {
      this.changeComment(pn);
    });
  },
  methods: {
    changeComment(pn) {
      getComment(this.rid, pn).then((res) => {
        this.rows = res.data.rows;
        this.total = res.data.total;
        this.pn = pn;
      });
    },
    getComments() {
      this.rid = this.$store.state.playList[this.$store.state.playIndex].rid;
      this.changeComment(1);
    },
  },
};
</script>

<style scoped>
.comment {
  height: 603px;
  width: 880px;
  background-color: #8a8a8a;
  opacity: 0.8;
  border-radius: 20px;
  overflow: auto;
}
.pagination {
  width: 100%;
  position: absolute;
  bottom: 0;
}
</style>
