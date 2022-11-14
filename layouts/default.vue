<template>
  <main>
    <MarvelWikiHeader></MarvelWikiHeader>
    <Nuxt />
  </main>
</template>
<script>
export default {
  name: "default",
};
</script>
<style>
html,
body {
  background-color: var(--backgroud-theme);
  color: var(--color-theme);
}
body {
  padding: 0 20px 20px 20px;
  height: 100%;
}
nav {
  justify-content: center !important;
  font-size: 1.3rem;
}
</style>
