<template>
  <main class="container">
    <DetailModal id="character-detail-modal" :title="detailCharacter.name">
      <template #modal-content>
        <b-row>
          <b-col cols="4">
            <img
              class="mb-4"
              width="100%"
              :src="
                detailCharacter.thumbnail?.path +
                '.' +
                detailCharacter.thumbnail?.extension
              "
              alt
            />
          </b-col>
          <b-col lg="8" sm="12" md="12">
            <a
              :href="detailCharacter.urls ? detailCharacter.urls[0].url : ''"
              target="_blank"
            >
              <font-awesome-icon icon="fa-solid fa-arrow-up-right-from-square" />
            </a>
            <h5 v-if="detailCharacter.description">{{ detailCharacter.description }}</h5>
            <h5 v-else>Empty</h5>
          </b-col>
        </b-row>

        <b-row class="mt-4">
          <b-col sm="12" lg="6" md="6" v-if="detailCharacter.comics?.returned > 0">
            <h2 class="font-weight-bold">Comics</h2>
            <div>
              <DetailCarolsel
                :slidesData="detailCharacter.comics?.items"
              ></DetailCarolsel>
            </div>
          </b-col>
          <b-col sm="12" lg="6" md="6" v-if="detailCharacter.series?.returned > 0">
            <h2 class="font-weight-bold">Series</h2>
            <div>
              <DetailCarolsel
                :slidesData="detailCharacter.series?.items"
              ></DetailCarolsel>
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
        v-for="character in characters"
        :key="character.id"
        class="card"
        :title="character.name"
        :image="character.thumbnail.path + '.' + character.thumbnail.extension"
        :click="openDetail"
        :id="character.id"
        :type="'characters'"
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
      detailCharacter: {},
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
    getCharacters() {
      this.showNextButton = false;

      return characterservice
        .getCharacters(this.search, this.sort, this.limit, this.page * this.limit)
        .then((httpResult) => {
          const data = httpResult.data.data;
          this.characters = this.characters.concat(data.results);
          this.showNextButton = data.count >= this.limit;
        });
    },
    searchChacaracters(paramSearch, paramSort) {
      if (paramSearch != this.search) {
        this.page = 0;
      }

      this.search = paramSearch;
      this.sort = paramSort;
      this.characters = [];
      this.getCharacters();
    },
    async nextPage() {
      this.page++;
      await this.getCharacters();
      setTimeout(() => {
        window.scrollTo({ top: window.scrollY + 500, behavior: "smooth" });
      }, 500);
    },
    backPage() {
      this.page--;
      this.getCharacters();
    },
    async openDetail(id) {
      this.detailCharacter = {};
      this.detailCharacter = await characterservice.getCharacter(id);
    },
  },
  created() {
    this.getCharacters();
  },
};
</script>
