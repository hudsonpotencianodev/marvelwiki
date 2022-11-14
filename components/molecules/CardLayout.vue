<template>
  <div>
    <div class="cards">
      <slot></slot>
    </div>
    <div class="page-buttons">
      <!-- <b-button class="mr-1" variant="primary" v-if="page > 0" @click="backPage"
        >Back</b-button
      > -->
      <b-button class="vermais-button" v-if="showNextButton" @click="nextPage">
        <font-awesome-icon icon="fa-solid fa-chevron-down" />
        Ver mais</b-button
      >
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

<style lang="scss">
.cards {
  margin: 30px 0px;
  padding: 0 10px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
.page-buttons {
  display: flex;
  justify-content: center;
  .btn {
    background-color: var(--background-red-theme);
  }
}
</style>
