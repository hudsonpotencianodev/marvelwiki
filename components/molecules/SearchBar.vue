<template>
  <div class="searchbar">
    <form @submit.prevent="searchClick">
      <b-form-input
        type="text"
        title="Search"
        placeholder="Search"
        v-model="search"
      ></b-form-input>
      <b-form-select title="Sort By" v-model="sort">
        <option v-for="sort in sortList" :key="sort.value" :value="sort.value">
          {{ sort.description }}
        </option>
      </b-form-select>
      <b-button @click="searchClick">Search</b-button>
    </form>
  </div>
</template>

<script>
export default {
  emits: ["search-click"],
  props: ["sortList"],
  data() {
    return {
      search: "",
      sort: "",
    };
  },
  methods: {
    searchClick() {
      this.$emit("search-click", this.search, this.sort);
    },
  },
  mounted() {
    this.sort = this.sortList ? this.sortList[0].value : "";
  },
};
</script>

<style scoped>
.searchbar {
  display: flex;
  justify-content: center;
  width: 100%;
}
.searchbar form {
  width: 50%;
  padding: 0px 18px;
  display: flex;
  flex-direction: row;
}

input,
button,
select {
  margin: 0px 5px;
}

input {
  margin: 0px 5px;
  flex: 0 1 70%;
}
select {
  flex: 0 1 20%;
}

button {
  flex: 0 1 10%;
}
</style>
