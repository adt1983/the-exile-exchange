<template>
  <div class="wrapper">
    <!-- accountName: {{accountName}} {{selected}} -->
    <header class="grid-block shrink">
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
<!--       <div class="grid-block text-center noscroll shrink">
          <div 
            :show="loading < 2"
            v-on:click="refreshData()"
            class="svg-icon">
            <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="27" height="32" viewBox="0 0 27 32">
              <path d="M26.982 18.857q0 0.089-0.018 0.125-1.143 4.786-4.786 7.759t-8.536 2.973q-2.607 0-5.045-0.982t-4.348-2.804l-2.304 2.304q-0.339 0.339-0.804 0.339t-0.804-0.339-0.339-0.804v-8q0-0.464 0.339-0.804t0.804-0.339h8q0.464 0 0.804 0.339t0.339 0.804-0.339 0.804l-2.446 2.446q1.268 1.179 2.875 1.821t3.339 0.643q2.393 0 4.464-1.161t3.321-3.196q0.196-0.304 0.946-2.089 0.143-0.411 0.536-0.411h3.429q0.232 0 0.402 0.17t0.17 0.402zM27.429 4.571v8q0 0.464-0.339 0.804t-0.804 0.339h-8q-0.464 0-0.804-0.339t-0.339-0.804 0.339-0.804l2.464-2.464q-2.643-2.446-6.232-2.446-2.393 0-4.464 1.161t-3.321 3.196q-0.196 0.304-0.946 2.089-0.143 0.411-0.536 0.411h-3.554q-0.232 0-0.402-0.17t-0.17-0.402v-0.125q1.161-4.786 4.821-7.759t8.571-2.973q2.607 0 5.071 0.991t4.375 2.795l2.321-2.304q0.339-0.339 0.804-0.339t0.804 0.339 0.339 0.804z"></path>
            </svg>
          </div>
      </div> -->
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

    <div class="grid-block shrink noscroll align-center preferences">
      <div class="grid-block noscroll">
        <div class="grid-content noscroll text-right">
          <small>Ask</small>
        </div>
      </div>
      <div class="grid-block noscroll">
        <div class="grid-content noscroll text-center">
              <div 
                :show="loading < 2"
                v-on:click="refreshData()"
                class="svg-icon call-to-action">
                <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="27" height="32" viewBox="0 0 27 32">
                  <path d="M26.982 18.857q0 0.089-0.018 0.125-1.143 4.786-4.786 7.759t-8.536 2.973q-2.607 0-5.045-0.982t-4.348-2.804l-2.304 2.304q-0.339 0.339-0.804 0.339t-0.804-0.339-0.339-0.804v-8q0-0.464 0.339-0.804t0.804-0.339h8q0.464 0 0.804 0.339t0.339 0.804-0.339 0.804l-2.446 2.446q1.268 1.179 2.875 1.821t3.339 0.643q2.393 0 4.464-1.161t3.321-3.196q0.196-0.304 0.946-2.089 0.143-0.411 0.536-0.411h3.429q0.232 0 0.402 0.17t0.17 0.402zM27.429 4.571v8q0 0.464-0.339 0.804t-0.804 0.339h-8q-0.464 0-0.804-0.339t-0.339-0.804 0.339-0.804l2.464-2.464q-2.643-2.446-6.232-2.446-2.393 0-4.464 1.161t-3.321 3.196q-0.196 0.304-0.946 2.089-0.143 0.411-0.536 0.411h-3.554q-0.232 0-0.402-0.17t-0.17-0.402v-0.125q1.161-4.786 4.821-7.759t8.571-2.973q2.607 0 5.071 0.991t4.375 2.795l2.321-2.304q0.339-0.339 0.804-0.339t0.804 0.339 0.339 0.804z"></path>
                </svg>
              </div>
          <!-- <input type="checkbox" id="Bids" v-model="settings.defaults.autoRefresh">&nbsp;
          <label for="Bids">Auto Refresh</label> -->
        </div>
      </div>
      <div class="grid-block noscroll text-left">
        <div class="grid-content noscroll">
          <small>Bid</small>
        </div>
      </div>
    </div>
  <!-- {{Object.keys(biddingIndex)}}
  {{Object.keys(biddingIndex).length}}
  {{orderBy.length}} -->
    <loader class="grid-block" :class="{ 'progress-50': (loading === 1)  }" v-if="loading < 2"></loader>
    <!-- {{orderBy}} -->
    <section class="block-list exchange-list" v-if="Object.keys(biddingIndex).length">
      <!-- <ul> -->
        <div
          class="exchange-row"
          :class="[{ 'has-bids': hasBids(key) }]"
          v-for="(key, increments) in orderBy" 
          :key="key">
          <!-- <div class="grid-content"> -->
            <ul class="exchange-item">
              <li><a href=""
                :class="applyColorClass(biddingIndex[key].asks)"
                @click.prevent="showOffer(key, biddingIndex[key].asks, 'ask')"
                v-if="biddingIndex[key].asks && biddingIndex[key].asks.length">{{biddingIndex[key].asks.length}}</a></li>
              <li
                class="exchange-ratio"
                :class="{'has-account': isAccount(biddingIndex[key].asks) || isAccount(biddingIndex[key].bids)}"><span class="secondary-color body-font text-center">{{key}}</span></li>
              <li><a href=""
                :class="applyColorClass(biddingIndex[key].bids)"
                @click.prevent="showOffer(key, biddingIndex[key].bids, 'bid')"
                v-if="biddingIndex[key].bids && biddingIndex[key].bids.length">{{biddingIndex[key].bids.length}}</a></li>
            </ul>
          <!--   <div 
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
            </div> -->
          <!-- </div> -->
        </div>
      <!-- </ul> -->
    </section>
  </div> 
