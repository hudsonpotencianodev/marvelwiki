<template>
  <b-card
    v-bind:class="{ comic: type == 'comic' }"
    :img-src="image"
    class="card mb-2"
  >
    <b-card-text> {{ title }} </b-card-text>
  </b-card>
</template>

<script>
export default {
  props: ["title", "image", "type"],
};
</script>

<style scoped>
.card {
  flex: 0 1 22%;
  border: none;
  box-shadow: 0 26px 24px -16px rgb(0 0 0 / 40%);
  margin: 30px 15px;
  transition: transform 0.5s;
}

@media screen {
}

.card img {
  object-position: center;
  object-fit: fill;
  height: 200px;
}
.comic img {
  height: 320px !important;
}

.card:hover {
  transform: scale(1.1);
  box-shadow: 0 0px 20px 0px rgb(0 0 0 / 60%);
  cursor: pointer;
}

.card-text {
  font-weight: 600;
  font-size: 0.9rem;
}

.card-body {
  padding: 0.5rem;
}
</style>