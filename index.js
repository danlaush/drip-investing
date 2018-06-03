console.log('hello world')

const fs = require('fs')
const parseCsv = require('csv-parse')
const transform = require('stream-transform');
const moment = require('moment')
const md5 = require('md5')

let data = [];
const input = fs.createReadStream(__dirname+'/data/transactions_short.csv')
const output = fs.createWriteStream(__dirname+'/data/data.json')

const parser = parseCsv({delimiter: ','});

// Put each record in the big data object
const parseData = transform(function(record, callback){
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

}, {parallel: 10});

const indexRecords = transform(function(record, callback) {
  data[record.date.getYear()][record.date.getMonth()][record.date.getDay()][record.id] = record
});

const transformToJson = transform(function(record, callback) {
  callback(null, ',\n' + JSON.stringify(record))
}, {parallel: 10});

input.pipe(parser)
  .pipe(parseData)
  .pipe(transformToJson)
  .pipe(output);