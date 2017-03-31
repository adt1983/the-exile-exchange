  import { http, httpAll, httpSpread } from 'services'
  import { league } from '../services/league'
  import { currency } from '../services/currency'
  import settings from 'settings'

  // for mapping to API props
  const keys = settings.keys.exchange

  function arrangeCollection (collection) {
    let orderBy = Object.keys(collection).sort(function (a, b) {
      const aa = collection[a] && collection[a][keys.ratio + '_base']
      const bb = collection[b] && collection[b][keys.ratio + '_base']
      return bb - aa
    })
    return orderBy
  }

  function createRatio (item, askId) {
    const isAsk = item[keys.askId].toString() === askId
    const ask = isAsk ? keys.ask : keys.bid
    const bid = isAsk ? keys.bid : keys.ask
    // todo: externalize these flags in settings{} ?
    item[keys.ratio] = item[ask] + ':' + item[bid]
    console.log('item[keys.ratio] ', item[keys.ratio])
    // item[keys.ratio + '_raw'] = (item[bid] / item[ask]) * 100
    // console.log('item[keys.ratio +', item[keys.ratio + '_raw'])
    // item[keys.ratio + '_pair'] = item[bid] + ':' + item[ask]
    // item[keys.ratio + '_pair' + '_raw'] = (item[ask] / item[bid]) * 100
    // item[key + '_key'] = item[ask] + ':' + item[bid] + ':' + item[bid] + ':' + item[ask]
    item[keys.ratio + '_key'] = item[ask] + ':' + item[bid]
    item[keys.ratio + '_base'] = (item[bid] / item[ask])
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

      this.askList = []
      this.bidList = []

      this.askReq = ''
      this.bidReq = ''

      // key maps
      this.exchangeMap = {}
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
        // set states for asks
        setStats(instance.askList, instance.askId, instance.exchangeMap)
        // set states for bids
        setStats(instance.bidList, instance.askId, instance.exchangeMap)
        // set an array of keys so they have a set order
        instance.orderBy = arrangeCollection(instance.exchangeMap)
        // resolve that ish!
        resolve(instance)
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
