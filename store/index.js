import Vuex from 'vuex'

// 29/05/2018,"-4.05","FOODWORKS IVANHOE EA IVANHOE EAST  AUS Card xx4335 Value Date: 28/05/2018","+2820.96"
// 28/05/2018,"+1275.92","Direct Credit 421520 Today Today Design Wages","+2825.01"
// 27/05/2018,"-40.00","Wdl ATM CBA ATM  BARKLY SQUARE2 VIC 311193   AUS","+1549.09"

// {"id":"32c260","date":"2018-05-28T14:00:00.000Z","amount":"-10.00","note":"BROTHERHOOD OF ST LAWR FITZROY  AUS Card xx4335 Value Date: 27/05/2018","balance":"+2810.96","raw":["29/05/2018","-10.00","BROTHERHOOD OF ST LAWR FITZROY  AUS Card xx4335 Value Date: 27/05/2018","+2810.96"]},
// {"id":"305621","date":"2018-05-28T14:00:00.000Z","amount":"-4.05","note":"FOODWORKS IVANHOE EA IVANHOE EAST  AUS Card xx4335 Value Date: 28/05/2018","balance":"+2820.96","raw":["29/05/2018","-4.05","FOODWORKS IVANHOE EA IVANHOE EAST  AUS Card xx4335 Value Date: 28/05/2018","+2820.96"]},
// {"id":"4636b1","date":"2018-05-27T14:00:00.000Z","amount":"+1275.92","note":"Direct Credit 421520 Today Today Design Wages","balance":"+2825.01","raw":["28/05/2018","+1275.92","Direct Credit 421520 Today Today Design Wages","+2825.01"]},
// {"id":"2417ee","date":"2018-05-26T14:00:00.000Z","amount":"-40.00","note":"Wdl ATM CBA ATM  BARKLY SQUARE2 VIC 311193   AUS","balance":"+1549.09","raw":["27/05/2018","-40.00","Wdl ATM CBA ATM  BARKLY SQUARE2 VIC 311193   AUS","+1549.09"]}

let startingData = {
  '2018': {
    '5': {
      '26': {
        '2417ee': [{"id":"2417ee","date":"2018-05-26T14:00:00.000Z","amount":"-40.00","note":"Wdl ATM CBA ATM  BARKLY SQUARE2 VIC 311193   AUS","balance":"+1549.09","raw":["27/05/2018","-40.00","Wdl ATM CBA ATM  BARKLY SQUARE2 VIC 311193   AUS","+1549.09"]}],
      },
      '27': {
        '4636b1': [{"id":"4636b1","date":"2018-05-27T14:00:00.000Z","amount":"+1275.92","note":"Direct Credit 421520 Today Today Design Wages","balance":"+2825.01","raw":["28/05/2018","+1275.92","Direct Credit 421520 Today Today Design Wages","+2825.01"]}],
      },
      '28': {
        '305621': {"id":"305621","date":"2018-05-28T14:00:00.000Z","amount":"-4.05","note":"FOODWORKS IVANHOE EA IVANHOE EAST  AUS Card xx4335 Value Date: 28/05/2018","balance":"+2820.96","raw":["29/05/2018","-4.05","FOODWORKS IVANHOE EA IVANHOE EAST  AUS Card xx4335 Value Date: 28/05/2018","+2820.96"]},
        '32c260': {"id":"32c260","date":"2018-05-28T14:00:00.000Z","amount":"-10.00","note":"BROTHERHOOD OF ST LAWR FITZROY  AUS Card xx4335 Value Date: 27/05/2018","balance":"+2810.96","raw":["29/05/2018","-10.00","BROTHERHOOD OF ST LAWR FITZROY  AUS Card xx4335 Value Date: 27/05/2018","+2810.96"]},
      }
    }
  }
}

const createStore = () => {
  return new Vuex.Store({
    state: {
      data: startingData
    },
    mutations: {
      addToData (state, record) {
        console.log('add new record', record)
      }
    }
  })
}

export default createStore