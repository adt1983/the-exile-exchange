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
           <!--      <div 
                  :show="loading < 2"
                  v-on:click="refreshData()"
                  class="svg-icon">
                  <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="27" height="32" viewBox="0 0 27 32">
                    <path d="M26.982 18.857q0 0.089-0.018 0.125-1.143 4.786-4.786 7.759t-8.536 2.973q-2.607 0-5.045-0.982t-4.348-2.804l-2.304 2.304q-0.339 0.339-0.804 0.339t-0.804-0.339-0.339-0.804v-8q0-0.464 0.339-0.804t0.804-0.339h8q0.464 0 0.804 0.339t0.339 0.804-0.339 0.804l-2.446 2.446q1.268 1.179 2.875 1.821t3.339 0.643q2.393 0 4.464-1.161t3.321-3.196q0.196-0.304 0.946-2.089 0.143-0.411 0.536-0.411h3.429q0.232 0 0.402 0.17t0.17 0.402zM27.429 4.571v8q0 0.464-0.339 0.804t-0.804 0.339h-8q-0.464 0-0.804-0.339t-0.339-0.804 0.339-0.804l2.464-2.464q-2.643-2.446-6.232-2.446-2.393 0-4.464 1.161t-3.321 3.196q-0.196 0.304-0.946 2.089-0.143 0.411-0.536 0.411h-3.554q-0.232 0-0.402-0.17t-0.17-0.402v-0.125q1.161-4.786 4.821-7.759t8.571-2.973q2.607 0 5.071 0.991t4.375 2.795l2.321-2.304q0.339-0.339 0.804-0.339t0.804 0.339 0.339 0.804z"></path>
                  </svg>
                </div> -->
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
    <!-- {{Object.keys(exchangeMap)}}
    {{Object.keys(exchangeMap).length}}
    {{orderBy.length}} -->
      <loader class="grid-block" v-if="exchangeMap && Object.keys(exchangeMap).length === 0"></loader>
      <section class="block-list exchange-list" v-if="exchangeMap && Object.keys(exchangeMap).length">
        <!-- <ul> -->
          <div
            class="exchange-row"
            :class="[{ 'has-bids': hasBids(key) }]"
            v-for="(key, increments) in orderBy" 
            :key="key">
            <!-- <div class="grid-content"> -->
              <ul class="exchange-item">
                <li><a href=""
                  :class="applyColorClass(exchangeMap[key].asks)"
                  @click.prevent="showOffer(key, exchangeMap[key].asks, 'ask')"><span
                  v-if="exchangeMap[key].asks && exchangeMap[key].asks.length">{{exchangeMap[key].asks.length}}</span></a></li>
                <li
                  class="exchange-ratio"
                  :class="{'has-account': isAccount(exchangeMap[key].asks) || isAccount(exchangeMap[key].bids)}"><span class="secondary-color body-font text-center">{{key}}</span></li>
                <li><a href=""
                  :class="applyColorClass(exchangeMap[key].bids)"
                  @click.prevent="showOffer(key, exchangeMap[key].bids, 'bid')"
                  v-if="exchangeMap[key].bids && exchangeMap[key].bids.length">{{exchangeMap[key].bids.length}}</a></li>
              </ul>
            <!--   <div 
                class="call-to-action grid-block noscroll"
                @click="showOffer(key, exchangeMap[key].bids)">
                <div class="grid-block noscroll text-center">
                  <div class="grid-content noscroll">
                    <span class="badge"
                      :class="{ 'warning': (exchangeMap[key].asks && exchangeMap[key].asks.length >= 2) }">{{exchangeMap[key].asks.length}}</span>
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
                      v-if="exchangeMap[key].bids && exchangeMap[key].bids.length">{{exchangeMap[key].bids.length}}</span>
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
// import { http } from '../services'
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

    askList: Array,
    bidList: Array,
    orderBy: Array,

    exchangeMap: Object,
    leagueMap: Object,
    currencyMap: Object
  },
  data () {
    return {
      settings,

      refreshInterval: undefined,

      // loading: true,
      filterBids: true,
      showModal: false,

      keys: settings.keys.exchange,

      accountName: '',
      accountNameSaveKey: settings.keys.exchange.user,

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
    isLoaded: function () {
      if (this.renderView && this.askList && this.bidList) {
        if (this.loading > 2) { // 2 reqs
          // this.exchangeMap
          return true
        }
      }
    }
    // openModal: function (data) {
    //   bus.$emit('open-modal', data)
    // }
  },
  methods: {
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
    //   return this.exchangeMap[key].bids && this.exchangeMap[key].bids.length && this.exchangeMap[key].asks && this.exchangeMap[key].asks.length
    // },
    // renderKeyRow: function (key) {
    //   return this.exchangeMap[key].asks && this.exchangeMap[key].asks.length
    // },
    hasBids: function (key) {
      return this.exchangeMap[key].bids && this.exchangeMap[key].bids.length
    },
    hasAsks: function (key) {
      return this.exchangeMap[key].asks && this.exchangeMap[key].asks.length
    },
    showEmptyBids: function (key) {
      return this.filterBids === false || (this.exchangeMap[key].bids && this.exchangeMap[key].bids.length)
    }
  },
  components: {
    // BidsList,
    CurrencyItem,
    Loader
  },
  created: function () {
    // selected service
    this.setAccountName()
    bus.$on('saved.accountName', this.setAccountName)
  }
  // beforeDestroy: function () {
  //   clearTimeout(this.refreshInterval)
  // }
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

// .slide-fade-leave {
//   transform: translateX(0);
// }
svg path,
svg rect{
  fill: $secondary-color;
}
</style>
