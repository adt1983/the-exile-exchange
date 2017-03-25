<template>
  <div class="wrapper grid-block vertical">
    <!-- accountName: {{accountName}} {{selected}} -->
    <header class="grid-block">
      <div class="grid-block text-center noscroll">
        <div class="grid-content noscroll">
          <currency-item
            :input="false"
            :id="askId" 
            class="ask-icon"
            ></currency-item>
          <!-- <img
            class="primary-shadow"
            :src="currencyMap[askId][settings.keys.currency.imgUrl]" 
            :alt="currencyMap[askId][settings.keys.currency.name]"> -->
        </div>
      </div>
      <div class="grid-block text-center noscroll shrink">
        <div :click="getData()"
          class="svg-icon">
          <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="27" height="32" viewBox="0 0 27 32">
            <path d="M26.982 18.857q0 0.089-0.018 0.125-1.143 4.786-4.786 7.759t-8.536 2.973q-2.607 0-5.045-0.982t-4.348-2.804l-2.304 2.304q-0.339 0.339-0.804 0.339t-0.804-0.339-0.339-0.804v-8q0-0.464 0.339-0.804t0.804-0.339h8q0.464 0 0.804 0.339t0.339 0.804-0.339 0.804l-2.446 2.446q1.268 1.179 2.875 1.821t3.339 0.643q2.393 0 4.464-1.161t3.321-3.196q0.196-0.304 0.946-2.089 0.143-0.411 0.536-0.411h3.429q0.232 0 0.402 0.17t0.17 0.402zM27.429 4.571v8q0 0.464-0.339 0.804t-0.804 0.339h-8q-0.464 0-0.804-0.339t-0.339-0.804 0.339-0.804l2.464-2.464q-2.643-2.446-6.232-2.446-2.393 0-4.464 1.161t-3.321 3.196q-0.196 0.304-0.946 2.089-0.143 0.411-0.536 0.411h-3.554q-0.232 0-0.402-0.17t-0.17-0.402v-0.125q1.161-4.786 4.821-7.759t8.571-2.973q2.607 0 5.071 0.991t4.375 2.795l2.321-2.304q0.339-0.339 0.804-0.339t0.804 0.339 0.339 0.804z"></path>
          </svg>
        </div>
      </div>
      <div class="grid-block text-center noscroll">
        <div class="grid-content noscroll">
            <currency-item
              :input="false"
              :id="bidId" 
              class="ask-icon"
              ></currency-item>
            <!-- <img
              class="primary-shadow"
              :src="currencyMap[bidId][settings.keys.currency.imgUrl]" 
              :alt="currencyMap[bidId][settings.keys.currency.name]"> -->
        </div>
      </div>
    </header>

    <div class="grid-block noscroll align-center preferences">
      <div class="grid-block noscroll">
        <div class="grid-content noscroll text-right">
          <small>Ask</small>
        </div>
      </div>
      <div class="grid-block noscroll">
        <div class="grid-content noscroll text-center">
          <input type="checkbox" id="Bids" v-model="filterBids">&nbsp;
          <label for="Bids">Hide Empty Bids</label>
        </div>
      </div>
      <div class="grid-block noscroll text-left">
        <div class="grid-content noscroll">
          <small>Bid</small>
        </div>
      </div>
    </div>
  {{Object.keys(biddingIndex)}}
    <loader class="grid-block" :class="{ 'progress-50': (loading === 1)  }" v-if="loading < 2"></loader>
    <!-- {{orderBy}} -->
    <section class="block-list exchange-list" v-if="Object.keys(biddingIndex).length">
      <ul>
          <!-- v-show="showKeyRow(key)"  -->
          <!-- v-if="renderKeyRow(key)"  -->
        <li
          :class="[{ 'has-bids': hasBids(key) },{'has-account': isAccount(biddingIndex[key].bids)}]"
          v-for="(key, increments) in orderBy" 
          v-show="showEmptyBids(key)"
          :key="key">
          <div class="grid-content">
            
            <div 
              class="call-to-action grid-block noscroll"
              @click="showOffer(key, biddingIndex[key].bids)">
              <div class="grid-block noscroll text-center">
                <div class="grid-content noscroll">
                  <span class="badge"
                    :class="{ 'warning': (biddingIndex[key].asks && biddingIndex[key].asks.length >= 2) }">{{biddingIndex[key].asks.length}}</span>
                </div>
              </div>
              <div class="grid-block noscroll text-center shrink">
                <div class="grid-content noscroll">
                  <h3 class="secondary-color body-font">{{key}}</h3>
                </div>
              </div>
              <div class="grid-block noscroll text-center">
                <div class="grid-content noscroll">
                  <span class="badge success-dark-bg"
                    v-if="biddingIndex[key].bids && biddingIndex[key].bids.length">{{biddingIndex[key].bids.length}}</span>
                </div>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </section>
  </div> 
