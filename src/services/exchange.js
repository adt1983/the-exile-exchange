import { http, httpAll, httpSpread } from 'services'
import { league } from '../services/league'
import { currency } from '../services/currency'
import settings from 'settings'

// for mapping to API props
const keys = settings.keys.exchange

function getGCD (a, b) { // greatest common denom
  for (let c; b; a = b, b = c) {
    c = a % b
  }
  return a
}

function arrangeCollection (collection) {
  return Object.keys(collection).sort(function (a, b) {
    // Sort by floating-point to avoid Integer truncation
    let ratioStringA = a.split(':')
    let ratioStringB = b.split(':')
    let ratioA = parseInt(ratioStringA[0], 10) / parseInt(ratioStringA[1], 10)
    let ratioB = parseInt(ratioStringB[0], 10) / parseInt(ratioStringB[1], 10)
    return ratioA - ratioB
  })
}

function createRatio (item, isAskOrder) {
  // so we don't have to think about ask vs bid
  // http://www.investopedia.com/terms/c/currencypair.asp
  item.isAsk = isAskOrder
  let base = item.isAsk ? keys.bid : keys.ask
  let quote = item.isAsk ? keys.ask : keys.bid
  item[keys.ratio] = item[base] + ':' + item[quote]
  //
  // create ratio in format of
  // PERCENTAGE.GCD (greatest common denom)
  // example:
  // raw ratios [1:2, 1:3, 2:4, 3:9]
  // converted [50.1, 33.1, 50.2, 33.3]
  //
  let gcd = getGCD(item[base], item[quote])
  item[keys.ratio + '_base'] = parseInt((item[base] / item[quote]) * 100, 10) + '.' + gcd
  return item
}

function addItemToIndex (item, index, collection) {
  if (!collection[index]) {
    collection[index] = {
      bids: [],
      asks: []
    }
    collection[index][keys.ratio + '_base'] = item[keys.ratio + '_base']
  }
  if (item.isAsk) {
    collection[index].asks.push(item)
  } else {
    collection[index].bids.push(item)
  }
}

function setStats (items, isAskOrder, collection) {
  items.forEach(function (item) {
    let ratio = createRatio(item, isAskOrder)
    addItemToIndex(ratio, item[keys.ratio], collection)
  })
  return items
}

export function exchange (askList, bidList, askId, bidId, league) {
  let exchangeMap = {} // new map for each exchange query
  let exchange = {askList, bidList, askId, bidId, league}

  setStats(exchange.askList, true, exchangeMap)
  // set states for bids
  setStats(exchange.bidList, false, exchangeMap)
  // set an array of keys so they have a set order
  exchange.exchangeMap = exchangeMap
  exchange.orderBy = arrangeCollection(exchangeMap)
  return exchange
}

export class ExchangeModel {

  constructor (ask, bid, leagueId) {
    // ids and arrays
    this.askId = ask.id || ask
    this.bidId = bid.id || bid

    this.askList = []
    this.bidList = []

    this.askReq = ''
    this.bidReq = ''

    // key maps
    this.leagueMap = {}
    this.currencyMap = {}
    this.exchangeMap = {}
    this.orderBy = []

    this.leagueId = leagueId || settings.defaults.leagueId
    this.league = ''

    return this.instantiate()
  }

  // first :: get the prerequisite data
  //          for league & currency
  preData () {
    let dis = this
    return new Promise(function (resolve, reject) {
      function getCurrency () {
        return currency
      }

      function getLeague () {
        return league
      }

      httpAll([getCurrency(), getLeague()])
        .then(httpSpread(function (currency, league) {
          dis.currencyMap = currency.collection
          dis.leagueMap = league.collection
          resolve(dis) // instance
        }))
        .catch(function (error) {
          reject('can\'t load dependencies', error)
        })
    })
  }

  // second :: build the API parameters
  buildURLs (instance) {
    return new Promise(function (resolve, reject) {
      try {
        instance.league = instance.leagueMap[instance.leagueId][settings.keys.league.id] || settings.defaults.leagueId
        instance.askReq = '/CurrencyOrder' + '/' + instance.league + '/' + instance.askId + '/' + instance.bidId
        instance.bidReq = '/CurrencyOrder' + '/' + instance.league + '/' + instance.bidId + '/' + instance.askId
        resolve(instance)
      } catch (error) {
        reject('can\'t create urls!', error)
      }
    })
  }

  // third :: get the core data
  reqData (instance) {
    return new Promise(function (resolve, reject) {
      function getAskData () {
        return http.get(instance.askReq)
      }

      function getBidData () {
        return http.get(instance.bidReq)
      }

      httpAll([getAskData(), getBidData()])
        .then(httpSpread(function (asks, bids) {
          instance.askList = asks.data
          instance.bidList = bids.data
          resolve(instance)
        }))
        .catch(function (error) {
          reject('can\'t load data lists', error)
        })
    })
  }

  // finally :: set and arrange the data !!
  indexData (instance) {
    return new Promise(function (resolve, reject) {
      if (instance.askList.length === 0 && instance.bidList.length === 0) {
        instance.noData = true // TODO: Allow markets to have only sellers/buyers. Does this break anything?
        resolve(instance)
      } else {
        // resolve that ish!
        // let exc = exchange(instance.askList, instance.bidList, instance.askId, instance.bidId, instance.league)
        // instance.askList = exc.askList
        // instance.bidList = exc.bidList
        // instance.askId = exc.askId
        // instance.bidId = exc.bidId
        // instance.league = exc.league
        // instance.exchangeMap = exc.exchangeMap
        // instance.orderBy = exc.orderBy
        console.log('instance', instance)
        Object.assign(instance, exchange(instance.askList, instance.bidList, instance.askId, instance.bidId, instance.league))
        console.log('instance', instance)
        resolve(instance)
      }
    })
  }

  refresh () {
    let dis = this
    return new Promise(function (resolve, reject) {
      dis.reqData(dis)
        .then(dis.indexData)
        .then(function (instance) {
          console.log('refresh: completed', instance)
          resolve(instance)
        })
        .catch(function (error) {
          console.log('refresh: something went wrong', error)
          reject(error)
        })
    })
  }

  // refresh?
  // refreshReq() {
  // auto refresh data
  // this.refreshInterval = setTimeout(function () {
  //   dis.reqData
  // .then(dis.indexData)
  // .then(function (instance) {
  //   console.log('refresh completed', instance)
  //   resolve(instance)
  // })
  // .catch(function (error) {
  //   console.log('something went wrong', error)
  //   reject(error)
  // })
  //   if (settings.defaults.autoRefresh) {
  //     this.refreshInterval()
  //   }
  // }, settings.defaults.refreshInterval)
  // }

  instantiate () {
    let dis = this
    return new Promise(function (resolve, reject) {
      dis.preData()
        .then(dis.buildURLs)
        .then(dis.reqData)
        .then(dis.indexData)
        .then(function (instance) {
          console.log('completed', instance)
          resolve(instance)
        })
        .catch(function (error) {
          console.log('something went wrong', error)
          reject(error)
        })
    })
  }
}
