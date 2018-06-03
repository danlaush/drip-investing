<template>
  <section class="center">
    <app-logo/>
    <h1 class="title">
      Drip Investing
    </h1>
    <h2 class="subtitle">
      Nuxt.js project
    </h2>
    <div class="links">
      <nuxt-link
        to="/view"
        class="button--green">View data</nuxt-link>
      <nuxt-link
        to="/import"
        class="button--grey">Import data</nuxt-link>
    </div>
  </section>
</template>

<script>
import AppLogo from '~/components/AppLogo.vue'

export default {
  components: {
    AppLogo
  }
}
</script>

<style lang="scss" scoped>
.center {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  flex-direction: column;
}
</style>
