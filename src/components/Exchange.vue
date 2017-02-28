<template>
  <div class="grid-block vertical">
    <loader v-if="!renderView()"></loader>

    <div class="grid-block" v-if="renderView()">
      <div class="grid-block text-center justify-center">
        <div class="grid-content">
          <h3 class="inline-block">Asking</h3><h2 class="inline-block">
          {{currencyMap[askId][settings.keys.currency.name]}}</h2>
          <img v-bind:src="currencyMap[askId][settings.keys.currency.imgUrl]" v-bind:alt="currencyMap[askId][settings.keys.currency.name]">
        </div>
      </div>
      <div class="grid-block text-center shrink">
        <div class="grid-content">
          <h3>Exchange Rates</h3>
          <input type="checkbox" id="Offers" v-model="showWithOffersOnly">
          <label for="Offers">Offers Only</label>
        </div>
      </div>
      <div class="grid-block text-center">
        <div class="grid-content">
          <h3 class="inline-block">Offering</h3><h2 class="inline-block">{{currencyMap[bidId][settings.keys.currency.name]}}</h2>
          <img v-bind:src="currencyMap[bidId][settings.keys.currency.imgUrl]" v-bind:alt="currencyMap[bidId][settings.keys.currency.name]">
        </div>
      </div>
    </div>
    <div class="grid-block vertical nowrap" v-if="renderView()">
      <div class="grid-block vertical align-center text-center">
        <h1 v-if="orderBy">No Results</h1>
      </div>
      <ul class="grid-block vertical align-center">
        <li class="grid-block tier"
          v-show="showKeyRow(key)" 
          v-if="renderKeyRow(key)" 
          v-for="(key, increments) in orderBy" 
          :key="key">
          <div class="grid-block align-center shrink vertical middle-block">
            <div class="grid-block noscroll align-center vertical middle-block">
              <div class="grid-content text-center">
                <span>Asks</span>
                <span class="badge secondary">{{biddingIndex[key].asks.length}}</span>
              </div>
            </div>
            <div class="grid-block noscroll align-center">
              <div class="grid-content text-center">
                <h1>
                  <span class="body-font" 
                  :class="{ 'has-trade': hasTrade(key) }">{{key}}</span>
                </h1>
              </div>
            </div>
            <div class="grid-block noscroll align-center">
              <div class="grid-content text-center">
                <span>Offers</span>
                <span class="badge">{{biddingIndex[key].offers.length}}</span>
              </div>
            </div>
          </div>
          <div class="grid-block noscroll align-center middle-block">
            <div class="grid-content noscroll">
              <offers-list
                :ratio="key"
                :items="biddingIndex[key].offers"></offers-list>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { settings } from '../settings'
import { http } from '../api'
// import { league } from '../api/league'
// import { currency } from '../api/currency'
import * as filters from '../filters'
import OffersList from './OffersList'
import Loader from './Loader'

const stats = {
  byExchangeRatio: {},
  setStats (items, key, askKey, bidKey, askId, askIdKey) {
    let t = []
    console.log('baseRatio items', items)
    // do all manipulation here
    // in one loop!
    t = items.map(function (item) {
      item = stats.addRatio(item, key, askKey, bidKey)
      stats.addItemToIndex(item, key, askKey, item[key + '_key'], askId, askIdKey)
      return item
    })
    return t
  },
  addRatio: function (item, key, askKey, bidKey) {
    // todo: externalize these flags in settings{} ?
    item[key] = item[askKey] + ':' + item[bidKey]
    item[key + '_raw'] = (item[bidKey] / item[askKey]) * 100
    item[key + '_pair'] = item[bidKey] + ':' + item[askKey]
    item[key + '_pair' + '_raw'] = (item[askKey] / item[bidKey]) * 100
    // item[key + '_key'] = item[askKey] + ':' + item[bidKey] + ':' + item[bidKey] + ':' + item[askKey]
    item[key + '_key'] = (item[askKey] < item[bidKey]) ? item[askKey] + ':' + item[bidKey] : item[bidKey] + ':' + item[askKey]
    item[key + '_base'] = (item[askKey] < item[bidKey]) ? (item[bidKey] / item[askKey]) : (item[askKey] / item[bidKey])
    return item
  },
  addItemToIndex: function (item, key, askKey, index, askId, askIdKey) {
    if (!stats.byExchangeRatio[index]) {
      stats.byExchangeRatio[index] = {
        offers: [],
        asks: []
      }
      stats.byExchangeRatio[index][key + '_base'] = item[key + '_base']
    }
    // if no asks, define them
    if (stats.byExchangeRatio[index].asks.length) {
      // assumes that the first in index is ask
      console.log('askKey', askId)
      console.log('item[askIdKey]', item[askIdKey])
      console.log('stats.byExchangeRatio[index].asks[0][askKey]', stats.byExchangeRatio[index].asks[0][askIdKey])
      if (item[askIdKey] === askId) {
        console.log('is a ask!!', item)
        stats.byExchangeRatio[index].asks.push(item)
      } else {
        console.log('is a offer!!', item)
        stats.byExchangeRatio[index].offers.push(item)
      }
    } else {
      stats.byExchangeRatio[index].asks.push(item)
    }
    // console.log('stats.byExchangeRatio', stats.byExchangeRatio)
  }
}

