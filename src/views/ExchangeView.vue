<template>
  <div class="exchange-view grid-block wrap">
    <!-- <section :html="modalView"></section> -->
    <div 
      class="grid-block"
      v-if="renderView()"
      v-for="item in getSelectedAsks">
      <exchange 
        class="exchange-list-item"
        :league-map="leagueMap"
        :currency-map="currencyMap"
        :league-id="leagueid"
        :ask-id="item.asks"
        :bid-id="item.bids"></exchange>
    </div>
    <offers-list-modal></offers-list-modal>
    <contact-info-modal></contact-info-modal>
  </div>
</template>

<script>
// import { bus } from '../services/bus'
import { settings } from '../settings'
// import { http } from '../services'
import { league } from '../services/league'
import { currency } from '../services/currency'

import Exchange from '../components/Exchange'
import CurrencyItem from '../components/CurrencyItem'

import OffersListModal from 'views/OffersListModal'
import ContactInfoModal from 'views/ContactInfoModal'

function cleanPairs (dirty, keyChar) {
  let clean
  if (dirty.indexOf(keyChar) >= 0) {
    clean = dirty.split(keyChar)
  } else {
    clean = dirty
  }
  return clean
}

function parseParams (ids) {
  let params = cleanPairs(ids, settings.paramSubDiv)
  let item
  let items = []
  if (params && params.forEach) {
    params.forEach(function (a) {
      let temp = {}
      item = cleanPairs(a, settings.paramDiv)
      temp.asks = item[0]
      temp.bids = item[1]
      items.push(temp)
    })
  } else {
    params = cleanPairs(params, settings.paramDiv)
    items.push({
      asks: params[0],
      bids: params[1]
    })
  }
  return items
}

export default {
  name: 'exchange-view',
  props: ['leagueid', 'askids'],
  data () {
    return {
      settings,
      // keys: settings.keys.exchange,
      // currencyKeys: settings.keys.currency,
      // league,

      selected: {},

      leagueMap: {},
      currency: [],
      currencyMap: {},

      asks: [],
      bids: []

    }
  },
  computed: {
    getSelectedAsks: function () {
      let params = parseParams(this.askids)
      // parseParams(params, this.selected)
      return params
    }
    // getSelectedOffers: function () {
    //   return cleanParams(this.offerids)
    // }
  },
  components: {
    OffersListModal,
    ContactInfoModal,
    Exchange,
    CurrencyItem
  },
  beforeCreate: function () {
    const that = this

    currency
      .then((response) => {
        that.currencyMap = response.collection
        // this.currency = response.items
      })
    league
      .then((response) => {
        that.leagueMap = response.collection
      })
  },
  methods: {
    renderView: function () {
      return Object.keys(this.leagueMap) && Object.keys(this.leagueMap).length && Object.keys(this.currencyMap) && Object.keys(this.currencyMap).length
    }
  }
}
</script>

<style lang="scss" scoped>
// call settings for global SCSS access
@import '../assets/styles/settings';

.exchange-view {
  width: 100%;
  overflow-y: scroll;
//  display: flex;
//   flex-direction: row nowrap;
//   justify-content: flex-start;
//   align-content: flex-start;
//   align-items: flex-start;
//   @include breakpoint(medium) {
//     align-items: center;
//   }
  .currency-item {
    display: flex-list;
    flex-direction: row wrap;
  }
}
.asks-panel,
.offers-panel {
  border: 1px solid $gray;
  margin: rem-calc(10) auto;
}
.exchange-list-item {
  padding-top: $global-padding;
  border-bottom: 1px solid $secondary-color;
}
// .button {
//   // white-space: nowrap;
//   margin: $global-padding*3;
//   filter: drop-shadow(rem-calc(1) rem-calc(2) rem-calc(2) rgba(0, 0, 0, 0.3));
//   &:hover {
//     filter: drop-shadow(rem-calc(1) rem-calc(2) rem-calc(2) rgba(0, 0, 0, 0.4));
//   }
//   svg {
//     fill: #fff;
//   }
// }

</style>
