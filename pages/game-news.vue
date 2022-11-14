<template>
  <main class="container">
    <SearchBar
      :search="search"
      :sort="sort"
      :sort-list="sortList"
      @search-click="searchGameNews"
    />
    <CardLayout
      :show-next-button="showNextButton"
      :page="page"
      @next-page="nextPage"
      @back-page="backPage"
    >
      <Card
        v-for="game in gameNews"
        :key="game.link.link"
        class="card"
        :title="game.headline"
        :image="
          'https://terrigen-cdn-dev.marvel.com/content/prod/1x/' + game.image.filename
        "
        :click="openDetail"
        :id="game.link.link"
      />
    </CardLayout>
  </main>
</template>

<script>
import { throwStatement } from "@babel/types";
import gameservice from "../services/games.service";

export default {
  name: "characters",
  data() {
    return {
      gameNews: [],
      search: "",
      sort: "name",
      page: 0,
      limit: 12,
      sortList: [
        { value: "name", description: "A-Z" },
        { value: "-name", description: "Z-A" },
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
    getGameNews() {
      this.showNextButton = false;

      return gameservice
        .getGameNews(this.search, this.sort, this.limit, this.page * this.limit)
        .then((result) => {
          this.showNextButton = result.length >= this.limit;
          this.gameNews = this.gameNews.concat(result);
        });
    },
    searchGameNews(paramSearch, paramSort) {
      if (paramSearch != this.search) {
        this.page = 0;
        this.gameNews = [];
      }

      this.search = paramSearch;
      this.sort = paramSort;
      this.getGameNews();
    },
    async nextPage() {
      this.page++;
      await this.getGameNews();
      setTimeout(() => {
        window.scrollBy({
          top: 500,
          behavior: "smooth",
        });
      }, 500);
    },
    backPage() {
      this.page--;
      this.gameNews = this.gameNews.splice(this.page * this.limit, this.limit);
    },
    async openDetail(id) {
      const item = this.gameNews.find((x) => x.link.link === id);
      if (item) {
        window.open("https://www.marvel.com" + item.link.link, "_blank").focus();
      }
    },
  },
  created() {
    this.getGameNews();
  },
};
</script>
