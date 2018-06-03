# Drip Investing

## Data processing

- Get CSV from CommBank
    - Format: date | amount | description | balance
- Parse CSV to Javascript object
    - `csv-parse`

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

    