export default {
  name: 'exchange',
  props: {
    leagueId: [String, Number],
    askId: [String, Number],
    bidId: [String, Number],
    leagueMap: Object,
    currencyMap: Object
  },
  data () {
    return {
      showWithOffersOnly: true,
      settings,
      keys: settings.keys.exchange,
      orderBy: [],
      // leagueMap: {},
      // currencyMap: {},
      askList: [],
      bidList: [],
      title: 'Breach Currency Exchange'
    }
  },
  computed: {
    isCurrentAsk: function () {
      let items
      console.log('this.askId', this.askId)
      console.log('this.askId', this.askList)
      if (this.askList && this.askList.length) {
        items = stats.setStats(this.askList, settings.keys.exchange.ratio, settings.keys.exchange.ask, settings.keys.exchange.bid, this.askId, settings.keys.exchange.askId)
        return filters.current(items, settings.keys.exchange.lastSeenTime, settings.refreshRate)
        // return items
      }
    },
    // isCurrentBid: function () {
    //   let items
    //   console.log('this.bidId', this.bidId)
    //   if (this.bidList && this.bidList.length) {
    //     items = stats.setStats(this.bidList, settings.keys.exchange.ratio, settings.keys.exchange.ask, settings.keys.exchange.bid)
    //     return filters.current(items, settings.keys.exchange.lastSeenTime, settings.refreshRate)
    //     // return items
    //   }
    // },
    // get only, just need a function
    // highestAsk: function () {
    //   return filters.highest(this.isCurrentAsk, settings.keys.exchange.ask)
    // },
    // highestBid: function () {
    //   return filters.highest(this.isCurrentBid, settings.keys.exchange.bid)
    // },
    biddingIndex: function () {
      let items
      // call other computers to make sure they are compiled
      this.isCurrentAsk // call ask first!
      this.isCurrentBid

      // should stats be passing in `this` values
      // instead of being writting in external funtions?
      // bad scope here?
      items = stats.byExchangeRatio
      console.log('items', items)
      console.log('before ordering by 1:X weight', Object.keys(stats.byExchangeRatio))
      this.orderBy = Object.keys(stats.byExchangeRatio).sort(function (a, b) {
        return stats.byExchangeRatio[b][settings.keys.exchange.ratio + '_base'] - stats.byExchangeRatio[a][settings.keys.exchange.ratio + '_base']
      })
      console.log('after ordering by weight', this.orderBy)
      return items
    }
  },
  methods: {
    // keep the template clean
    hasTrade: function (key) {
      return this.biddingIndex[key].offers && this.biddingIndex[key].offers.length && this.biddingIndex[key].asks && this.biddingIndex[key].asks.length
    },
    showKeyRow: function (key) {
      return this.showWithOffersOnly === false || (this.biddingIndex[key].offers && this.biddingIndex[key].offers.length)
    },
    renderKeyRow: function (key) {
      return this.biddingIndex[key].asks && this.biddingIndex[key].asks.length
    },
    renderView: function () {
      return Object.keys(this.leagueMap) && Object.keys(this.leagueMap).length && Object.keys(this.currencyMap) && Object.keys(this.currencyMap).length && Object.keys(this.biddingIndex) && (Object.keys(this.biddingIndex).length || Object.keys(this.biddingIndex).length === 0)
    }
  },
  components: {
    'offers-list': OffersList,
    Loader
  },
  // beforeCreate: function () {
  //   currency
  //     .then((response) => {
  //       this.currencyMap = response.collection
  //       // this.currencyMap = response.items
  //     })
  //   league
  //     .then((response) => {
  //       this.leagueMap = response.collection
  //       // this.currencyMap = response.items
  //     })
  // },
  created: function () {
    console.log('this.currencyMap', this.currencyMap)
    let league = this.leagueMap[this.leagueid] || 'Standard'
    const askReq = '/CurrencyOrder' + '/' + league + '/' + this.askId + '/' + this.currencyMap[this.askId].$preset
    const bidReq = '/CurrencyOrder' + '/' + league + '/' + this.currencyMap[this.askId].$preset + '/' + this.askId
    const that = this
    http
      .get(askReq)
      .then((response) => {
        console.log('items fresh from API!', response.data)
        that.askList = response.data
      })
    http
      .get(bidReq)
      .then((response) => {
        console.log('items fresh from API!', response.data)
        that.bidList = response.data
      })
  }
}
</script>

<style lang="scss" scoped>
// call settings for global SCSS access
@import '../assets/styles/settings';

.tier {
  border-top: rem-calc(1) solid $primary-color;
  padding: $global-padding 0;
  .has-trade {
    color: $success-color;
  }
}
.large {
  font-size: rem-calc(20)
}

svg path,
svg rect{
  fill: $secondary-color;
}
</style>
