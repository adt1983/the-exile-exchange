// import Vue from 'vue'
import { exchange } from 'src/services/exchange'
import globalSettings from 'src/settings'
// import { http } from 'src/services'
// import moxios from 'moxios'
// import sinon from 'sinon'
// import { equal } from 'assert'
const keys = globalSettings.keys.exchange
const settings = {}
let askList = []
let bidList = []
// example object
// {
//     "accountName": "jedininjaman",
//     "ask_id": 4,
//     "ask_qty": 115,
//     "bid_id": 6,
//     "bid_qty": 1,
//     "lastChar": "_Cabbage",
//     "lastSeenUTC": 1491085752000,
//     "league": "Standard"
//   }
function createBid (askId, bidId, askQty, bidQty, lastChar, accoutName) {
  // check ratio
  // mock $ratio as $$ratio
  let pct = parseInt((askQty / bidQty) * 100, 10)
  // console.log('$$ratio', pct)
  // console.log('lastChar', lastChar)
  return {
    $$ratio: pct,
    [keys.askId]: askId,
    [keys.bidId]: bidId,
    [keys.ask]: askQty,
    [keys.bid]: bidQty,
    [keys.name]: lastChar,
    [keys.user]: accoutName,
    // league: 'standard',
    [keys.lastSeenTime]: +(new Date())
  }
}
describe('ExchangeFactory', () => {
  beforeEach(function () {
    askList = []
    bidList = []
    settings.alpha = 'jack'
    settings.beta = 'joan'
    // exchangeMap = [] // reset
    settings.ask = [
      {
        askQty: 1,
        bidQty: 2,
        lastChar: 'charA',
        accountName: 'AccountA'
      },
      {
        askQty: 1,
        bidQty: 2,
        lastChar: 'charC',
        accountName: 'AccountC'
      },
      {
        askQty: 1,
        bidQty: 3,
        lastChar: 'charA',
        accountName: 'AccountA'
      },
      {
        askQty: 3,
        bidQty: 4,
        lastChar: 'charY',
        accountName: 'AccountY'
      },
      {
        askQty: 1,
        bidQty: 3,
        lastChar: 'charE',
        accountName: 'AccountE'
      },
      {
        askQty: 2,
        bidQty: 4,
        lastChar: 'charAAA',
        accountName: 'AccountA'
      },
      {
        askQty: 1,
        bidQty: 2,
        lastChar: 'charB',
        accountName: 'AccountB'
      },
      {
        askQty: 3,
        bidQty: 4,
        lastChar: 'charX',
        accountName: 'AccountX'
      }
    ]
    settings.bid = [
      {
        askQty: 2,
        bidQty: 1,
        lastChar: 'char1',
        accountName: 'Account1'
      },
      {
        askQty: 1,
        bidQty: 3,
        lastChar: 'char3',
        accountName: 'Account2'
      },
      {
        askQty: 2,
        bidQty: 1,
        lastChar: 'char2',
        accountName: 'Account2'
      },
      {
        askQty: 3,
        bidQty: 1,
        lastChar: 'char3',
        accountName: 'Account2'
      },
      {
        askQty: 1,
        bidQty: 1,
        lastChar: 'char4',
        accountName: 'Account4'
      },
      {
        askQty: 2,
        bidQty: 2,
        lastChar: 'char8',
        accountName: 'Account8'
      },
      {
        askQty: 1,
        bidQty: 2,
        lastChar: 'char5',
        accountName: 'Account5'
      },
      {
        askQty: 2,
        bidQty: 4,
        lastChar: 'char6',
        accountName: 'Account6'
      }
    ]
    settings.ask.forEach(function (ask) {
      askList.push(createBid(settings.alpha, settings.beta, ask.askQty, ask.bidQty, ask.lastChar, ask.accoutName))
    })
    settings.bid.forEach(function (bid) {
      bidList.push(createBid(settings.beta, settings.alpha, bid.bidQty, bid.askQty, bid.lastChar, bid.accoutName))
    })
  })
  it('should return object', () => {
    const results = exchange(askList, bidList, settings.alpha)
    expect(results).to.be.an('object')
  })
  it('should render `exchangeMap`', () => {
    const results = exchange(askList, bidList, settings.alpha)
    expect(results.exchangeMap).to.be.an('object')
  })
  it('should render all asks', () => {
    const results = exchange(askList, bidList, settings.alpha)
    let total = askList.length
    for (let i = Object.keys(results.exchangeMap).length - 1; i >= 0; i--) {
      total = (total - results.exchangeMap[Object.keys(results.exchangeMap)[i]].asks.length)
    }
    expect(total).to.equal(0)
  })
  it('should render all bids', () => {
    const results = exchange(askList, bidList, settings.alpha)
    let total = bidList.length
    for (let i = Object.keys(results.exchangeMap).length - 1; i >= 0; i--) {
      total = (total - results.exchangeMap[Object.keys(results.exchangeMap)[i]].bids.length)
    }
    expect(total).to.equal(0)
  })
  it('should have `orderBy` array', () => {
    const results = exchange(askList, bidList, settings.alpha)
    expect(results.orderBy).to.be.an('array')
  })
  it('should have `orderBy` in the correct (decending) order', () => {
    const results = exchange(askList, bidList, settings.alpha)
    const originalOrder = results.orderBy
    let testOrder = results.orderBy.slice(0)
    // decending order
    testOrder.sort(function (a, b) {
      return b - a
    })
    expect(testOrder.join()).to.equal(originalOrder.join())
  })
  it('should group asks by unmixed `$ratio_base`', () => {
    const results = exchange(askList, bidList, settings.alpha)
    for (let i = Object.keys(results.exchangeMap).length - 1; i >= 0; i--) {
      let key = Object.keys(results.exchangeMap)[i]
      let items = results.exchangeMap[key].asks
      if (items && items.length) {
        // get $ratio_base
        let ratio = items[0].$ratio_base
        do {
          // check each item in ratio
          // to make sure its correct
          let item = items.shift()
          expect(item.$ratio_base).to.equal(ratio)
        } while (items.length > 0)
      }
    }
  })
  it('should group bids by unmixed `$ratio_base`', () => {
    const results = exchange(askList, bidList, settings.alpha)
    for (let i = Object.keys(results.exchangeMap).length - 1; i >= 0; i--) {
      let key = Object.keys(results.exchangeMap)[i]
      let items = results.exchangeMap[key].bids
      if (items && items.length) {
        // get $ratio_base
        let ratio = items[0].$ratio_base
        do {
          // check each item in ratio
          // to make sure its correct
          let item = items.shift()
          expect(item.$ratio_base).to.equal(ratio)
        } while (items.length > 0)
      }
    }
  })
  it('should not mixed asks of same `$ratio` but different multiple', () => {
    const results = exchange(askList, bidList, settings.alpha)
    for (let i = Object.keys(results.exchangeMap).length - 1; i >= 0; i--) {
      let key = Object.keys(results.exchangeMap)[i]
      let items = results.exchangeMap[key].asks
      if (items && items.length) {
        // get $ratio_base
        let ratio = items[0].$ratio
        do {
          // check each item in ratio
          // to make sure its correct
          let item = items.shift()
          expect(item.$ratio).to.equal(ratio)
        } while (items.length > 0)
      }
    }
  })
  it('should not mixed bids of same `$ratio` but different multiple', () => {
    const results = exchange(askList, bidList, settings.alpha)
    for (let i = Object.keys(results.exchangeMap).length - 1; i >= 0; i--) {
      let key = Object.keys(results.exchangeMap)[i]
      let items = results.exchangeMap[key].bids
      if (items && items.length) {
        // get $ratio_base
        let ratio = items[0].$ratio
        do {
          // check each item in ratio
          // to make sure its correct
          let item = items.shift()
          expect(item.$ratio).to.equal(ratio)
        } while (items.length > 0)
      }
    }
  })
})
