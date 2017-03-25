<template>
  <ul class="menu-bar condense medium-expand">
    <li><a href="">Item One</a></li>
    <li><h3 class="secondary-color body-font text-center">{{key}}</h3></li>
    <li><a href="">Item Too</a></li>
  </ul>
</template>

<script>
import settings from '../settings'

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
      console.log('this.askId', this.askId)
      if (this.askList && this.askList.length) {
        items = this.setStats(this.askList, this.keys.ratio, this.keys.ask, this.keys.bid, this.askId, this.keys.askId)
        return filters.current(items, this.keys.lastSeenTime, settings.refreshRate)
        // return items
      }
    },
    // accountName: function () {
    //   return this.selected.accountName
    // },
    isCurrentBid: function () {
      let items
      console.log('this.bidId', this.bidId)
      if (this.bidList && this.bidList.length) {
        items = this.setStats(this.bidList, this.keys.ratio, this.keys.ask, this.keys.bid)
        return filters.current(items, this.keys.lastSeenTime, settings.refreshRate)
        // return items
      }
    },
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
    // refreshData () {
    //   this.getData()
    // },
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
      bus.$emit('modal.traderlist.open', settings)
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
        })
      http
        .get(bidReq)
        .then((response) => {
          // console.log('items fresh from API!', response.data)
          that.bidList = response.data
          console.log('that.bidList.length', that.bidList.length)
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
    let name = saved.get(this.accountNameSaveKey)
    if (name) {
      this.accountName = name
    }
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
.svg-icon {
    &.loading {
      animation: rotation $default-animation-speed infinite linear;
    }
}

@keyframes rotation {
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(359deg);
    }
}

svg path,
svg rect{
  fill: $secondary-color;
}
</style>
