<template>
  <main class="container">
    <DetailModal id="character-detail-modal" :title="serieDetail.title">
      <template #modal-content>
        <b-row>
          <b-col cols="4">
            <img
              class="mb-4"
              width="100%"
              :src="serieDetail.thumbnail?.path + '.'+ serieDetail.thumbnail?.extension"
              alt
            />
          </b-col>
          <b-col lg="8" sm="12" md="12">
            <h5 v-if="serieDetail.description">{{serieDetail.description}}</h5>
          </b-col>
        </b-row>

        <b-row class="mt-4">
          <b-col sm="12" lg="6" md="6">
            <h4 class="font-weight-bold">Characters</h4>
            <div v-if="serieDetail.characters?.returned > 0">
              <DetailCarolsel :slidesData="serieDetail.characters?.items"></DetailCarolsel>
            </div>
            <div v-else style="height:200px;width:100%">
              <h5>Empty</h5>
            </div>
          </b-col>
          <b-col sm="12" lg="6" md="6">
            <h4 class="font-weight-bold">Comics</h4>
            <div v-if="serieDetail.comics?.returned > 0">
              <DetailCarolsel :slidesData="serieDetail.comics?.items"></DetailCarolsel>
            </div>
            <div v-else style="height:200px;width:100%">
              <h5>Empty</h5>
            </div>
          </b-col>
          <b-col sm="12" lg="6" md="6">
            <h4 class="font-weight-bold">Creators</h4>
            <div v-if="serieDetail.creators?.returned > 0">
              <DetailCarolsel :slidesData="serieDetail.creators?.items"></DetailCarolsel>
            </div>
            <div v-else style="height:200px;width:100%">
              <h5>Empty</h5>
            </div>
          </b-col>
        </b-row>
      </template>
    </DetailModal>
    <SearchBar :search="search" :sort="sort" :sort-list="sortList" @search-click="searchSeries" />
    <CardLayout
      :show-next-button="showNextButton"
      :page="page"
      @next-page="nextPage"
      @back-page="backPage"
    >
      <LazyCard
        v-for="serie in series"
        :key="serie.id"
        class="card"
        :title="serie.title"
        :image="serie.thumbnail.path + '.' + serie.thumbnail.extension"
        :type="'comic'"
        :click="openDetail"
        :id="serie.id"
      />
    </CardLayout>
  </main>
</template>

<script>
import seriesservice from "../services/series.service";

export default {
  name: "series",
  data() {
    return {
      series: [],
      search: "",
      serieDetail: {},
      sort: "title",
      page: 0,
      limit: 12,
      sortList: [
        { value: "title", description: "A-Z" },
        { value: "-title", description: "Z-A" },
      ],
      showNextButton: false,
      carouselSettings: {
        arrows: true,
        rows: 1,
        dots: true,
        focusOnSelect: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 3,
        touchThreshold: 5,
      },
    };
  },
  methods: {
    getSeries() {
      seriesservice
        .getSeries(this.search, this.sort, this.limit, this.page * this.limit)
        .then((httpResult) => {
          const data = httpResult.data.data;
          this.series = data.results;
          this.showNextButton = data.count >= this.limit;
        });
    },
    searchSeries(paramSearch, paramSort) {
      if (paramSearch != this.search) {
        this.page = 0;
      }

      this.search = paramSearch;
      this.sort = paramSort;

      this.getSeries();
    },
    nextPage() {
      this.page++;
      this.getSeries();
    },
    backPage() {
      this.page--;
      this.getSeries();
    },
    async openDetail(id) {
      this.serieDetail = {};
      this.serieDetail = await seriesservice.getSerie(id);
    },
  },
  beforeMount() {
    this.getSeries();
  },
};
</script>