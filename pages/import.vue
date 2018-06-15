<template>
  <section>
    <app-menu />
    <h1 class="title">
      Import data
    </h1>
    <div>
      <input 
        type="file"
        id="transactions"
        @change="handleFileChange" />

    </div>
    <p>
      Upload a CSV file exported from CommBank.
    </p>
    <h2>Format</h2>
    <pre>
      # DATE     AMOUNT   NOTES               BALANCE
      02/06/2018,"-12.00","TRANSACTION NOTES","+100"
    </pre>

  </section>
</template>

<script>
import AppMenu from '~/components/AppMenu'
import path from 'path'
// const fs = require('fs')
import parseCsv from 'csv-parse'
import transform from 'stream-transform'
import moment from 'moment'
import md5 from 'md5'

// let data = [];
// import transactions from '../data/data.json'
// const output = fs.createWriteStream('../data/data.json')

export default {
  data: function () {
    return {
      // input,
      // output,
      // data
    }
  },
  methods: {
    handleFileChange: function (e) {
      // pipe file into csvparser
      // pipe raw objects into object
      // index the data

      const file = e.target.files[0]

      const reader = new FileReader();
      reader.onload = e => this.csvToObject(e.target.result);

      reader.readAsText(file);
    },
    csvToObject: (csv) => {
      console.log(csv)
    },
    importData: () => {
      console.log('import the data')
    }
  },
  components: {
    AppMenu
  }
}
</script>

<style>
input {
  margin: 40px 0;
}
</style>
