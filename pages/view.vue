<template>
  <section>
    <app-menu />
    <h1 class="title">
      View data
    </h1>
    <ul>
      <li v-for="(year, index) in data" :key="index">
        <h2>{{index}}</h2>
        <ul>
          <li v-for="(month, index) in year" :key="index">
            <h3>{{index}}</h3>
            <ul>
              <li v-for="(day, index) in month" :key="index">
                <h4>{{index}}</h4>
                <div v-for="(record, index) in day" :key="index">
                  <h5>{{index}}</h5>
                  <pre>{{record}}</pre>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </li>
    </ul>
  </section>
</template>

<script>
import AppMenu from '~/components/AppMenu'


export default {
  data: function() {
    return {
      data: this.$store.state.data
    }
  },
  components: {
    AppMenu
  }
}
</script>

<style>

.title {
  font-family: "Quicksand", "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif; /* 1 */
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
