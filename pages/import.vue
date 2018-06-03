<template>
  <section>
    <app-menu />
    <h1 class="title">
      Import data
    </h1>
    <button @click="importData()">Import data</button>

  </section>
</template>

<script>
import AppMenu from '~/components/AppMenu'
import path from 'path'
const fs = require('fs')
import parseCsv from 'csv-parse'
import transform from 'stream-transform'
import moment from 'moment'
import md5 from 'md5'

let data = [];
const input = fs.createReadStream('../data/transactions_short.csv')
const output = fs.createWriteStream('../data/data.json')

export default {
  data: function () {
    return {
      input,
      output,
      data
    }
  },
  methods: {
    importData: () => {
      this.input.pipe(parseCsv)
        .pipe(parseData)
        .pipe(transformToJson)
        .pipe(output)
    },
    parseCsv: parseCsv({delimiter: ','}),
    parseData: transform((record, callback) => {
      const id = md5(record).slice(0,6)
      const date = moment(record[0], "DD/MM/YYYY");
      const transaction = {
        id,
        date,
        amount: record[1],
        note: record[2],
        balance: record[3],
        raw: record
      }
      console.log(typeof record[0], record[0],date);
      setTimeout(function(){
        callback(null, transaction);
      }, 500);
    },{parallel: 10}),
    indexRecords: transform((record, callback) => {
      this.data[record.date.getYear()][record.date.getMonth()][record.date.getDay()][record.id] = record
      this.$store.commit('addToRecord', record)
      callback(null, record)
    },{parallel: 10}),
    transformToJson: transform((record, callback) => {
      callback(null, ',\n' + JSON.stringify(record))
    },{parallel: 10})
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
