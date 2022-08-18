<template>
  <main>
    <MarvelWikiHeader></MarvelWikiHeader>
    <Nuxt />
  </main>
</template>

<style>
@import url("https://fonts.googleapis.com/css2?family=Marvel&display=swap");

body {
  padding: 0 20px 20px 20px;
  font-family: "Marvel", sans-serif;
  background: linear-gradient(to bottom, #ed213a, #93291e);
  height: 100%;
  background-repeat: no-repeat;
  background-attachment: fixed;
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
