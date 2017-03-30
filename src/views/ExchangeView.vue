<template>
  <section class="exchange-wrapper grid-block vertical">
    <header-section
      :params="askParams()"
      :leagueid="leagueid"
      ></header-section>
    <div class="exchange-view">

      <div 
        class="exchange-column grid-content"
        v-if="activeExchanges.length"
        v-for="item in activeExchanges">
        <exchange 
          :league-map="item.leagueMap"
          :currency-map="item.currencyMap"
          :exchange-map="item.exchangeMap"
          :league-id="item.leagueId"
          :order-by="item.orderBy"
          :ask-list="item.askList"
          :bid-list="item.bidList"
          :ask-id="item.askId"
          :bid-id="item.bidId"></exchange>
      </div>
      <loader class="grid-block" v-if="loading"></loader>
      <bids-list-modal></bids-list-modal>
    </div>
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
  computed: {
    list () {
      return this.getSelectedOffers()
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
  methods: {
    getSelectedAsks: function () {
      let params = parseParams(this.askids)
      return params
    },
    getSelectedOffers: function () {
      let dis = this
      const params = this.getSelectedAsks()
      const exchanges = []
      console.log('params', params)
      params.forEach(function (value) {
        exchanges.push(new ExchangeModel(value.asks, value.bids, dis.leagueid))
      })
      return Promise.all(exchanges).then(values => {
        dis.loading = false
        dis.activeExchanges = values
      }).catch(reason => {
        console.log(reason)
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
