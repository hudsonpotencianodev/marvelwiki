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
      <Card
        v-for="comic in stories"
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
      stories: [],
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
    getStories() {
      this.showNextButton = false;

      return seriesservice
        .getSeries(this.search, this.sort, this.limit, this.page * this.limit)
        .then((httpResult) => {
          const data = httpResult.data.data;
          this.stories = this.stories.concat(data.results);
          this.showNextButton = data.count >= this.limit;
        });
    },
    searchChacaracters(paramSearch, paramSort) {
      if (paramSearch != this.search) {
        this.page = 0;
      this.stories = [];
      }

      this.search = paramSearch;
      this.sort = paramSort;

      this.getStories();
    },
    async nextPage() {
      this.page++;
      await this.getStories();
      setTimeout(() => {
        window.scrollTo({ top: window.scrollY + 500, behavior: "smooth" });
      }, 500);
    },
    backPage() {
      this.page--;
      this.getStories();
    },
  },
  beforeMount() {
    this.getStories();
  },
};
</script>
