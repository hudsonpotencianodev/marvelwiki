
<template>
  <header>
    <b-navbar>
      <b-navbar-nav>
        <b-nav-item>
          <NuxtLink to="/">Characters</NuxtLink>
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
</template>
<script>
export default {
  name: "MarvelWikiHeader",
};
</script>