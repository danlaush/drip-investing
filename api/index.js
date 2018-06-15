console.log('hello world')

const fs = require('fs')
const parseCsv = require('csv-parse')
const transform = require('stream-transform');
const moment = require('moment')
const md5 = require('md5')

let data = [];
const input = fs.createReadStream(__dirname+'/../data/transactions_short.csv')
const outputItems = fs.createWriteStream(__dirname+'/../data/data.json')
// const outputIndex = fs.createWriteSync(__dirname+'/../data/index.json')

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
  // console.log(record[0],date);
  callback(null, transaction);

}, {parallel: 10});

const indexRecords = transform(function(record, callback) {
  // console.log('indexing', record)
  const y = record.date.year()
  const m = record.date.month() + 1
  const d = record.date.date()
  // console.log(`d/m/y ${d}/${m}/${y}`)
  data[y] = {}
  data[y][m] = {}
  data[y][m][d] = {}
  data[y][m][d][record.id] = record
  console.log(data)
  callback(null, record)
});
// pipe file into csvparser
// pipe raw objects into object
// index the data
const transformToJson = transform(function(record, callback) {
  callback(null, ',\n' + JSON.stringify(record))
}, {parallel: 10});

const parsedStream = input.pipe(parser)
  .pipe(parseData)
  .pipe(indexRecords)
  .pipe(transformToJson)
  .pipe(outputItems)
  .on('finish', () => {
    console.log('indexrecords stream finished')
    console.log(data)
    fs.writeFile(
      __dirname + '/../data/index.json', 
      data, 
      (err) => {
        if (err) throw err;
        console.log('The file has been saved!');
      })
  });