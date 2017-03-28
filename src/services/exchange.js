import { http, httpAll, httpSpread } from 'services'
import { league } from '../services/league'
import { currency } from '../services/currency'
import settings from 'settings'

// for mapping to API props
const keys = settings.keys.exchange

function createRatio (item) {
  // todo: externalize these flags in settings{} ?
  item[keys.ratio] = item[keys.ask] + ':' + item[keys.bid]
  item[keys.ratio + '_raw'] = (item[keys.bid] / item[keys.ask]) * 100
  item[keys.ratio + '_pair'] = item[keys.bid] + ':' + item[keys.ask]
  item[keys.ratio + '_pair' + '_raw'] = (item[keys.ask] / item[keys.bid]) * 100
  // item[key + '_key'] = item[keys.ask] + ':' + item[keys.bid] + ':' + item[keys.bid] + ':' + item[keys.ask]
  item[keys.ratio + '_key'] = (item[keys.ask] < item[keys.bid]) ? item[keys.ask] + ':' + item[keys.bid] : item[keys.bid] + ':' + item[keys.ask]
  item[keys.ratio + '_base'] = (item[keys.ask] < item[keys.bid]) ? (item[keys.bid] / item[keys.ask]) : (item[keys.ask] / item[keys.bid])
  return item
}

function addItemToIndex (item, index, askId, collection) {
  if (!collection[index]) {
    collection[index] = {
      bids: [],
      asks: []
    }
    collection[index][keys.ratio + '_base'] = item[keys.ratio + '_base']
  }
  if (item[keys.askId].toString() === askId) {
    collection[index].asks.push(item)
  } else {
    collection[index].bids.push(item)
  }
}

function setStats (items, askId, collection) {
  items.forEach(function (item) {
    let ratio = createRatio(item)
    addItemToIndex(ratio, item[keys.ratio + '_key'], askId, collection)
  })
  return items
}

export class ExchangeModel {

  constructor (ask, bid, leagueId) {
    // ids and arrays
    this.askId = ask.id || ask
    this.bidId = bid.id || bid
    this.leagueId = leagueId || settings.defaults.leagueId
    this.askList = []
    this.bidList = []
    // key maps
    this.exchangeMap = {}
    this.leagueMap = {}
    this.currencyMap = {}
    console.log('constructor', ask)
    return this.getData()
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
          console.log('can\'t load dependencies', error)
          reject(error)
        })
    })
  }

  // second :: build the API parameters
  buildURLs (instance) {
    return new Promise(function (resolve, reject) {
      try {
        const league = instance.leagueMap[instance.leagueId][settings.keys.league.id] || settings.defaults.leagueId
        const askReq = '/CurrencyOrder' + '/' + league + '/' + instance.askId + '/' + instance.currencyMap[instance.askId].$preset
        const bidReq = '/CurrencyOrder' + '/' + league + '/' + instance.currencyMap[instance.askId].$preset + '/' + instance.askId
        instance.askReq = askReq
        instance.bidReq = bidReq
        resolve(instance)
      } catch (error) {
        console.log('can\'t create urls!', error)
        reject(error)
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
          console.log('can\'t load data lists', error)
          reject(error)
        })
    })
  }

  // finally :: arrange the data !!
  indexData (instance) {
    return new Promise(function (resolve) {
      setStats(instance.askList, instance.askId, instance.exchangeMap)
      setStats(instance.bidList, instance.bidId, instance.exchangeMap)
      resolve(instance)
    })
  }

  getData () {
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
