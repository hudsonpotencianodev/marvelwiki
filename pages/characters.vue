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
        v-for="character in characters"
        :key="character.id"
        class="card"
        :title="character.name"
        :image="character.thumbnail.path + '.' + character.thumbnail.extension"
      />
    </CardLayout>
  </main>
</template>

<script>
import characterservice from "../services/character.service";

export default {
  name: "characters",
  data() {
    return {
      characters: [],
      search: "",
      sort: "name",
      page: 0,
      limit: 12,
      sortList: [
        { value: "name", description: "A-Z" },
        { value: "-name", description: "Z-A" },
      ],
      showNextButton: true,
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
    getCharacters() {
      characterservice
        .getCharacters(
          this.search,
          this.sort,
          this.limit,
          this.page * this.limit
        )
        .then((httpResult) => {
          const data = httpResult.data.data;
          this.characters = data.results;
          this.showNextButton = data.count >= this.limit;
        });
    },
    searchChacaracters(paramSearch, paramSort) {
      if (paramSearch != this.search) {
        this.page = 0;
      }

      this.search = paramSearch;
      this.sort = paramSort;

      this.getCharacters();
    },
    nextPage() {
      this.page++;
      this.getCharacters();
    },
    backPage() {
      this.page--;
      this.getCharacters();
    },
  },
  mounted() {
    this.getCharacters();
  },
};
</script>