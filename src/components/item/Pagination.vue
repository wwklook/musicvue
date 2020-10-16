<template>
  <ul v-if="isPages" class="pagination">
    <li
      v-for="(item,index) in page_list"
      :key="index"
      :class="{current: pn==item,omit: item=='...'}"
      @click="clickPage(item)"
    >{{ item }}</li>
  </ul>
</template>

<script>
export default {
  props: {
    total: {
      default: 0,
    },
    rn: {
      type: Number,
      default: 30,
    },
    pn: {
      type: Number,
      default: 1,
    },
    eventName: {
      type: String,
      default: "",
    },
  },
  computed: {
    pages() {
      return Math.ceil(this.total / this.rn);
    },
    isPages() {
      if (this.pages > 1) {
        return true;
      } else {
        return false;
      }
    },
    page_list() {
      if (this.pages > 7) {
        if (this.pn < 5) {
          return [1, 2, 3, 4, 5, 6, "...", this.pages];
        } else if (this.pn > this.pages - 4) {
          return [
            1,
            "...",
            this.pages - 5,
            this.pages - 4,
            this.pages - 3,
            this.pages - 2,
            this.pages - 1,
            this.pages,
          ];
        } else {
          return [
            1,
            "...",
            this.pn - 2,
            this.pn - 1,
            this.pn,
            this.pn + 1,
            this.pn + 2,
            "...",
            this.pages,
          ];
        }
      } else {
        return new Array(this.pages).fill(1).map((el, i) => 1 + i);
      }
    },
  },
  methods: {
    clickPage(item) {
      if (item == "..." || item == this.pn) {
        return;
      } else {
        console.log(this.eventName);
        this.$bus.$emit(this.eventName, item);
      }
    },
  },
};
</script>

<style scoped>
ul {
  height: 30px;
  margin: 5px;
  display: flex;
  justify-content: center;
}
li {
  line-height: 28px;
  width: 28px;
  color: #0066ff;
  text-align: center;
  margin: 0 8px;
  cursor: pointer;
  border: 1px solid #66bbff;
  border-radius: 5px;
  text-overflow: clip;
}
li:hover {
  border-color: #66ffff;
  background-color: #6699ff;
}
.current {
  background-color: #66bbff;
  cursor: default;
}
.current:hover {
  border-color: #66bbff;
  background-color: #66bbff;
}
.omit {
  background-color: #99ccff;
  cursor: default;
}
.omit:hover {
  border-color: #99ccff;
  background-color: #99ccff;
}
.pagination {
  width: 100%;
  position: absolute;
  bottom: 0;
}
</style>
