# Drip Investing

This project aims to help you invest a bit at a time without having to give your entire spending history to advertisers.

As frequently as you'd like, export your transactions from CommBank as a CSV. Import them into Drip Investing. You'll be given the amount you should invest for the month - each transaction is rounded up to the nearest dollar, and that difference in change goes into the total. Take that amount and transfer it to your superannuation or investment of choice.

## To do

- [x] Data model
- [x] Static layout
- [x] Calculate monthly totals from data
- [x] Layout populated from store
- [x] Insert new data in store
- [ ] Persist data?
    - [ ] Insert new data in json file
    - [ ] Ignore alread-captured data during import
- [ ] Process CSV
- [ ] 

## Build Setup

``` bash
# install dependencies
$ npm install # Or yarn install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm start

# generate static project
$ npm run generate
```

For detailed explanation on how things work, checkout the [Nuxt.js docs](https://github.com/nuxt/nuxt.js).

## Data processing

- Get CSV from CommBank
    - Format: date | amount | description | balance
- Parse CSV to Javascript object
    - `csv-parse`

```
parser
    returns an array of values from one row of the CSV
    format: [
        02/06/2018,
        "-12.00",
        "TRANSACTION NOTES",
        "+100"
    ]
parseData
    returns an object of the format
    {
        id: [String] // reproduceable hash of raw array, for indexing
        date: [Date Object], // date-fns/parse(record[0])
        amount: [Number] // record[1]
        note: [String] // record[2]
        balance: [Number] // record[3] 
        raw: [Array] // previous stream's array
    }
indexRecord
    Adds records to the global index by placing it in a global array based on the record's date
    data[record.date.getYear][record.date.getMonth][record.date.getDay][hashFunction()]
    data[2018][06][02]['hfs978hgr3o']: record // no change
    return format: record // no change
transformToJson
    return format: ',' + 'JSON.stringify(record)
writeToFile
    fs.writeFileStream(file.json)
```
