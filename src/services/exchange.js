import axios from 'axios'
import { http } from 'services'
// import { storageAvailable, setItemMap } from 'services/util'
import { league } from '../services/league'
import { currency } from '../services/currency'
import settings from 'settings'

// const keys = settings.keys.exchange
// const mapId = keys.id

// const storageType = 'localStorage'
// const storageId = 'breachCurrency'
console.log('axios.all', axios.all)
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
  // first get the league & currency
  preData () {
    let that = this
    return new Promise(function (resolve, reject) {
      function getCurrency () {
        return currency
      }
      function getLeague () {
        return league
      }
      axios.all([ getCurrency(), getLeague() ])
        .then(axios.spread(function (currency, league) {
          that.currencyMap = currency.collection
          that.leagueMap = league.collection
          resolve(that) // instance
        }))
        .catch(function (error) {
          console.log('can\'t load dependencies', error)
          reject(error)
        })
    })
  }

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

  // second get the data
  reqData (instance) {
    return new Promise(function (resolve, reject) {
      function getAskData () {
        return http.get(instance.askReq)
      }
      function getBidData () {
        return http.get(instance.bidReq)
      }

      axios.all([getAskData(), getBidData()])
        .then(axios.spread(function (asks, bids) {
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

  indexData (instance) {
    return new Promise(function (resolve) {
      console.log('this.askList', instance.askList)
      console.log('this.bidList', instance.bidList)
      resolve(instance)
    })
  }

  getData () {
    // let that = this
    this.preData()
      .then(this.buildURLs)
      .then(this.reqData)
      .then(this.indexData)
      .then(function (instance) {
        console.log('completed', instance)
        return instance
      })
      .catch(function (error) {
        console.log('something went wrong', error)
        return error
      })
  }
}
