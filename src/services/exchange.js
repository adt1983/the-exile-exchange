import { http, httpAll, httpSpread } from 'services'
import { league } from '../services/league'
import { currency } from '../services/currency'
import settings from 'settings'

// for mapping to API props
const keys = settings.keys.exchange

function getGCD (a, b) {
  for (let c; b; a = b, b = c) {
    c = a % b
  }
  return a
}

function arrangeCollection (collection) {
  let orderBy = Object.keys(collection).sort(function (a, b) {
    let aa = collection[a] && collection[a][keys.ratio + '_base']
    let bb = collection[b] && collection[b][keys.ratio + '_base']
    return bb - aa
  })
  return orderBy
}

function createRatio (item, askId) {
  let ask = null
  let bid = null
  // let isAsk = false
  let gcd = 1
  // give all items same orientation to avoid confusion
  if (typeof (item[keys.askId].toString) === 'function') {
    item.isAsk = (item[keys.askId].toString() === askId)
  } else {
    item.isAsk = (item[keys.askId] === askId)
  }
  // so we dont have to think about ask vs bid
  ask = item.isAsk ? keys.ask : keys.bid
  bid = item.isAsk ? keys.bid : keys.ask
  item[keys.ratio] = item[ask] + ':' + item[bid]
  //
  // crete ratio in format of
  // PERCENTAGE.GCD (greatest common denom)
  // example:
  // raw ratios [1:2, 1:3, 2:4, 3:9]
  // converted [50.1, 33.1, 50.2, 33.3]
  //
  gcd = getGCD(item[ask], item[bid])
  item[keys.ratio + '_base'] = parseInt((item[ask] / item[bid]) * 100, 10) + '.' + gcd
  return item
}

function addItemToIndex (item, index, askId, collection) {
  // console.log('askId', askId)
  // console.log('item[keys.askId]', item[keys.askId])
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

function setStats (items, askId, collection) {
  items.forEach(function (item) {
    let ratio = createRatio(item, askId)
    addItemToIndex(ratio, item[keys.ratio], askId, collection)
  })
  return items
}
// askList, bidList, askId, exchangeMap
export function exchange (askList, bidList, askId) {
  let exchangeMap = {} // new map for each exchange query
  let exhange = {askList, bidList, askId}
  setStats(exhange.askList, exhange.askId, exchangeMap)
  // set states for bids
  setStats(exhange.bidList, exhange.askId, exchangeMap)
  // set an array of keys so they have a set order
  exhange.exchangeMap = exchangeMap
  exhange.orderBy = arrangeCollection(exchangeMap)
  return exhange
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

    this.leagueId = leagueId || settings.defaults.leagueId
    this.league = ''

    return this.instantiate()
  }

  get asklist () {
    console.log('this.askList', this.askList)
    return this.askList
  }
  get bidlist () {
    console.log('this.bidList', this.bidList)
    return this.bidList
  }

  set asklist (list) {
    this.askList = list
  }
  set bidlist (list) {
    this.bidList = list
  }
  set addask (item) {
    this.askList.push(item)
  }
  set addbid (list) {
    this.bidList.push(list)
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
      httpAll([ getCurrency(), getLeague() ])
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
    return new Promise(function (resolve) {
      // resolve that ish!
      resolve(exchange(instance.askList, instance.bidList, instance.askId))
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
