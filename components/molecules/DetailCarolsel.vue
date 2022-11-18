<template>
  <b-carousel
    ref="myCarousel"
    class="mycarousel mb-2"
    v-model="slide"
    :interval="5000"
    controls
    draggable="true"
    fade="true"
    indicators
    @sliding-start="onSlideStart"
    @sliding-end="onSlideEnd"
  >
    <b-carousel-slide v-for="slideData in slidesData" :key="slideData.id">
      <template #img>
        <b-img-lazy :src="slideData.detailData?.image"></b-img-lazy>
      </template>
      <template #default>
        <h5 @click="goToMarvelSite(slideData.detailData)" class="click-link">
          {{ slideData.detailData?.name }}
        </h5>
      </template>
    </b-carousel-slide>
  </b-carousel>
</template>
<script>
import resourceuriservice from "../../services/resourceURI.service";

export default {
  name: "DetailCarolsel",
  props: ["slidesData"],
  data() {
    return {
      slide: 0,
      sliding: null,
    };
  },
  methods: {
    onSlideStart(slide) {
      this.sliding = true;
    },
    onSlideEnd(slide) {
      this.sliding = false;
    },
    goToMarvelSite(detail) {
      console.log(detail);
      if (detail.urls[0]) window.open(detail.urls[0].url, "_blank").focus();
    },
  },
  mounted() {
    setTimeout(() => {
      this.$refs.myCarousel.next();
    }, 1000);
  },
  created() {
    this.slidesData.forEach((data) => {
      setTimeout(() => {
        resourceuriservice.getResourceURI(data.resourceURI).then((result) => {
          data.detailData = result;
          this.sliding = true;
        });
      }, 300);
    });
  },
};
</script>

<style lang="scss">
.mycarousel {
  min-height: 100px;
  img {
    height: auto;
    width: 100%;
    overflow: hidden;
    object-fit: contain;
  }
}
.click-link {
  cursor: pointer;
  color: rgb(241, 218, 9);
  background-color: rgba(0, 0, 0, 0.541);
}
</style>
