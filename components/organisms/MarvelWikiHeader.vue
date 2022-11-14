<template>
  <header>
    <b-navbar>
      <b-navbar-nav>
        <b-nav-item class="card-nav-item">
          <i class="fa-regular fa-id-card"></i>
          <NuxtLink to="/">Characters</NuxtLink>
        </b-nav-item>
        <b-nav-item class="card-nav-item">
          <NuxtLink to="/game-news">Game News</NuxtLink>
        </b-nav-item>
        <b-nav-item class="card-nav-item">
          <NuxtLink to="/comics">Comics</NuxtLink>
        </b-nav-item>
        <b-nav-item class="card-nav-item">
          <NuxtLink to="/series">Series</NuxtLink>
        </b-nav-item>
        <b-nav-item
          v-if="theme == 'light'"
          @click="
            theme = 'dark';
            updateTheme();
          "
        >
          <b-icon-lightbulb-off color="black"></b-icon-lightbulb-off>
        </b-nav-item>
        <b-nav-item
          v-if="theme == 'dark'"
          @click="
            theme = 'light';
            updateTheme();
          "
        >
          <b-icon-lightbulb color="white"></b-icon-lightbulb>
        </b-nav-item>
      </b-navbar-nav>
    </b-navbar>
  </header>
</template>
<script>
export default {
  name: "MarvelWikiHeader",
  data() {
    return {
      theme: "light",
    };
  },
  methods: {
    updateTheme() {
      if (this.theme == "dark") {
        const root = document.querySelector(":root");
        root.style.setProperty("--backgroud-theme", "#000");
        root.style.setProperty("--color-theme", "white");
        root.style.setProperty("--card-body-theme", "#505050");
        localStorage.setItem("theme", this.theme);
      } else {
        const root = document.querySelector(":root");
        root.style.setProperty("--backgroud-theme", "#f5f5f5");
        root.style.setProperty("--color-theme", "black");
        root.style.setProperty("--card-body-theme", "white");
        localStorage.setItem("theme", this.theme);
      }
    },
  },
  created() {
    this.theme = localStorage.getItem("theme") ?? "light";
    this.updateTheme();
  },
};
</script>

<style lang="scss">
.nuxt-link-active {
  font-weight: 700;
}

.card-nav-item {
  height: 200px;
  width: 320px;
  display: flex;
  justify-items: center;
}
</style>
