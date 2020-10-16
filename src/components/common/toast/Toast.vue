<template>
  <div class="toast" v-show="isShow">
    <span>{{message}}</span>
  </div>
</template>

<script>
export default {
  name: "Toast",
  data() {
    return {
      message: "",
      isShow: false,
    };
  },

  methods: {
    show(message, duration = 2000) {
      this.isShow = true;
      this.message = message;
      setTimeout(() => {
        (this.isShow = false), (this.message = "");
      }, duration);
    },
  },
};
</script>

<style scoped>
.toast {
  background-color: #20202050;
  color: #f5f5f5;

  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 18px;
  padding: 2px 8px;
  border-radius: 15px;
  letter-spacing: 1.5px;
  z-index: 999;
}
</style>
