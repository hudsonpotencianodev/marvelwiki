<template>
  <main class="container">
    <DetailModal id="character-detail-modal" :title="detailComic.title">
      <template #modal-content>
        <b-row>
          <b-col sm="6" lg="4">
            <img
              class="mb-4"
              width="100%"
              :src="detailComic.thumbnail?.path + '.' + detailComic.thumbnail?.extension"
              alt
            />
          </b-col>
          <b-col lg="8" sm="12" md="12">
            <h5 v-if="detailComic.description">{{ detailComic.description }}</h5>
          </b-col>
        </b-row>

        <b-row class="mt-4">
          <b-col sm="12" lg="6" md="6">
            <h2 class="font-weight-bold">Characters</h2>
            <div v-if="detailComic.characters?.returned > 0">
              <DetailCarolsel
                :slidesData="detailComic.characters?.items"
              ></DetailCarolsel>
            </div>
            <div v-else style="height: 200px; width: 100%">
              <h3>Empty</h3>
            </div>
          </b-col>
          <b-col sm="12" lg="6" md="6">
            <h2 class="font-weight-bold">Creators</h2>
            <div v-if="detailComic.creators?.returned > 0">
              <DetailCarolsel :slidesData="detailComic.creators?.items"></DetailCarolsel>
            </div>
            <div v-else style="height: 200px; width: 100%">
              <h3>Empty</h3>
            </div>
          </b-col>
        </b-row>
      </template>
    </DetailModal>
    <SearchBar
      :search="search"
      :sort="sort"
      :sort-list="sortList"
      @search-click="searchChacaracters"
    />
    <CardLayout
      :show-next-button="showNextButton"
      :page="page"
      @next-page="nextPage"
      @back-page="backPage"
    >
      <Card
        v-for="comic in comics"
        :key="comic.id"
        class="card"
        :title="comic.title"
        :image="comic.thumbnail.path + '.' + comic.thumbnail.extension"
        :type="'comic'"
        :click="openDetail"
        :id="comic.id"
      />
    </CardLayout>
  </main>
</template>

<script>
import comicservice from "../services/comic.service";

export default {
  name: "comics",
  data() {
    return {
      comics: [],
      detailComic: {},
      search: "",
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
    getComics() {
      this.showNextButton = false;

      return comicservice
        .getComics(this.search, this.sort, this.limit, this.page * this.limit)
        .then((httpResult) => {
          const data = httpResult.data.data;
          this.comics = this.comics.concat(data.results);
          this.showNextButton = data.count >= this.limit;
        });
    },
    searchChacaracters(paramSearch, paramSort) {
      if (paramSearch != this.search) {
        this.page = 0;
        this.comics = [];
      }

      this.search = paramSearch;
      this.sort = paramSort;

      this.getComics();
    },
    async nextPage() {
      this.page++;
      await this.getComics();
      setTimeout(() => {
        window.scrollTo({ top: window.scrollY + 500, behavior: "smooth" });
      }, 500);
    },
    backPage() {
      this.page--;
      this.getComics();
    },
    async openDetail(id) {
      this.detailComic = {};
      this.detailComic = await comicservice.getComic(id);
    },
  },
  beforeMount() {
    this.getComics();
  },
};
</script>
