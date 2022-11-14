<template>
  <b-card
    v-b-modal.detail-modal
    @click="click(id)"
    class="card mb-2"
    v-bind:class="{ comic: type == 'comic', gamenews: type == 'game-news' }"
    :img-src="image"
    img-alt="Image"
    img-top
    :title="title"
  >
  </b-card>
</template>

<script>
export default {
  props: ["title", "image", "type", "click", "id", "openModal"],
  name: "NewsCard",
};
</script>

<style scoped lang="scss">
.card {
  flex: 0 1 22%;
  border: none;
  box-shadow: rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px;
  margin: 30px 15px;
  transition: transform 0.5s;
  position: relative;
  background-color: var(--card-body-theme);
}
.card-title {
  padding: 10px;
  font-size: 18px;
  margin: 0;
}
.card-text {
  font-size: 18px;
  padding-left: 10px;
  margin-bottom: 10px;
}

.card img {
  object-position: center;
  object-fit: cover;
  min-height: 180px;
  background-color: black;
}

.card:hover {
  transform: scale(1.1);
  cursor: pointer;
}

.card-body {
  padding: 0;
}

@media (min-width: 0px) {
  .card {
    flex: 0 1 99%;
  }
}
@media (min-width: 768px) {
  .card {
    flex: 0 1 41%;
  }
  .card-title {
    display: block;
  }
}
@media (min-width: 1200px) {
  .card {
    flex: 0 1 30%;
  }
}
</style>
