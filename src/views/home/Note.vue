<template>
<div class="content">
    <note-book></note-book>
  </div>
</template>

<script>
import NoteBook from "components/home/NoteBook";

export default {
  components: {
    NoteBook
  },
};
</script>

<style scoped>
.content {
  width: 700px;
  margin: 20px;
  flex-grow: 0.1;
}
</style>