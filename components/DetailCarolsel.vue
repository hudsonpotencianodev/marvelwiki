<template>
  <b-carousel
    ref="myCarousel"
    class="mycarousel"
    v-model="slide"
    :interval="5000"
    controls
    draggable="true"
    indicators
    value="-1"
    @sliding-start="onSlideStart"
    @sliding-end="onSlideEnd"
  >
    <b-carousel-slide v-for="slideData in slidesData" :key="slideData.id">
      <template #img>
        <b-img-lazy :src="slideData.detailData?.image"></b-img-lazy>
      </template>
      <template #default>
        <h3
          @click="goToMarvelSite(slideData.detailData)"
          class="font-weight-bold click-link"
        >{{slideData.detailData?.name}}</h3>
      </template>
    </b-carousel-slide>
  </b-carousel>
</template>
<script>
import resourceuriservice from "../services/resourceURI.service";

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
  margin-bottom: 30px;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px, rgb(51, 51, 51) 0px 0px 0px 3px;
  img {
    min-height: 200px;
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