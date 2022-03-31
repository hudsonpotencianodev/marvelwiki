<template>
  <div>
    <div class="cards">
      <slot></slot>
    </div>
    <div class="page-buttons">
      <button v-if="page > 0" @click="backPage">Back</button>
      <button v-if="showNextButton" @click="nextPage">Next</button>
    </div>
  </div>
</template>

<script>
export default {
  props: ["showNextButton", "page"],
  emits: ["nextPage", "backPage"],
  methods: {
    nextPage() {
      this.$emit("next-page");
    },
    backPage() {
      this.$emit("back-page");
    },
  },
};
</script>

<style scoped>
.cards {
  margin: 20px 0px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
.page-buttons {
  display: flex;
  justify-content: center;
}
</style>