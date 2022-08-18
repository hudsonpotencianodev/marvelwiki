<template>
  <main class="container">
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
      <LazyCard
        v-for="comic in comics"
        :key="comic.id"
        class="card"
        :title="comic.title"
        :image="comic.thumbnail.path + '.' + comic.thumbnail.extension"
        :type="'comic'"
      />
    </CardLayout>
  </main>
</template>

<script>
import seriesservice from "../services/series.service";

export default {
  name: "comics",
  data() {
    return {
      comics: [],
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
      seriesservice
        .getSeries(this.search, this.sort, this.limit, this.page * this.limit)
        .then((httpResult) => {
          const data = httpResult.data.data;
          this.comics = data.results;
          this.showNextButton = data.count >= this.limit;
        });
    },
    searchChacaracters(paramSearch, paramSort) {
      if (paramSearch != this.search) {
        this.page = 0;
      }

      this.search = paramSearch;
      this.sort = paramSort;

      this.getComics();
    },
    nextPage() {
      this.page++;
      this.getComics();
    },
    backPage() {
      this.page--;
      this.getComics();
    },
  },
  beforeMount() {
    this.getComics();
  },
};
</script>