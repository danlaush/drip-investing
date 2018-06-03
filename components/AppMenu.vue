<template>
  <ul>
    <li><nuxt-link
      to="/">Drip Investing</nuxt-link></li>
    <li><nuxt-link
      to="/view">View</nuxt-link></li>
    <li><nuxt-link
      to="/import">Import</nuxt-link></li>
  </ul>
</template>

<script>
  export default {
    
  }
</script>

<style lang="scss" scoped>
ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
}
li {
  margin: 0;
  padding: 0;
  display: inline;

  & + & {
    margin-left: 1rem;
  }
}
</style>