</template>

<script>
import settings from '../settings'
import { http } from '../services'
import { bus } from '../services/bus'
import saved from '../services/selected'
// import * as filters from '../filters'

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
      this.isCurrentAsk() // call ask first!
      this.isCurrentBid()

      // should stats be passing in `this` values
      // instead of being writting in external funtions?
      // bad scope here?
      // items = this.byExchangeRatio[ this.bidId ]
      this.orderBy = Object.keys(this.byExchangeRatio[ this.bidId ]).sort(function (a, b) {
        const aa = that.byExchangeRatio[ that.bidId ][a] && that.byExchangeRatio[ that.bidId ][a][that.keys.ratio + '_base']
        const bb = that.byExchangeRatio[ that.bidId ][b] && that.byExchangeRatio[ that.bidId ][b][that.keys.ratio + '_base']
        return bb - aa
      })
      // console.log('this.byExchangeRatio[ this.bidId ]', this.byExchangeRatio[ this.bidId ])
      return this.byExchangeRatio[ this.bidId ]
    },
    // hasAsks: function (key) {
    //   return this.biddingIndex && this.biddingIndex[key].asks && this.biddingIndex[key].asks.length
    // },
    isLoaded: function () {
      if (this.renderView && this.askList && this.bidList) {
        if (this.loading > 2) { // 2 reqs
          // this.biddingIndex
          return true
        }
      }
    }
    // openModal: function (data) {
    //   bus.$emit('open-modal', data)
    // }
  },
  methods: {
    isCurrentAsk: function () {
      console.log('this.askId', this.askId)
      if (this.askList && this.askList.length && this.bidList && this.bidList.length) {
        this.setStats(this.askList, this.keys.ratio, this.keys.ask, this.keys.bid, this.askId, this.keys.bidId)
        // return filters.current(items, this.keys.lastSeenTime, settings.refreshRate)
        // return items
      }
    },
    // accountName: function () {
    //   return this.selected.accountName
    // },
    isCurrentBid: function () {
      console.log('this.bidId', this.bidId)
      if (this.bidList && this.bidList.length && this.bidList && this.bidList.length) {
        this.setStats(this.bidList, this.keys.ratio, this.keys.ask, this.keys.bid, this.bidId, this.keys.askId)
        // return filters.current(items, this.keys.lastSeenTime, settings.refreshRate)
        // return items
      }
    },
    refreshData () {
      this.getData()
    },
    applyColorClass (bids) {
      const isAccount = this.isAccount(bids)
      const count = bids && bids.length
      let className = 'warning-color'
      if (isAccount) {
        return className
      }
      // is not own account
      className = 'info-color'
      if (count) {
        if (count >= 2) {
          className = 'success-color'
        } else if (count === 1) {
          className = 'info-color'
        }
      }
      return className
    },
    // this.setStats(this.bidList, this.keys.ratio, this.keys.ask, this.keys.bid, this.bidId, this.keys.askId)
    //     this.setStats(this.askList, this.keys.ratio, this.keys.ask, this.keys.bid, this.askId, this.keys.askId)
    setStats (items, key, askKey, bidKey, askId, askIdKey) {
      const that = this
      // let t = []
      // console.log('baseRatio items', items)
      // do all manipulation here
      // in one loop!
      items.forEach(function (item) {
        let i = that.addRatio(item, key, askKey, bidKey)
        that.addItemToIndex(i, key, askKey, item[key + '_key'], askId, askIdKey)
      })
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
      if (!this.byExchangeRatio[ this.bidId ][index]) {
        this.byExchangeRatio[ this.bidId ][index] = {
          bids: [],
          asks: []
        }
        this.byExchangeRatio[ this.bidId ][index][key + '_base'] = item[key + '_base']
      }
      // if no asks, define them
      // if (this.byExchangeRatio[ this.bidId ][index].asks.length) {
        // assumes that the first in index is ask
      console.log('key', item[key])
      console.log('(item[askIdKey] === askId', (item[askIdKey].toString() === askId))
      if (item[askIdKey].toString() === askId) {
        this.byExchangeRatio[ this.bidId ][index].asks.push(item)
      } else {
        this.byExchangeRatio[ this.bidId ][index].bids.push(item)
      }
      // } else {
      //   this.byExchangeRatio[ this.bidId ][index].asks.push(item)
      // }
    },
    // clearIndex: function (items) {
    //   items.
    // },
    setAccountName () {
      let name = saved.get(this.accountNameSaveKey)
      if (name) {
        this.accountName = name
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
    showOffer: function (key, list, type) {
      const config = { key, list, type }
      bus.$emit('modal.traderlist.open', config)
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
      this.askList = [] // hard reset
      this.bidList = [] // hard reset
      this.byExchangeRatio[ this.bidId ] = {} // hard reset
      // this.biddingIndex
      this.loading = 0
      let league = this.leagueMap[this.leagueId][this.settings.keys.league.id] || 'Standard'
      const askReq = '/CurrencyOrder' + '/' + league + '/' + this.askId + '/' + this.currencyMap[this.askId].$preset
      const bidReq = '/CurrencyOrder' + '/' + league + '/' + this.currencyMap[this.askId].$preset + '/' + this.askId
      const that = this
      http
        .get(askReq)
        .then((response) => {
          console.log('ASKS fresh from API!', response.data)
          that.askList = response.data
          console.log('that.askList.length', that.askList.length)
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
          // this.biddingIndex
        })
      http
        .get(bidReq)
        .then((response) => {
          console.log('BIDS fresh from API!', response.data)
          that.bidList = response.data
          console.log('that.bidList.length', that.bidList.length)
          ++this.loading
        })
      // will be considered loaded with `loading` = 2
    }
  },
  components: {
    // BidsList,
    CurrencyItem,
    Loader
  },
  // beforeCreate: function () {
    // let name = saved.get(settings.keys.exchange.user)
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
  // },
  created: function () {
    const that = this
    // selected service
    this.setAccountName()
    bus.$on('saved.accountName', this.setAccountName)

    that.getData()
    // auto refresh data
    this.refreshInterval = setTimeout(function () {
      that.getData()
      if (this.settings.defaults.autoRefresh) {
        this.refreshInterval()
      }
    }, this.settings.defaults.refreshInterval)
  },
  beforeDestroy: function () {
    clearTimeout(this.refreshInterval)
  }
}
</script>

<style lang="scss" scoped>
// call settings for global SCSS access
@import '../assets/styles/settings';
@import './node_modules/angular-base-apps/scss/components/block-list';
@import './node_modules/angular-base-apps/scss/components/menu-bar';

.wrapper {
  @include base-panel;
  margin-bottom: 0;
  padding-bottom: 0;
  header {
    padding-bottom: ($global-padding/3)*2;
  }
}

.exchange-list {
  // width: rem-calc(210);
  filter: drop-shadow(rem-calc(1) rem-calc(2) rem-calc(2) rgba(0, 0, 0, 0.7));
  .badge {
    margin-top: ($global-padding/3)*2;
  }
  // // This gets you basic styles
  // @include block-list-container(
  //   $font-size: 1rem, // Base font size for entire list
  //   $full-bleed: true // If true, negative margins are added on the left and right to push the list to the edge of the container
  // );

  // margin: 0;
  // ul {
  //   padding: 0;
  //   margin: 0;
    // margin-bottom: 0;
    .exchange-row {
      &:nth-child(even) {
        background-color: lighten($dark-color, 5);
      }
      &:nth-child(odd) {
        background-color: lighten($dark-color, 8);
      }
      /* property name | duration | timing function | delay */
      // transition: background-color $default-animation-speed*2 ease-in-out;
      // @include block-list-item();
      // &.has-bids {
      //   cursor: pointer;
      //   background-color: $dark-color;
      //   // &:hover {
      //   //   background-color: $blocklist-item-background-hover;
      //   // }
      // }
      // &.has-asks {
      //   background-color: red;
      // }
    }
  // }

  // Define what tag or class your list items are with this mixin

}
.exchange-item {
  // This placeholder selector gets you the core structural styles for the menu
  @extend %menu-bar;
  text-align: center;
  // Set the orientation and sizing of the menu bar
  @include menu-bar-layout(
    $orientation: horizontal, // Can be horizontal or vertical
    $stretch: true // Set to false for a condensed menu
  );

  // Add styles for the menu bar items and text
  @include menu-bar-style(
    $background: transparent, // Background color of items
    $background-hover: $primary-color // Background color of item on hover
    // $background-active: #666, // Background color of an active item
    // $color: #fff, // Text color of items
    // $color-hover, // Text color of item on hover
    // $color-active, // Text color of item when active
    // $autocolor: false // When true, all the above colors will be derived from $background
  );
  // li {
  //   border-top: 0;
  // }
  .exchange-ratio {
    flex-flow: column nowrap;
    flex: 1 0 0;
    display: flex;
    align-items: center;
    padding: 1rem;
    font-size: 1rem;
    line-height: 1;
  }
 .has-account {
    // cursor: pointer;
      color: $warning-color;
    // background-color: $warning-dark;
    // &:hover {
    //   background-color: $blocklist-item-background-hover;
    // }
  }
   
}
.preferences {
  background-color: $gray-dark;
  padding: $global-padding/2 0;
}
.call-to-action {
  cursor: pointer;
}
// .svg-icon {
//     &.loading {
//       animation: rotation $default-animation-speed infinite linear;
//     }
// }

// @keyframes rotation {
//     from {
//         transform: rotate(0deg);
//     }
//     to {
//         transform: rotate(359deg);
//     }
// }

svg path,
svg rect{
  fill: $secondary-color;
}
</style>
