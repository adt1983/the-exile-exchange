<template>
  <section class="exchange-wrapper grid-block vertical">
    <header-section
      :params="askParams()"
      :leagueid="leagueid"
      ></header-section>
      <transition-group class="exchange-view" name="slide-fade">
        <div
          class="exchange-column"
          v-if="activeExchanges.length"
          v-for="item in activeExchanges"
          :key="item.exchangeMap">

          <exchange
            :league-map="item.leagueMap"
            :currency-map="item.currencyMap"
            :exchange-map="item.exchangeMap"
            :leagueName="item.league"
            :order-by="item.orderBy"
            :ask-list="item.askList"
            :bid-list="item.bidList"
            :ask-id="item.askId"
            :bid-id="item.bidId"></exchange>
        </div>
      </transition-group>
      <loader v-if="loading"></loader>
      <bids-list-modal></bids-list-modal>
  </section>
</template>

<script>
// import { bus } from '../services/bus'
import settings from '../settings'
import { parseParams } from '../services/util'
// import { http } from '../services'
// import { league } from '../services/league'
// import { currency } from '../services/currency'
import { ExchangeModel } from '../services/exchange'

import Header from '../components/Header'
import Exchange from '../components/Exchange'
import Loader from '../components/Loader'
import CurrencyItem from '../components/CurrencyItem'
import BidsListModal from 'views/BidsListModal'

export default {
  name: 'exchange-view',
  props: ['leagueid', 'askids'],
  data () {
    return {
      settings,

      loading: true,

      selected: {},

      leagueMap: {},
      currency: [],
      currencyMap: {},

      activeExchanges: [],

      asks: [],
      bids: []

    }
  },
  components: {
    BidsListModal,
    Exchange,
    CurrencyItem,
    Loader,
    'header-section': Header
  },
  created: function () {
    return this.getSelectedOffers()
  },
  watch: {
    // call again the method if the route changes
    '$route': 'refresh'
  },
  methods: {
    refresh () {
      this.getSelectedOffers()
    },
    getSelectedAsks: function () {
      let params = parseParams(this.askids)
      return params
    },
    getSelectedOffers: function () {
      let dis = this
      this.activeExchanges = [] // reset
      const params = this.getSelectedAsks()
      const exchanges = []
      params.forEach(function (value) {
        exchanges.push(new ExchangeModel(value.asks, value.bids, dis.leagueid))
      })

      return exchanges.reduce(function (chain, exchangePromise) {
        return chain.then(function () {
          return exchangePromise
        }).then(function (value) {
          console.log('value', value)
          if (value.askList.length || value.bidList.length) {
            dis.activeExchanges.push(value)
          }
        })
      }, Promise.resolve()).then(function () {
        console.log('All done')
      }).catch(function (err) {
        console.log('err', err)
      }).then(function () {
        // finally
        dis.loading = false
      })
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
  //width: 100%;
  overflow-y: hidden;
  overflow-x: auto;
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
  flex: 0 0 192px; // 192px fits 10 panels on 1920x1080. Better way to calc while preserving width?
  flex-shrink: 0;
  overflow-y: hidden;
}
.asks-panel,
.offers-panel {
  border: 1px solid $gray;
  margin: rem-calc(10) auto;
}
.view-loader {
  margin-top: $global-padding;
}
// .exchange-list-item {
//   padding-top: $global-padding;
//   border-bottom: 1px solid $secondary-color;
// }

// /* Enter and leave animations can use different */
/* durations and timing functions.              */
.slide-fade-enter-active {
  transition: transform $default-animation-speed*2 linear $default-animation-speed*3;
}
.slide-fade-leave-active {
  transition: transform $default-animation-speed*2 linear;
}
.slide-fade-enter
/* .slide-fade-leave-active for <2.1.8 */ {
  transform: translateY(-100%);
}
.slide-fade-leave-to {
  opacity: 0;
  overflow: hidden;

  transform: translateY(80%);
}
</style>
