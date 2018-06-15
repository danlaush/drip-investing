<template>
  <section>
    <app-menu />
    <h1 class="title">
      View data
    </h1>
    <ul>
      <li v-for="(year, index) in data" :key="index">
        <!-- <h2>{{index}}</h2> -->
        <ul>
          <li v-for="(month, index2) in year" :key="index2">
            <div class="month-data">
              <h3>{{MONTHS[index2]}}</h3> <p><strong>Monthly total:</strong> {{ monthTotal(month) }}</p>
            </div>
            <div class="record record--heading">
              <span class="record-note">Transaction</span>
              <span class="record-amount">Amount</span>
              <span class="record-investment">Investment</span>
            </div>
            <ul>
              <li v-for="(day, index3) in month" :key="index3">
                <!-- <pre>
                  filterTransactions(day)
                  {{filterTransactions(day)}}
                </pre> -->
                <h4 v-if="filterTransactions(day) != {}">{{MONTHS[index2]}} {{index3}}</h4>
                <div
                  v-for="(record, index4) in filterTransactions(day)" 
                  class="record"
                  :key="index4">
                  <span class="record-note">{{record.note}}</span>
                  <span class="record-amount">{{record.amount}}</span>
                  <span class="record-investment">+${{ investmentAmount(record.amount) }}</span>
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
import currency from 'currency.js'

export default {
  data: function() {
    return {
      data: this.$store.state.index,
      MONTHS
    }
  },
  methods: {
    monthTotal: function (month) {
      console.log('this.dayTotal', this.dayTotal)
  
      return Object.keys(month).reduce((accum, key) => {
        return currency(accum).add(this.dayTotal(month[key]))
      }, 0)
      // return 5.00
    },
    dayTotal: function (day) {
      return Object.keys(day).reduce((accum, key) => {
        return currency(accum).add(this.investmentAmount(day[key].amount))
      }, 0)
    },
    filterTransactions: function(tnxs) {
      console.log('typeof tnxs', typeof tnxs)
      return Object.keys(tnxs)
        .filter(record => this.keepTransaction(tnxs[record]))
        .reduce((obj, key) => {
          obj[key] = tnxs[key];
          return obj;
        }, {})
    },
    keepTransaction: function (tnx) {
      if(tnx.amount > 0) return false
      if(this.investmentAmount(tnx.amount) == 0) return false
      return true
    },
    // Takes a currency amount 
    // Returns the cent difference as an Int of the 
    // amount rounded up to the nearest dollar
    investmentAmount: function (amount) {
      // only invest on spending transactions, not income
      if(amount > 0) return 0
      // how many places past the decimal in amount 
      const specificity = amount.split('.')[1].length
      // how many cents
      const change = amount.split('.')[1]
      const whole = Math.pow(10, specificity)
      const differenceInCents = whole - change

      if (differenceInCents !== whole) {
        return (differenceInCents / 100).toPrecision(2)
      } else {
        return 0
      }
    },
    // https://stackoverflow.com/questions/36958870/how-to-reverse-an-object-in-javascript
    // Thanks
    reverseObject: function (object) {
      console.log('reverseObject', object)
      var newObject = {};
      var keys = [];
      for (var key in object) {
        keys.push(key);
      }
      for (var i = keys.length - 1; i >= 0; i--) {
        var value = object[keys[i]];
        newObject[keys[i]]= value;
      }       
      console.log('newObject', newObject)
      return newObject;
    }
  },
  components: {
    AppMenu
  }
}

const MONTHS = {
  '1': 'January',
  '2': 'February',
  '3': 'March',
  '4': 'April',
  '5': 'May',
  '6': 'June',
  '7': 'July',
  '8': 'August',
  '9': 'September',
  '10': 'October',
  '11': 'November',
  '12': 'December'
}
</script>

<style scoped>

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

ul {
  list-style-type: none;
}

ul, li {
  padding-left: 0;
  margin-left: 0;
}

.month-data {
  display: flex;
  justify-content: space-between;
  padding-top: 2rem;
  padding-bottom: 2rem;
  align-items: baseline;
}

.month-data h3 {
  font-size: 2rem;
}

.record {
  display: flex;
  width: 100%;
  justify-content: flex-end;
}

.record--heading {
  font-weight: bold;
}

.record span {
  padding: 1em;
}

span.record-note {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  margin-right: auto;
  padding-left: 0;
}

.record-amount,
.record-investment {
  flex-basis: 5rem;
  flex-shrink: 0;
}

span.record-investment {
  padding-right: 0;
  text-align: right;
}
</style>
