<template>
  <section class="exchange-wrapper grid-block vertical">
    <header-section
      :params="askParams()"
      :leagueid="leagueid"
      ></header-section>
    <div class="exchange-view">
      <div 
        class="exchange-column grid-content"
        v-if="renderView()"
        v-for="item in getSelectedAsks">
        <exchange 
          :league-map="leagueMap"
          :currency-map="currencyMap"
          :league-id="leagueid"
          :ask-id="item.asks"
          :bid-id="item.bids"></exchange>
      </div>
      <bids-list-modal></bids-list-modal>
    </div>
  </section>
</template>

<script>
// import { bus } from '../services/bus'
import settings from '../settings'
// import { http } from '../services'
import { league } from '../services/league'
import { currency } from '../services/currency'

import Header from '../components/Header'
import Exchange from '../components/Exchange'
import CurrencyItem from '../components/CurrencyItem'
import BidsListModal from 'views/BidsListModal'

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

      // create unique!!!
      // unique: function () {
      //   return {}
      // },

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
      console.log('this.askids', this.askids)
      let params = parseParams(this.askids)
      // parseParams(params, this.selected)
      return params
    }
    // getSelectedOffers: function () {
    //   return cleanParams(this.offerids)
    // }
  },
  components: {
    BidsListModal,
    Exchange,
    CurrencyItem,
    'header-section': Header
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
    },
    askParams: function () {
      return this.asks
    }
  }
}
</script>

<style lang="scss" scoped>
// call settings for global SCSS access
@import '../assets/styles/settings';
.exchange-wrapper {
  &.grid-block {
    margin: 0;
  }
}
.exchange-view {
  width: 100%;
  overflow-y: scroll;
  display: flex;
  // flex-direction: column nowrap;
  // .currency-item {
  //   display: flex-list;
  //   flex-direction: row wrap;
  // }
  .grid-content {
    margin: 0;
    padding: 0;
  }
}
.exchange-column {
  flex: 0 1 rem-calc(200);
  // width: ;
}
.asks-panel,
.offers-panel {
  border: 1px solid $gray;
  margin: rem-calc(10) auto;
}
// .exchange-list-item {
//   padding-top: $global-padding;
//   border-bottom: 1px solid $secondary-color;
// }
</style>
