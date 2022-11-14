<template>
  <b-card
    v-b-modal.detail-modal
    @click="click(id)"
    v-bind:class="{
      comic: type == 'comic',
      gamenews: type == 'game-news',
      characters: type == 'characters',
      series: type == 'series',
    }"
    class="card mb-2"
  >
    <b-card-img :src="image" alt="Image"></b-card-img>
    <div class="card-title">
      {{ title }}
    </div>
  </b-card>
</template>

<script>
export default {
  props: ["title", "image", "type", "click", "id", "openModal"],
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
  position: absolute;
  font-weight: 600;
  font-size: 1.3rem;
  padding-left: 5px;
  top: 0;
  width: 100%;
  height: auto;
  color: var(--color-theme);
  background-color: rgba(0, 0, 0, 0.349);
}

.card img {
  object-position: center;
  object-fit: cover;
  width: 100%;
  height: 100%;
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
  .comic img {
    height: 240px;
  }
  .card-title {
    display: block;
  }
}
@media (min-width: 992px) {
  .card {
    flex: 0 1 21%;
  }
}
@media (min-width: 1200px) {
  .card {
    flex: 0 1 21%;
  }
  .card-title {
    display: none;
    height: 100%;
    background-color: transparent;
  }
  .card:hover {
    .card-title {
      transition: all 0.5s ease-in;
      background-color: rgba(0, 0, 0, 0.349);
      display: block;
    }
  }
}
.characters img {
  min-height: 247px;
}
.comic img {
  min-height: 345px;
  height: auto;
}
.series img {
  min-height: 247px;
  object-fit: fill;
}
</style>
