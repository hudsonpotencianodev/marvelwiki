<template>
  <section>
    <header>
      <b-navbar>
        <b-navbar-nav>
          <b-nav-item>
            <NuxtLink prefetch :to="{ name: 'index' }" class="card-nav-item">
              <font-awesome-icon class="icon" icon="fa-solid fa-id-badge" />
            </NuxtLink>
          </b-nav-item>
          <b-nav-item>
            <NuxtLink prefetch to="/comics" class="card-nav-item">
              <font-awesome-icon class="icon" icon="fa-solid fa-book-open" />
            </NuxtLink>
          </b-nav-item>
          <b-nav-item>
            <NuxtLink prefetch to="/series" class="card-nav-item">
              <font-awesome-icon class="icon" icon="fa-solid fa-video" />
            </NuxtLink>
          </b-nav-item>
          <!-- <b-nav-item>
            <NuxtLink to="/game-news" class="card-nav-item">
              <font-awesome-icon class="icon" icon="fa-solid fa-newspaper" />
            </NuxtLink>
          </b-nav-item> -->
          <!-- <b-nav-item class="global-flex-vertical" v-b-modal.config-modal>
    
            <div class="config-button" v-b-modal.config-modal>
              <font-awesome-icon
                class="config-icon"
                color="white"
                icon="fa-solid fa-gear"
              />
            </div>
          </b-nav-item> -->
          <b-nav-item
            class="global-flex-vertical theme-button"
            v-if="theme == 'light'"
            @click="
              theme = 'dark';
              updateTheme();
            "
          >
            <font-awesome-icon class="theme-icon" color="black" icon="fa-solid fa-moon" />
          </b-nav-item>
          <b-nav-item
            class="global-flex-vertical theme-button"
            v-if="theme == 'dark'"
            @click="
              theme = 'light';
              updateTheme();
            "
          >
            <font-awesome-icon class="theme-icon" color="white" icon="fa-solid fa-sun" />
          </b-nav-item>
        </b-navbar-nav>
      </b-navbar>
      <h1 class="page-title">{{ pageTitle }}</h1>
    </header>
  </section>
</template>
<script>
const pages = {
  index: { title: "Characters", name: "index" },
  gamenews: { title: "Latest Games News", name: "game-news" },
  comics: { title: "Comics", name: "comics" },
  series: { title: "Series", name: "series" },
};

export default {
  name: "MarvelWikiHeader",
  data() {
    return {
      theme: "light",
      pageTitle: "Characters",
    };
  },
  watch: {
    $route(to, from) {
      switch (to.name) {
        case pages.index.name:
          this.pageTitle = pages.index.title;
          break;
        case pages.gamenews.name:
          this.pageTitle = pages.gamenews.title;
          break;
        case pages.comics.name:
          this.pageTitle = pages.comics.title;
          break;
        case pages.series.name:
          this.pageTitle = pages.series.title;
          break;
      }
    },
  },
  methods: {
    updateTheme() {
      const root = document.querySelector(":root");
      if (this.theme == "dark") {
        root.style.setProperty("--backgroud-theme", "#2a2a2a");
        root.style.setProperty("--color-theme", "#fff");
        root.style.setProperty("--color-2-theme", "#fff");
        root.style.setProperty("--card-body-theme", "#505050");
        root.style.setProperty("--card-background-theme", "#000");

        localStorage.setItem("theme", this.theme);
      } else {
        root.style.setProperty("--backgroud-theme", "#f5f5f5");
        root.style.setProperty("--color-theme", "#000");
        root.style.setProperty("--color-2-theme", "#fff");
        root.style.setProperty("--card-body-theme", "#fff");
        root.style.setProperty("--card-background-theme", "#F9F9F9");
        localStorage.setItem("theme", this.theme);
      }
    },
  },
  mounted() {
    this.theme = localStorage.getItem("theme") ?? "dark";
    this.pageTitle = pages.index.title;
    this.updateTheme();
  },
};
</script>

<style lang="scss">
.page-title {
  text-align: center;
  font-size: 2.5rem;
  margin: 20px 0 30px 0;
}

.card-nav-item {
  height: 50px;
  width: 50px;
  display: flex;
  justify-items: center;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  border-radius: 30px;
  background-color: var(--card-background-theme);
  box-shadow: rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px;
  .icon {
    color: var(--color-theme);
    font-size: 30px;
  }
}
.card-nav-item:hover {
  text-decoration: none;
}
.nuxt-link-exact-active {
  background-color: var(--background-red-theme);
  transition: all 0.4s ease-in;
  span {
    color: white;
  }
}
.config-button {
  .config-icon {
    box-shadow: rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px;
    background-color: var(--card-background-theme);
    height: 35px;
    width: 35px;
    padding: 15px;
    border-radius: 30px;
  }
}
@media (min-width: 992px) {
  .card-nav-item {
    height: 80px;
    width: 80px;
    .icon {
      font-size: 48px;
    }
  }
}
</style>
