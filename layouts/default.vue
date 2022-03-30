<template>
  <main>
    <header>
      <b-navbar>
        <b-navbar-nav>
          <b-nav-item>
            <NuxtLink to="/">Home</NuxtLink>
          </b-nav-item>
          <b-nav-item>
            <NuxtLink to="/characters">Characters</NuxtLink>
          </b-nav-item>
          <b-nav-item>
            <NuxtLink to="/comics">Comics</NuxtLink>
          </b-nav-item>
          <b-nav-item>
            <NuxtLink to="/series">Series</NuxtLink>
          </b-nav-item>
        </b-navbar-nav>
      </b-navbar>
    </header>
    <Nuxt />
  </main>
</template>

<style>
@import url("https://fonts.googleapis.com/css2?family=Marvel&display=swap");

body {
  padding: 0 20px 20px 20px;
  font-family: "Marvel", sans-serif;
  background: linear-gradient(to bottom, #ed213a, #93291e);
  height: 100vh;
}
nav {
  justify-content: center !important;
  font-weight: 600;
  font-size: 1.3rem;
}
nav a {
  color: black;
}
nav a:hover {
  color: blue;
}
.nuxt-link-exact-active {
  color: white;
}
</style>