</template>

<script>
import settings from '../settings'
import { http } from '../services'
import { bus } from '../services/bus'
import saved from '../services/selected'
import * as filters from '../filters'

import CurrencyItem from '../components/CurrencyItem'
import Loader from './Loader'

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
      settings,

      refreshInterval: undefined,

      loading: 0,
      filterBids: true,
      showModal: false,

      keys: settings.keys.exchange,

      accountName: '',
      accountNameSaveKey: settings.keys.exchange.user,

      orderBy: [],
      askList: [],
      bidList: [],
      byExchangeRatio: {},

      title: 'Breach Currency Exchange'
    }
  },
  computed: {
    isCurrentAsk: function () {
      let items
      if (this.askList && this.askList.length) {
        items = this.setStats(this.askList, this.keys.ratio, this.keys.ask, this.keys.bid, this.askId, this.keys.askId)
        return filters.current(items, this.keys.lastSeenTime, settings.refreshRate)
        // return items
      }
      
    },
    // accountName: function () {
    //   return this.selected.accountName
    // },
    // isCurrentBid: function () {
    //   let items
    //   console.log('this.bidId', this.bidId)
    //   if (this.bidList && this.bidList.length) {
    //     items = this.setStats(this.bidList, this.keys.ratio, this.keys.ask, this.keys.bid)
    //     return filters.current(items, this.keys.lastSeenTime, settings.refreshRate)
    //     // return items
    //   }
    // },
    // get only, just need a function
    // highestAsk: function () {
    //   return filters.highest(this.isCurrentAsk, this.keys.ask)
    // },
    // highestBid: function () {
    //   return filters.highest(this.isCurrentBid, this.keys.bid)
    // },
    biddingIndex: function () {
      // somewhere in the the VIEW
      // `biddingIndex` must be referenced,
      // or call a method which refs
      // otherwise it will never render
      //
      const that = this
      // let items
      // call other computers to make sure they are compiled
      this.isCurrentAsk // call ask first!
      this.isCurrentBid
      this.loading

      // should stats be passing in `this` values
      // instead of being writting in external funtions?
      // bad scope here?
      // items = this.byExchangeRatio
      this.orderBy = Object.keys(this.byExchangeRatio).sort(function (a, b) {
        const aa = that.byExchangeRatio[a] && that.byExchangeRatio[a][that.keys.ratio + '_base']
        const bb = that.byExchangeRatio[b] && that.byExchangeRatio[b][that.keys.ratio + '_base']
        return bb - aa
      })
      console.log('this.byExchangeRatio', this.byExchangeRatio)
      return this.byExchangeRatio
    },
    // hasAsks: function (key) {
    //   return this.biddingIndex && this.biddingIndex[key].asks && this.biddingIndex[key].asks.length
    // },
    isLoaded: function () {
      if (this.renderView && this.askList && this.bidList) {
        if (this.loading > 2) { // 2 reqs
          return true
        }
      }
    }
    // openModal: function (data) {
    //   bus.$emit('open-modal', data)
    // }
  },
  methods: {
    refreshData () {
      this.getData()
    },
    setStats (items, key, askKey, bidKey, askId, askIdKey) {
      const that = this
      let t = []
      // console.log('baseRatio items', items)
      // do all manipulation here
      // in one loop!
      t = items.map(function (item) {
        let i = that.addRatio(item, key, askKey, bidKey)
        that.addItemToIndex(i, key, askKey, item[key + '_key'], askId, askIdKey)
        return i
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
      if (!this.byExchangeRatio[index]) {
        this.byExchangeRatio[index] = {
          bids: [],
          asks: []
        }
        this.byExchangeRatio[index][key + '_base'] = item[key + '_base']
      }
      // if no asks, define them
      if (this.byExchangeRatio[index].asks.length) {
        // assumes that the first in index is ask
        if (item[askIdKey] === askId) {
          this.byExchangeRatio[index].asks.push(item)
        } else {
          this.byExchangeRatio[index].bids.push(item)
        }
      } else {
        this.byExchangeRatio[index].asks.push(item)
      }
    },
    // highlight account name
    isAccount: function (bids) {
      const that = this
      let valid = false
      bids.forEach(function (val) {
        if (val && val.accountName === that.accountName) {
          valid = true
        }
      })
      return valid
    },
    // toggleOffer: function (key) {
    //   this.selected[key] = !this.selected[key]
    // },
    showOffer: function (key, list) {
      const settings = { key, list }
      bus.$emit('modal.offerlist.open', settings)
    },
    // keep the template clean
    // hasTrade: function (key) {
    //   return this.biddingIndex[key].bids && this.biddingIndex[key].bids.length && this.biddingIndex[key].asks && this.biddingIndex[key].asks.length
    // },
    // renderKeyRow: function (key) {
    //   return this.biddingIndex[key].asks && this.biddingIndex[key].asks.length
    // },
    hasBids: function (key) {
      return this.biddingIndex[key].bids && this.biddingIndex[key].bids.length
    },
    hasAsks: function (key) {
      return this.biddingIndex[key].asks && this.biddingIndex[key].asks.length
    },
    showEmptyBids: function (key) {
      return this.filterBids === false || (this.biddingIndex[key].bids && this.biddingIndex[key].bids.length)
    },
    renderView: function () {
      // makes ref to this.biddingIndex which start to computes its contents
      return Object.keys(this.leagueMap) && Object.keys(this.leagueMap).length && Object.keys(this.currencyMap) && Object.keys(this.currencyMap).length && Object.keys(this.biddingIndex) && (Object.keys(this.biddingIndex).length || Object.keys(this.biddingIndex).length === 0)
    },
    getData: function () {
      this.loading = 0
      let league = this.leagueMap[this.leagueId][this.settings.keys.league.id] || 'Standard'
      const askReq = '/CurrencyOrder' + '/' + league + '/' + this.askId + '/' + this.currencyMap[this.askId].$preset
      const bidReq = '/CurrencyOrder' + '/' + league + '/' + this.currencyMap[this.askId].$preset + '/' + this.askId
      const that = this
      http
        .get(askReq)
        .then((response) => {
          // console.log('items fresh from API!', response.data)
          that.askList = response.data
          // test data
          // that.askList.push({
          //   'accountName': 'Travis',
          //   'ask_id': that.askList[0].ask_id,
          //   'ask_qty': 1,
          //   'bid_id': that.askList[0].bid_id,
          //   'bid_qty': 1,
          //   'lastChar': 'Cheeseman',
          //   'lastSeenUTC': +(new Date()),
          //   'league': that.askList[0].league
          // })
          ++this.loading
        })
      http
        .get(bidReq)
        .then((response) => {
          // console.log('items fresh from API!', response.data)
          that.bidList = response.data
          ++this.loading
        })
      // will be considered loaded with `loading` = 2
      this.biddingIndex
    }
  },
  components: {
    // BidsList,
    CurrencyItem,
    Loader
  },
  beforeCreate: function () {
    let name = saved.get(settings.keys.exchange.user)
    // console.log('items fresh from API!', name)
    // if (name) {
    //   this.accountName = name
    // }
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
  },
  created: function () {
    const that = this
    // selected service
    let name = saved.get(this.accountNameSaveKey)
    if (name) {
      this.accountName = name
    }
    that.getData()
    console.log(this.settings.defaults.refreshInterval)
    // this.refreshInterval = setInterval(function () {
    //   that.getData()
    // }, this.settings.defaults.refreshInterval)
  },
  beforeDestroy: function () {
    clearInterval(this.refreshInterval)
  }
}
</script>

<style lang="scss" scoped>
// call settings for global SCSS access
@import '../assets/styles/settings';
@import './node_modules/angular-base-apps/scss/components/block-list';

.wrapper {
  @include base-panel;
  margin-bottom: 0;
  padding-bottom: 0;
  header {
    padding-bottom: ($global-padding/3)*2;
  }
}

.exchange-list {
  filter: drop-shadow(rem-calc(1) rem-calc(2) rem-calc(2) rgba(0, 0, 0, 0.7));
  .badge {
    margin-top: ($global-padding/3)*2;
  }
  // This gets you basic styles
  @include block-list-container(
    $font-size: 1rem, // Base font size for entire list
    $full-bleed: true // If true, negative margins are added on the left and right to push the list to the edge of the container
  );

  margin-bottom: 0;
  ul {
    margin-bottom: 0;
  }

  // This adds support for text fields, dropdowns, and radio/check inputs
  // @include block-list-inputs(
  //   $color: #000, // Foreground color
  //   $background, #fff, // Background color
  //   $background-hover: #fff, // Background color of elements on hover
  //   $padding: 1rem, //
  // );

  // This adds support for icons
  // &.with-icons {
  //   @include block-list-icons(
  //     $size: 0.8, // This should be a decimal point. 0.8 makes the icon 80% the size of its parent
  //     $item-selector: 'li' // This should be whatever tag or class your block list uses for items
  //   );
  // }

  // Define what tag or class your list items are with this mixin
  li {
    /* property name | duration | timing function | delay */
    transition: background-color $default-animation-speed*2 ease-in-out;
    @include block-list-item(
      // $color: #000, // Color of items
      // $color-hover, // Color of items on hover
      // $color-disabled, // Color of items when disabled
      // $background: transparent, // Background color
      // $background-hover: #ccc, // Background color on hover
      // $border: 1px solid #ccc, // Top and bottom border of items
      // $padding: 1rem
    );
    &.has-bids {
      cursor: pointer;
      background-color: $dark-color;
      &:nth-child(odd) {
        background-color: darken($dark-color, 5);
      }
      &:hover {
        background-color: $blocklist-item-background-hover;
      }
    }
    &.has-account {
      cursor: pointer;
      background-color: $warning-dark;
      &:hover {
        background-color: $blocklist-item-background-hover;
      }
    }
    // &.has-asks {
    //   background-color: red;
    // }
    // Add styles for list items with chevrons
    // &.with-chevron {
    //   @include block-list-chevron(
    //     $color: #000, // Color of chevron
    //     $padding: 1rem, // Insert the same padding as the block list item here
    //     $label-class: 'block-list-label' // Insert the class you're using for labels
    //   );
    // }
  }

  // Define what tag or class your headers are with this mixin
  // header {
  //   @include block-list-header(
  //     $color: #000, // Text color
  //     $font-size: 1rem, // Font size
  //     $uppercase: true, // If true, the text becomes all-caps
  //     $offset: 1rem // Left-side offset for text
  //   );
  // }

  // Define the class for labels
  // .block-list-label {
  //   @include block-list-label(
  //     $color: #999, // Color of label
  //     $left-class: 'left', // Define a modifier class for left-aligned labels
  //     $left-padding: 1rem // Padding to add when a label is left-aligned
  //   );
  // }

}

.preferences {
  background-color: $gray-dark;
  padding: $global-padding/2 0;
}


svg path,
svg rect{
  fill: $secondary-color;
}
</style>
